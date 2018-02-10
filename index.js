import Server from './src';
import Debug from './src/core/tools/Debug';

const express = require('express');

const PORT = process.env.port || 3000;
const app = express();

const server = new Server(app);
server.startWebService();

app.listen(PORT, () => {
  Debug.success(`We are living on the port: ${PORT}`);
});
