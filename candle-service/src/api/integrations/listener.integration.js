import CandleService from '../../services/candle.service';

class Listener {
  constructor() {
    this.candleService = new CandleService();
  }

  start(socket) {
    socket.on('ticker', tick => {
      this.candleService.verifyAndStoreTicks(tick);
    });
  }
}

export default Listener;
