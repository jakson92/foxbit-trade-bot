import ListenController from './listen.controller';

class Controllers {
  constructor(app) {
    app.use('/', ListenController);
  }
}
export default Controllers;
