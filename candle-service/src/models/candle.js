class Candle {
  constructor(high, low, open, close) {
    this.high = high;
    this.low = low;
    this.open = open;
    this.close = close;
    this.time = new Date();
  }
}

export default Candle;
