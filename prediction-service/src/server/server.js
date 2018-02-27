import express from 'express';
import Api from '../api';
import Debug from '../tools/Debug';

class Server {
  /**
   * @constructor
   */
  constructor() {
    this.port = process.env.port || 3020;
  }

  /**
   * Start a Prediction service server.
   */
  start() {
    const app = express();
    this._startApi(app);
  }

  /**
   * Start Prediction service api.
   *
   * @param  {Express App} app
   */
  _startApi(app) {
    const api = new Api(app);
    api.start();

    app.listen(this.port, () => {
      Debug.success(`Prediction service is living on the port: ${this.port}`);
    });
  }
}

export default Server;
