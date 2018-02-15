import Operations from '../../database/operations';
import Debug from '../tools/Debug';

class StrategiesBase {
  constructor() {
    const operations = new Operations();
    operations.onInsert('Candles', null, this.update);
  }

  update(data) {
    Debug.log(data);
  }

  getCandlesHistory(qnt) {
    const operations = new Operations();
    return new Promise((resolve, reject) => {
      operations.getCandlesByTime('Candles', qnt, (err, value) => {
        if (err) reject(err);

        resolve(value);
      });
    });
  }
}

module.exports = StrategiesBase;

