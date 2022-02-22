let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');

// Express Route
const storyRoute = require('../backend/routes/story.route');
const verifyCaptcha = require('../backend/routes/verifyrecaptcha.route');

const db = require("./models");
const Role = db.role;

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true, useFindAndModify: false
}).then(() => {
  console.log('Database sucessfully connected!');
  initial();
},
  error => {
    console.log('Could not connect to database : ' + error)
  }
)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/storys', storyRoute);
app.use('/verifyrecaptcha', verifyCaptcha);



// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});


const auth_app = express();

/*var corsOptions = {
  origin: "http://localhost:8081"
};*/

auth_app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//auth_app.use(cors(corsOptions));

// parse requests of content-type - auth_application/json
auth_app.use(express.json());

// parse requests of content-type - auth_application/x-www-form-urlencoded
auth_app.use(express.urlencoded({ extended: true }));

// simple route
auth_app.get("/", (req, res) => {
  res.json({ message: "Welcome to negin auth_application." });
});

require("./routes/auth.routes")(auth_app);
require("./routes/user.routes")(auth_app);
//require("./routes/verify-recaptcha.routes")(auth_app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
auth_app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}