import express from 'express';
import FoxbitApi from './src/core/foxbitapi';
import Api from './src/api';
import FoxbitMigration from './src/repositories/migrations/foxbit-migration';
import Debug from './src/core/tools/Debug';

const PORT = process.env.port || 3000;
const app = express();

const migration = new FoxbitMigration();

migration.createDatabase('foxbit').then(() => {
  migration.createTable('foxbit', 'Candles');
});

const api = new Api(app, new FoxbitApi());

app.listen(PORT, () => {
  Debug.success(`Listener service is living on the port: ${PORT}`);
});
