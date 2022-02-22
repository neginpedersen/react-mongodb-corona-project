let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

const { json } = require('body-parser');
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
  var [name,country,story] = [req.body.name,req.body.country,req.body.story];

  let data = Object.assign({},
    name === undefined ? null : {name},
    country === undefined ? null : {country},
    story === undefined ? null : {story}
  );
  
console.log('data:'+JSON.stringify(data)+'requests:'+typeof (req.body.name)+req.body.country+req.body.story);

    storySchema.findByIdAndUpdate(req.params.id, data


//storySchema.findByIdAndUpdate(req.params.id, {name:req.body.name,story:req.body.story,country:req.body.story

, function (err, response) {
  // Handle any possible database errors
  if (err) {
    console.log("we hit an error" + err);
    res.json({
      message: 'Database Update Failure'
    });
  }
  console.log("This is the Response: " + response);
})
})

// Delete Story
router.route('/delete-story/:id').delete((req, res, next) => {
  storySchema.findByIdAndRemove(req.params.id, (error, data) => {
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