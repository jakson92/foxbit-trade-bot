import io from 'socket.io-client';
import Endpoints from '../../../config/endpoints';
import Listener from './listener.integration';
import Prediction from './prediction.integration';

class Integrations {
  start() {
    const socket = io(Endpoints.LISTENER_URL);

    const listener = new Listener();
    listener.start(socket);

    const prediction = new Prediction();
    prediction.start();
  }
}

export default Integrations;
