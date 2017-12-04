import FoxbitApi from '../core/market/foxbit';
import Controllers from './controllers';

class Web {
  constructor(app) {
    this.app = app;
    this.foxbitApi = new FoxbitApi();
  }

  start() {
    return new Controllers(this.app, this.foxbitApi);
  }
}

export default Web;
