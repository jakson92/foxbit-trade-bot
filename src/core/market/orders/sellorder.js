import FoxbitConstants from '../../../config/foxbitConstants';
import FoxbitTools from '../../tools/foxbitTools';

class SellOrder {
  constructor(price, amount) {
    this.side = '2';
    this.price = FoxbitTools.convertToNumberToSatoshis(price);
    this.amount = FoxbitTools.convertToNumberToSatoshis(amount);
    this.symbol = FoxbitConstants.DEFAULT_SYMBOL;
  }

  isSameOrderSide(side) {
    if (side === 'sell') {
      return true;
    }
    return false;
  }

  isMyPriceInTop(price) {
    const priceInSatoshis = FoxbitTools.convertToNumberToSatoshis(price);
    if (this.price < priceInSatoshis) {
      return true;
    }
    return false;
  }

  gePriceByOrderbook(value) {
    return value - 0.01;
  }
}

export default SellOrder;
