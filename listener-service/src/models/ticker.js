class Ticker {
  constructor(bid, ask) {
    this.bidPrice = bid;
    this.askPrice = ask;
    this.time = new Date();
  }
}

export default Ticker;
