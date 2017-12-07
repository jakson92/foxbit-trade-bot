import BodyParser from 'body-parser';
import CorsMiddleware from '../middleware/cors.middleware';

const auth = require('./auth.controller');
const orderbook = require('./book.controller');

class Controller {
  constructor(app, foxbitApi) {
    app.use(BodyParser.json());
    app.use(CorsMiddleware);

    app.use('/auth', auth(foxbitApi));
    app.use('/orderbook', orderbook(foxbitApi));
  }
}

export default Controller;
