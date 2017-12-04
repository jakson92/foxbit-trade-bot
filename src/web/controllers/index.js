import BodyParser from 'body-parser';

const auth = require('./auth.controller');
const orderbook = require('./book.controller');

class Controller {
  constructor(app, foxbitApi) {
    app.use(BodyParser.json());

    app.use('/auth', auth(foxbitApi));
    app.use('/orderbook', orderbook(foxbitApi));
  }
}

export default Controller;
