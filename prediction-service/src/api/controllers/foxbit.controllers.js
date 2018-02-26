import express from 'express';

const router = new express.Router();

router.post('/update', (req, res) => {
    if (!req.body || !req.body.candle) return res.sendStatus(400);

    
});

module.exports = router;