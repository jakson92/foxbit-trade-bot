class Candle {
  /**
   * Instanciate new Candle with all the shadow data (high, low),
   * and open and close data, with the time of Instanciation.
   *
   * @constructor
   * @param  {number} high
   * @param  {number} low
   * @param  {number} open
   * @param  {number} close
   */
  constructor(high, low, open, close) {
    this.high = high;
    this.low = low;
    this.open = open;
    this.close = close;
    this.time = new Date();
  }
}

export default Candle;
