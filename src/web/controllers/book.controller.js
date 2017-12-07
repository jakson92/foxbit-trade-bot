import express from 'express';

const router = new express.Router();
let foxbitApi;

router.get('/', (req, res) => {
  foxbitApi.getFullOrderBook().then(x => {
    const responseAsks = [];
    const responseBids = [];

    x.asks.forEach(data => responseAsks.push({ price: data[0], amount: data[1], userId: data[2] }));
    x.bids.forEach(data => responseBids.push({ price: data[0], amount: data[1], userId: data[2] }));

    res.send({
      asks: responseAsks,
      bids: responseBids,
    });
  });
});

module.exports = _foxbitApi => {
  foxbitApi = _foxbitApi;
  return router;
};
