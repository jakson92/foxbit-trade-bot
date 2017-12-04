import BaseError from './baseError';

class MinPriceError extends BaseError {
  constructor(message) {
    super(message || 'The price cant be lower than 0.0001', 530);
  }
}

export default MinPriceError;
