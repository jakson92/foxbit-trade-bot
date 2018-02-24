import io from 'socket.io-client';
import Endpoints from '../../../config/endpoints';
import CandleListener from './candle-listener.integration';

class Integrations {
  start() {
    const socket = io(Endpoints.LISTENER_URL);

    const listener = new CandleListener();
    listener.start(socket);
  }
}

export default Integrations;
