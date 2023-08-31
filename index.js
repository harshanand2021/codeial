const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
// used for session cookie and authentication passport
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static("./assets"));

// extract style and scripts from sub pages into layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(express.static('./assets'));

app.use(expressLayouts);

// use express router
app.use("/", require("./routes"));

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is sued to store the session cookie in the db
app.use(session({
  name: 'codeial',
  // TODO change a secret before deployment in production mode
  secret: 'blahsomething',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: (1000 * 60 * 100)
  },
  store: new MongoStore(
    {
      mongooseConnection: db,
      autoRemove: 'disabled'
    },
    function(err){
      console.log(err || 'connect-mongodb setup ok');
    }
  )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(port, function (err) {
  if (err) {
    // console.log('Error: ', err);
    console.log(`Error in running the server : , ${err}`);
  }
  console.log(`Server is running on port : ${port}`);
});
