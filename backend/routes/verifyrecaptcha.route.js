
express = require('express');
const axios = require('axios');
router = express.Router();

//const { json } = require('body-parser');
function simpleStringify (object){
  var simpleObject = {};
  for (var prop in object ){
      if (!object.hasOwnProperty(prop)){
          continue;
      }
      if (typeof(object[prop]) == 'object'){
          continue;
      }
      if (typeof(object[prop]) == 'function'){
          continue;
      }
      simpleObject[prop] = object[prop];
  }
  return JSON.stringify(simpleObject); // returns cleaned up JSON
};

 router.post('/', function(req, res) {
//res.send('POST handler for /verifyrecaptcha route.'+req.body.response);
axios.post('https://www.google.com/recaptcha/api/siteverify',
  {
    secret: '6LdYB1UeAAAAALV18Zu7MzYUjthXN37iZd9TIu1q',
    response: req.body.response
  }
)
.then((response) => {


  console.log('responsefrom google:'+simpleStringify(response));
  return response.status;
}, (error) => {
  console.log('error3 from google:'+error);
});
});

module.exports = router;

