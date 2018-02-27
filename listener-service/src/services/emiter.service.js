import Io from 'socket.io';
import Http from 'http';
import EndPoints from '../../config/endpoints';
import FoxbitService from './foxbit.service';
import Ticker from '../models/ticker';

class EmiterService extends FoxbitService {
  /**
   * Create a new instance of a EmiterService,
   * and start listen updates from `Listener Service`
   * via WebSocket.
   * @constructor
   */
  constructor() {
    super();
    const server = Http.createServer();
    server.listen(EndPoints.SOCKET_PORT);

    Io.listen(server).on('connection', socket => {
      this.socket = socket;
    });

    this.tickers = [];
  }

  /**
   * Starts listen for ticks in foxbit,
   * and send the data via Websocket to all listeners.
   *
   * @param  {foxbitLoginData} userData
   */
  startTickerListen(userData) {
    return this.login(userData).then(x => {
      this.onTicker(['BLINK:BTCBRL'], tick => {
        if (this.socket) {
          this.socket.emit('ticker', new Ticker(tick.BestBid, tick.BestAsk));
        }
      });

      return x;
    });
  }
}

export default EmiterService;
