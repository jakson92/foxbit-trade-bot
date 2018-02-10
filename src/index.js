import FoxbitApi from '../src/core/market/foxbit';
import OrderWorker from './core/workers/orderWorker';
import Web from './web';

class Server {
  constructor(app) {
    this.api = new FoxbitApi();
    this.web = new Web(app, this.api);
  }

  startWebService() {
    this.web.start();

    this.api.on('Logged', () => {
      const worker = new OrderWorker(this.api);
      worker.storeMarketTicker();
    });
  }
}

export default Server;

