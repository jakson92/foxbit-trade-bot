import ListenController from './listen.controller';

class Controllers {
  /**
   * @param  {Express App} app
   * @constructor
   */
  constructor(app) {
    app.use('/', ListenController);
  }
}
export default Controllers;
