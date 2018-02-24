import Integrations from './integrations';

class Api {
  constructor(app) {
    this.app = app;
  }

  start() {
    const integrations = new Integrations();
    integrations.start();
  }
}

export default Api;
