import Controllers from './controllers';

class Web {
  constructor(app, api) {
    this.app = app;
    this.api = api;
  }

  start() {
    return new Controllers(this.app, this.api);
  }
}

export default Web;
