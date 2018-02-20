import express from 'express';

const router = new express.Router();
let foxbitApi;
let listener;

router.post('/start', (req, res) => {
  if (!req.body || !req.body.username || !req.body.password) return res.sendStatus(400);

  const loginData = {
    username: req.body.username,
    password: req.body.password,
    secondFactor: req.body.secondFactor,
  };

  foxbitApi.login(loginData).then(x => {
    foxbitApi.onTicker(['BLINK:BTCBRL'], y => {
      listener.verifyAndStoreTicks(y);
    });

    res.json(x);
  });
});

module.exports = (_foxbitApi, _listener) => {
  foxbitApi = _foxbitApi;
  listener = _listener;
  return router;
};
