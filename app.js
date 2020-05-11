require('colors');
const morgan = require('morgan');
const path = require('path');
const express = require('express');

const index = require('./routes/index');
const api = require('./routes/api');

const app = express();

const port = process.env.PORT || 5001;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(index);
app.use(api);

app.listen(port);
