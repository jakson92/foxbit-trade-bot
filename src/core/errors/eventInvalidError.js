import BaseError from './baseError';

class EventInvalidError extends BaseError {
  constructor(message) {
    super(message || 'Event key not found', 520);
  }
}

export default EventInvalidError;
