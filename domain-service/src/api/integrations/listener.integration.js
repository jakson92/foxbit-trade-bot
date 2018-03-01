import CandleService from '../../services/candle.service';

class Listener {
  /**
   * @constructor
   */
  constructor() {
    this.candleService = new CandleService();
  }

  /**
   * Add a listener in `ticker` event on the Webscoket passed as param,
   * and when event occurs verify and store Ticks data.
   *
   * @param  {socket} socket
   */
  start(socket) {
    socket.on('ticker', tick => {
      this.candleService.verifyAndStoreTicks(tick);
    });
  }
}

export default Listener;
