import FoxbitController from './foxbit.controllers';

class Controllers {
  constructor(app) {
    app.use('/foxbit', FoxbitController);
  }
}

export default Controllers;
