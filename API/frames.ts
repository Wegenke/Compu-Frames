import * as express from 'express';
import Frame from '../models/frame';

let router = express.Router();

// GET all frames
router.get('/', (req, res) => {
  Frame.find().then((frames)=> {
      res.json(frames);
  }).catch((err) => {
      res.status(500);
      console.error(err);
  })
});

// Get a single frame by id
router.get('/:id', (req, res) => {
  Frame.findById(req.params['id']).then((frame) => {
    res.json(frame);
  });
});

// Create new frame
router.post('/', (req, res) => {
  let frame = new Frame();
  frame.name = req.body.name;
  frame.type = req.body.type;
  frame.price = req.body.price;
  frame.description = req.body.description;
  frame.img = req.body.img;

  // save new frame
  frame.save().then((newFrame) => {
    res.json(newFrame);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

// Update existing frame
router.post('/:id', (req, res) => {
  let frameId = req.params.id;

  Frame.findById(frameId).then((frame) => {
    frame.name = req.body.name;
    frame.type = req.body.type;
    frame.price = req.body.price;
    frame.description = req.body.description;
    frame.img = req.body.img;

    // save updated frame
    frame.save().then((updatedFrame) => {
      res.json(updatedFrame);
    }).catch((err) => {
      res.status(400).json(err);
    });

  }).catch(() => {
    res.sendStatus(404);
  });

});


// Delete frame
router.delete('/:id', (req, res) => {
  let frameId = req.params.id;
  Frame.remove({_id:frameId}).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    res.status(500);
    console.log(err);
  });
});

export default router;