import express from 'express';
import Api from '../api';
import Debug from '../tools/Debug';

class Server {
  constructor() {
    this.port = process.env.port || 3020;
  }

  start() {
    const app = express();
    this._startApi(app);
  }

  _startApi(app) {
    const api = new Api(app);
    api.start();

    app.listen(this.port, () => {
      Debug.success(`Prediction service is living on the port: ${this.port}`);
    });
  }
}

export default Server;