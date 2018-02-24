import express from 'express';
import FoxbitMigration from '../repositories/migrations/foxbit-migration';
import Api from '../api';
import Debug from '../tools/Debug';

class Server {
  constructor() {
    this.port = process.env.port || 3010;
  }

  start() {
    const app = express();
    this._migration().then(() => {
      this._startApi(app);
    });
  }

  _startApi(app) {
    const api = new Api(app);
    api.start();

    app.listen(this.port, () => {
      Debug.success(`Candle service is living on the port: ${this.port}`);
    });
  }

  _migration() {
    const migration = new FoxbitMigration();

    return migration.createDatabase('foxbit').then(() => {
      migration.createTable('foxbit', 'Candles');
    });
  }
}

export default Server;
