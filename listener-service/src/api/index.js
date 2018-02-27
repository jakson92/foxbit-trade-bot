import Controllers from './controllers/index';

class Api {
  /**
   * @param  {Express App} app
   * @constructor
   */
  constructor(app) {
    this.app = app;
  }

  /**
   * Starts all controllers and add to the app.
   */
  start() {
    this.controllers = new Controllers(this.app);
  }
}

export default Api;
