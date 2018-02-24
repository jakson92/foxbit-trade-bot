import listenController from './listen.controller';

class Controllers {
  constructor(app) {
    app.use('/', listenController);
  }
}
export default Controllers;
