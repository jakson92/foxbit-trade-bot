import FoxbitController from './foxbit.controllers';

class Controllers {
  /**
   * @param  {Express App} app
   * @constructor
   */
  constructor(app) {
    this.app = app;
  }

  /**
   * Start all Api Controllers.
   */
  start() {
    this.app.use('/foxbit', FoxbitController);
  }
}

export default Controllers;
