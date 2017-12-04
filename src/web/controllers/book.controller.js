import express from 'express';

const router = new express.Router();
let foxbitApi;

router.get('/', (req, res) => {
  foxbitApi.getFullOrderBook().then(x => {
    res.send(x);
  });
});

module.exports = _foxbitApi => {
  foxbitApi = _foxbitApi;
  return router;
};
