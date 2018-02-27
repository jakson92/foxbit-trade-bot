import * as BlinkTrade from 'blinktrade';
import FoxbitConfig from '../../config/foxbit-config';

class FoxbitService {
  /**
   * Create new instance of FoxbitService,
   * and open websocket connection in Foxbit.
   *
   * @constructor
   */
  constructor() {
    const connection = { prod: FoxbitConfig.PROD, currency: FoxbitConfig.DEFAULT_CURRENCY, brokerId: FoxbitConfig.BROKER_ID };
    this.ws = new BlinkTrade.BlinkTradeWS(connection);
  }

  /**
   * Do login in foxbit, and keep websocket connection alive.
   *
   * @param  {FoxbitLoginData} userData
   */
  login(userData) {
    return this.ws.connect().then(() => {
      const loginPromise = this.ws.login(userData);
      loginPromise.then(() => {
        this.keepConnectionAlive();
      });

      return loginPromise;
    });
  }

  /**
   * Send a heart beat to keep the websocket connection alive with foxbit,
   * in a space of time configured in `FoxbitConfig.HEARTH_BEAT_TIME`.
   */
  keepConnectionAlive() {
    setInterval(() => {
      this.ws.heartbeat();
    }, FoxbitConfig.HEARTH_BEAT_TIME);
  }

  /**
   * On Tick call the listener function with the Ticker data as a param.
   *
   * @param  {string} event
   * @param  {function} listener
   */
  onTicker(event, listener) {
    const ticker = this.marketTicker || this._getTicker(event);

    event.forEach(element => {
      ticker.on(element, listener);
    });
  }

  /**
   * Singleton that returns a Ticker subscription in foxbit Websocket.
   *
   * @param  {string} event
   */
  _getTicker(event) {
    const ticker = this.marketTicker || this.ws.subscribeTicker(event);
    this.marketTicker = ticker;
    return ticker;
  }
}

export default FoxbitService;
