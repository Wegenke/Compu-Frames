import * as express from 'express';
let router = express.Router();
// import users from '../api/users';
let users = [
  {id:1, name:"juan"},
{id:2, name: "dude"}
]

router.get('/allusers', function(req, res, next) {
  res.send(users);
});

router.get('/allusers/count', (req, res) => {
  res.send(users.length.toString());
});

export default router;