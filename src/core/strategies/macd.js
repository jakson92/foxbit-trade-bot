import StrategiesBase from './strategiesBase';
import Debug from '../tools/Debug';

class macdStrategie extends StrategiesBase {
  update(data) {
    Debug.success(JSON.stringify(data));
  }
}

export default macdStrategie;
