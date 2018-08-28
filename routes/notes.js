import express from 'express';
import path from 'path';

const router = new express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'db.json'));
});

export default router;
