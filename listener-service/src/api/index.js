import Controllers from './controllers/index';
import Listener from '../core/listener';

class Api {
  constructor(app, foxbitApi) {
    const listener = new Listener();
    this.controllers = new Controllers(app, foxbitApi, listener);
  }
}

export default Api;
