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

let users = [
  {id:1, name:"juan"},
{id:2, name: "dude"}
];
 
router.get('/allusers', function(req, res, next) {
  res.send(users);
});

router.get('/allusers/count', (req, res) => {
  res.send(users.length.toString());
});


export default router;