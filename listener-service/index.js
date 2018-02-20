import express from 'express';
import FoxbitApi from './src/core/foxbitapi';
import Api from './src/api';
import Debug from './src/core/tools/Debug';

const PORT = process.env.port || 3000;
const app = express();

const api = new Api(app, new FoxbitApi());

app.listen(PORT, () => {
  Debug.success(`Listener service is living on the port: ${PORT}`);
});
