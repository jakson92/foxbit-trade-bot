import FoxbitApi from '../src/core/market/foxbit';
import OrderWorker from './core/workers/orderWorker';
import MacdStrategie from './core/strategies/macd';
import Debug from './core/tools/Debug';
import Web from './web';

class Server {
  constructor(app) {
    this.api = new FoxbitApi();
    this.web = new Web(app, this.api);
  }

  startWebService() {
    this.web.start();
    const macd = new MacdStrategie();

    macd.getCandles(5)
      .then(x => Debug.log(x));

    this.api.on('Logged', () => {
      Debug.highlight('User Logged');
      const worker = new OrderWorker(this.api);
      worker.storeMarketTicker();
    });
  }
}

export default Server;
