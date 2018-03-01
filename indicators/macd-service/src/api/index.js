import Controllers from './controllers';

class Api {
  /**
   * @param  {Express App} app
   * @constructor
   */
  constructor(app) {
    this.app = app;
  }

  /**
   * Start Api with all controllers and logic.
   */
  start() {
    this.controllers = new Controllers(this.app);
    this.controllers.start();
  }
}

export default Api;
