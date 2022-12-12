const {passHasher, hashCompare} = require('./hashingHelpers.js')
const express = require('express');
const cors = require('cors');

const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)
const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json())

//REQUEST HELPERS
const getRequest = async (table, res) => {
  try{
    let contents = await knex(`${table}`)
    .select('*')
    .then(rows => rows)
    .then(() => res.status(200).json(contents))
  }
  catch(err){
    console.log(err)
    res.status(400).json('There was a problem accessing the database.')
  }
}

//BEGIN REQUESTS

app.get('/requests', (req, res) => {
  getRequest('requests', res)
})

app.get('/units', async (req, res) => {
  getRequest('units', res)
})

app.get('/users', (req, res) => {
  getRequest('users', res)
})

// app.get('/users/:id', (req, res) => {
//   const { id } = params;

// })

app.post('requests', async (req, res) => {
  const { body } = req;
  try {
    let postRequest = await knex('requests')
    .insert({
    pri_ranking: `${body.priRanking}`,
    user: `${body.user}`,
    unit: `${body.unit}`,
    pri_code: `${body.priCode}`,
    request_code:`${body.requestCode}`,
    desc_title:`${body.descTitle}`,
    desc_details:`${body.descDetails}`,
    desc_impact: `${body.descDetails}`
    })
    .then(() => res.status(201).json('Request successfully created.'))
  }
  catch (err){
    console.log(err);
    res.status(400).json('There was an error posting to the database.')
  }
})

app.post('/login', (req, res) => {
  const { body } = req;
  let hashedPass = passHasher(body.password)
  res.status(202).json(hashedPass)
})

app.patch('/requests', (req, res) => {
  const { body } = req;
  res.status(202).json(body)
})

app.patch('/units', (req, res) => {
  const { body } = req;
  res.status(202).json(body)
})

app.delete('/', (req, res) => {
  res.status(200).json('Success')
})

module.exports = app