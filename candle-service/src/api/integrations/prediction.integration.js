import Request from 'request';
import Endpoints from '../../../config/endpoints';
import Repository from '../../repositories/repository';

class Prediction {
  constructor() {
    this.repository = new Repository();
  }

  start() {
    this.onInserCandles();
  }

  onInserCandles() {
    this.repository.onInsert('Candles', null, this.emitNotificationToPrediction);
  }

  emitNotificationToPrediction(candle) {
    Request.post(`${Endpoints.PREDICTION_URL}/foxbit/update`, { data: candle });
  }
}

export default Prediction;
