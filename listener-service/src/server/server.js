import express from 'express';
import BodyParser from 'body-parser';
import Debug from '../tools/Debug';
import Api from '../api';

class Server {
  constructor() {
    this.port = process.env.port || 3000;
  }

  start() {
    const app = express();

    app.use(BodyParser.json());

    const api = new Api(app);
    api.start();

    app.listen(this.port, () => {
      Debug.success(`Listener service is living on the port: ${this.port}`);
    });
  }
}

export default Server;
