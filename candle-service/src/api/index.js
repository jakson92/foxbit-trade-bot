import Integrations from './integrations';

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
    const integrations = new Integrations();
    integrations.start();
  }
}

export default Api;
