import express from 'express';
import AuthBusiness from '../business/auth.business';

const router = new express.Router();
let foxbitApi;

router.post('/login', (req, res) => {
  const auth = new AuthBusiness(foxbitApi);
  if (!req.body || !req.body.username || !req.body.password) return res.sendStatus(400);

  auth.login(req.body.username, req.body.password, req.body.secondFactor, (x) => {
    res.json(x);
  });
});

module.exports = _foxbitApi => {
  foxbitApi = _foxbitApi;
  return router;
};
