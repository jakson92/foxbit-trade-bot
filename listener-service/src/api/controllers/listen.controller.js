import express from 'express';
import EmiterService from '../../services/emiter.service';

const router = new express.Router();

/**
 * Login in foxbit and start listen ticks via
 * Websocket.
 *
 * @param  {req} req
 * @param  {res} res
 */
router.post('/start', (req, res) => {
  if (!req.body || !req.body.username || !req.body.password) return res.sendStatus(400);

  const loginData = {
    username: req.body.username,
    password: req.body.password,
    secondFactor: req.body.secondFactor,
  };

  const emiter = new EmiterService();
  emiter.startTickerListen(loginData).then(x => {
    res.json({
      status: 'success',
      username: x.Username,
    });
  }).catch(() => {
    res.json({
      status: 'failed',
    });
  });
});

module.exports = router;
