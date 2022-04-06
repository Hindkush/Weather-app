const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { query } = require('express');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const { error } = require('console');

const app = express();
const port = process.env.PORT || 3000;

//Define Path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Suraj Dhotre',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Suraj Dhotre',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Suraj Dhotre',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please Provide address',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
  // res.send({
  //   forecast: 40,
  //   location: 'pune',
  // });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search query',
    });
  }
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('helpError', {
    title: 404,
    name: 'Suraj Dhotre',
    errorMessage: 'help article is not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 404,
    name: 'Suraj Dhotre',
    errorMessage: 'My 404 page',
  });
});

app.listen(port, () => {
  console.log('server is up on port', port);
});
