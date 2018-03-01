import Request from 'request';
import Endpoints from '../../../config/endpoints';
import Repository from '../../repositories/repository';

class Prediction {
  /**
   * @constructor
   */
  constructor() {
    this.repository = new Repository();
  }

  /**
   * Starts Prediction Integration logic.
   */
  start() {
    this.onCandlesInsert();
  }

  /**
   * Listen to insert data in the Candles table,
   * and when event occurs, emit a new Candle to Prediction Service.
   */
  onCandlesInsert() {
    this.repository.onInsert('Candles', null, this.emitNotificationToPrediction);
  }

  /**
   * Send a candle to update endpoint in prediction service.
   *
   * @param  {Candle} candle
   */
  emitNotificationToPrediction(candle) {
    Request.post(`${Endpoints.PREDICTION_URL}/foxbit/update`, { data: candle });
  }
}

export default Prediction;
