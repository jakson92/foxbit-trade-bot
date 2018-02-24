import * as BlinkTrade from 'blinktrade';
import FoxbitConfig from '../../config/foxbit-config';

class FoxbitService {
  constructor() {
    const connection = { prod: FoxbitConfig.PROD, currency: FoxbitConfig.DEFAULT_CURRENCY, brokerId: FoxbitConfig.BROKER_ID };
    this.ws = new BlinkTrade.BlinkTradeWS(connection);
  }

  login(userData) {
    return this.ws.connect().then(() => {
      const loginPromise = this.ws.login(userData);
      loginPromise.then(() => {
        this.keepConnectionAlive();
      });

      return loginPromise;
    });
  }

  keepConnectionAlive() {
    setInterval(() => {
      this.ws.heartbeat();
    }, FoxbitConfig.HEARTH_BEAT_TIME);
  }

  onTicker(event, listener) {
    const ticker = this.marketTicker || this._getTicker(event);

    event.forEach(element => {
      ticker.on(element, listener);
    });
  }

  _getTicker(event) {
    const ticker = this.marketTicker || this.ws.subscribeTicker(event);
    this.marketTicker = ticker;
    return ticker;
  }
}

export default FoxbitService;
