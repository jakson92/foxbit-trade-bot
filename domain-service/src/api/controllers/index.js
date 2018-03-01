import CandlesController from './candles.controller';

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
    this.app.use('/candles', CandlesController);
  }
}

export default Controllers;

