import express from 'express';
import FoxbitMigration from '../repositories/migrations/foxbit-migration';
import Api from '../api';
import Debug from '../tools/Debug';

class Server {
  /**
   * @constructor
   */
  constructor() {
    this.port = process.env.port || 3010;
  }

  /**
   * Start Express server with all middlewares,
   * and before start run migrations to prepare database.
   */
  start() {
    const app = express();
    this._migration().then(() => {
      this._startApi(app);
    });
  }

  /**
   * Start Express service api.
   *
   * @param  {Express App} app
   */
  _startApi(app) {
    const api = new Api(app);
    api.start();

    app.listen(this.port, () => {
      Debug.success(`Candle service is living on the port: ${this.port}`);
    });
  }

  /**
   * Create databases and tables used in the system.
   */
  _migration() {
    const migration = new FoxbitMigration();

    return migration.createDatabase('foxbit').then(() => {
      migration.createTable('foxbit', 'Candles');
    });
  }
}

export default Server;
