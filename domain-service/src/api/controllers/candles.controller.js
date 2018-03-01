import express from 'express';
import Repository from '../../repositories/repository';

const router = new express.Router();

/**
 * Get the candles order descending  by time limited by the
 * quantity of the request.
 *
 * @param  {req} req
 * @param  {res} res
 */
router.get('/:qnt', (req, res) => {
  const repo = new Repository();

  repo.getCandlesByTime('Candles', parseInt(req.params.qnt), (err, candles) => {
    if (err) throw err;

    res.send(candles);
  });
});

module.exports = router;
