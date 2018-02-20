import BodyParser from 'body-parser';
import listenController from './listen.controller';

class Controllers {
  constructor(app, foxbitApi, listener) {
    app.use(BodyParser.json());

    app.use('/', listenController(foxbitApi, listener));
  }
}
export default Controllers;
