import _ from 'lodash/array';
import _math from 'lodash/math';
import Operations from '../../database/operations';
import Ticker from '../models/ticker';
import Candle from '../models/candle';
import Debug from '../tools/Debug';

class OrderWorker {
  constructor(api) {
    this.api = api;
    this.db = new Operations();
    this.tickers = [];
  }

  storeMarketTicker() {
    this.api.onTicker(['BLINK:BTCBRL'], x => {
      this._verifyAndStoreTicks(x);
    });
  }

  _verifyAndStoreTicks(tick) {
    if (this.tickers.length > 0) {
      const firstItemDate = _.head(this.tickers).time;
      const dateNow = new Date();

      if (this._addMinutes(firstItemDate, 5) < dateNow) {
        Debug.log(`Candles store [${this.tickers.length}] ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`);
        this.db.insert('Candles', this._makeCandle(this.tickers));
        this.tickers = [];
      }
    }

    this.tickers.push(new Ticker(tick.BestBid, tick.BestAsk));
  }

  _addMinutes(date, minutes) {
    const dateToChange = new Date(date);
    return new Date(dateToChange.setMinutes(dateToChange.getMinutes() + minutes));
  }

  _makeCandle(tickers) {
    if (tickers.length <= 0) return;
    const open = _math.minBy(tickers, x => x.time).askPrice;
    const close = _math.maxBy(tickers, x => x.time).askPrice;
    const high = _math.maxBy(tickers, x => x.askPrice).askPrice;
    const low = _math.minBy(tickers, x => x.askPrice).askPrice;

    return new Candle(high, low, open, close);
  }
}

export default OrderWorker;
