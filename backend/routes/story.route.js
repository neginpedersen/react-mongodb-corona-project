let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Story Model
let storySchema = require('../models/Story');

// CREATE Story
router.route('/create-story').post((req, res, next) => {
  storySchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// READ Storys
router.route('/').get((req, res) => {
  storySchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single Story
router.route('/edit-story/:id').get((req, res) => {
  storySchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Story
router.route('/update-story/:id').put((req, res, next) => {
  storySchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Story updated successfully !')
    }
  })
})

// Delete Story
router.route('/delete-story/:id').delete((req, res, next) => {
  StorySchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;