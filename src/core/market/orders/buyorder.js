import FoxbitConstants from '../../../config/foxbitConstants';
import FoxbitTools from '../../tools/foxbitTools';

class BuyOrder {
  constructor(price, amount) {
    this.side = '1';
    this.price = FoxbitTools.convertToNumberToSatoshis(price);
    this.amount = FoxbitTools.convertToNumberToSatoshis(amount);
    this.symbol = FoxbitConstants.DEFAULT_SYMBOL;
  }

  isSameOrderSide(side) {
    if (side === 'buy') {
      return true;
    }
    return false;
  }

  isMyPriceInTop(price) {
    const priceInSatoshis = FoxbitTools.convertToNumberToSatoshis(price);
    if (this.price > priceInSatoshis) {
      return true;
    }
    return false;
  }

  gePriceByOrderbook(value) {
    return value + 0.01;
  }
}

export default BuyOrder;
