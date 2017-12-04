import * as BlinkTrade from 'blinktrade';
import FoxbitConstants from '../../config/foxbitConstants';
import Trade from './trade';

class FoxbitApi extends Trade {
  constructor() {
    const connection = { prod: FoxbitConstants.PROD, currency: FoxbitConstants.DEFAULT_CURRENCY, brokerId: FoxbitConstants.BROKER_ID };
    const ws = new BlinkTrade.BlinkTradeWS(connection);
    super(ws);
    this.isLogged = false;
  }

  login(userData) {
    return this.ws.connect().then(() => {
      const loginPromise = this.ws.login(userData);
      loginPromise.then(x => {
        this.isLogged = true;
        this.userId = x.UserID;
        this.keepConnectionAlive();
      });

      return loginPromise;
    });
  }

  keepConnectionAlive() {
    setInterval(() => {
      this.ws.heartbeat();
    }, FoxbitConstants.HEARTH_BEAT_TIME);
  }

  getFullOrderBook() {
    const blinktradeRest = new BlinkTrade.BlinkTradeRest({
      prod: FoxbitConstants.PROD,
      currency: FoxbitConstants.DEFAULT_CURRENCY,
    });
    return blinktradeRest.orderbook();
  }
}

export default FoxbitApi;
