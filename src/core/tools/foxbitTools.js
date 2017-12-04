class FoxbitTools {
  static convertToNumberToSatoshis(value) {
    return parseInt((value * 1e8).toFixed(0));
  }

  static convertToSatoshisToNumber(value) {
    return parseFloat((value / 1e8).toFixed(2));
  }

  static hasPropertyWithValue(obj, searchKey) {
    if (Object.keys(obj).some(key => obj[key] === searchKey)) return true;
    return false;
  }
}

export default FoxbitTools;
