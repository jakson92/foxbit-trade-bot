import Integrations from './integrations';
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
   * Starts all controllers and add to the app.
   */
  start() {
    const integrations = new Integrations();
    integrations.start();

    const controllers = new Controllers(this.app);
    controllers.start();
  }
}

export default Api;
