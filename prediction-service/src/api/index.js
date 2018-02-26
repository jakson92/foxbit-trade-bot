import Controllers from './controllers';

class Api {
  constructor(app) {
    this.app = app;
  }

  start() {
      this.controllers = new Controllers(this.app);
  }
}

export default Api;
