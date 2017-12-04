/* eslint no-console: 0 */
import Server from './src';

const express = require('express');


const PORT = process.env.port || 3000;
const app = express();

const server = new Server(app);
server.startWebService();

app.listen(PORT, () => {
  console.log(`We are living on the port: ${PORT}`);
});
