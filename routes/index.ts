import * as express from 'express';
let router = express.Router();
// import frames from '../api/frames';
let frames = [
  {id:1, name:"uno"},
{id:2, name: "dos"}
]

router.get('/allframes', function(req, res, next) {
  res.send(frames);
});

router.get('/allframes/count', (req, res) => {
  res.send(frames.length.toString());
});

export default router;