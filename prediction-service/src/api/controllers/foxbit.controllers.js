import express from 'express';

const router = new express.Router();

router.post('/update', (req, res) => {
  if (!req.body || !req.body.data) return res.sendStatus(400);

  console.log(req.body.data);
});

module.exports = router;
