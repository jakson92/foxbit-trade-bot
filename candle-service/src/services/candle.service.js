import _ from 'lodash/array';
import _math from 'lodash/math';
import Repository from '../repositories/repository';
import Candle from '../models/candle';
import Debug from '../tools/Debug';

class CandleService {
  /**
   * @constructor
   */
  constructor() {
    this.db = new Repository();
    this.tickers = [];
  }

  /**
   * Verify if is a valid Tick, store the tick in memory,
   * and in every X minutes make a candle object with all tickers
   * then insert in database.
   *
   * @param  {Ticker} tick
   */
  verifyAndStoreTicks(tick) {
    if (this.tickers.length > 0) {
      const firstItemDate = _.head(this.tickers).time;
      const dateNow = new Date();

      if (this._addMinutes(firstItemDate, 5) < dateNow) {
        Debug.log(`Candles store [${this.tickers.length}] ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`);
        this.db.insert('Candles', this._makeCandle(this.tickers));
        this.tickers = [];
      }
    }

    this.tickers.push(tick);
  }

  /**
   * Add minutes to a date.
   *
   * @param  {Date} date
   * @param  {number} minutes
   */
  _addMinutes(date, minutes) {
    const dateToChange = new Date(date);
    return new Date(dateToChange.setMinutes(dateToChange.getMinutes() + minutes));
  }

  /**
   * Make a Candle (high, low, open, close) object with tickers data.
   *
   * @param  {Ticker[]} tickers
   */
  _makeCandle(tickers) {
    if (tickers.length <= 0) return;

    if (tickers.length === 1) {
      const ask = tickers[0].askPrice;
      return new Candle(ask, ask, ask, ask);
    }

    const open = _.head(tickers).askPrice;
    const close = _.last(tickers).askPrice;
    const high = _math.maxBy(tickers, x => x.askPrice).askPrice;
    const low = _math.minBy(tickers, x => x.askPrice).askPrice;

    return new Candle(high, low, open, close);
  }
}

export default CandleService;
