import Repository from '../../repositories/repository';

class Prediction {
  constructor() {
    this.repository = new Repository();
  }

  start() {
    this.onInserCandles();
  }

  onInserCandles() {
    this.repository.onInsert('Candles', null, console.log);
  }
}

export default Prediction;
