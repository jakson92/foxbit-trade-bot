import Web from './web';

class Server {
  constructor(app) {
    this.web = new Web(app);
  }

  startWebService() {
    this.web.start();
  }
}

export default Server;

