import * as express from 'express';
let router = express.Router();

router.get('/allframes', function(req, res, next) {
  res.send(frames);
});

router.get('/allframes/count', (req, res) => {
  res.send(frames.length.toString());
});

export default router;