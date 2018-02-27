class Ticker {
  /**
   * Create a new instance of a Ticker.
   *
   * @param  {number} bid
   * @param  {number} ask
   * @constructor
   */
  constructor(bid, ask) {
    this.bidPrice = bid;
    this.askPrice = ask;
    this.time = new Date();
  }
}

export default Ticker;
