/**
 * @author Connor Neill
 * @version 1.0
 * October 4, 2018
 */

/* Required Modules */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; //assign port

var app = express();

// take the directory you want to use for all Handlebar partial files
hbs.registerPartials(__dirname + '/views/partials');

// set the view engine property to hbs
app.set('view engine', 'hbs'); // set Express variations

// express.static lets us access the file system of our machine, need to find our project
// luckily, the __dirname variable is always bound to the filepath of your project folder
// adding the /public allows us to access our help.html page
app.use(express.static(__dirname + '/public'));

// middleware: allows us to add functionality to Express
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// });

// @param: name of helper
// @param: function to run
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to Some Website.'
  });
});

// .get() retrieves page data from the server and loads it in the app
// @param: First parameter is the page address
// @param: Second parameter is any data to pass to our template
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About'
  }); // render() renders any templates you have with your current view engine
});

// create new projects page
app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
});

// create route @/bad
// send back json data with an error message property (whatever you like)
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error fulfilling that request'
  });
});

// @param: 3000 --> the port this server is active on
// @ param: function --> Do something once server is up
app.listen(port, () => { // Bind application to port on machine, 3000 is common port
  console.log(`Server is up on port ${port}`);
});

/* view app by running in terminal, then visiting localhost:[port]/[page] in browser */
