const express = require('express');
// const cors = require('cors');

const env = process.env.NODE_ENV || 'development'
const config = require('../db/knexfile')[env]
const knex = require('knex')(config)
const app = express();

// app.use(cors({
//   origin: true,
//   credentials: true
// }));


module.exports = app