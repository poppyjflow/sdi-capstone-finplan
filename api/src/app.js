const {passHasher, hashCompare} = require('./hashingHelpers.js')
const {getRequest, getWithID, deleteRequest} = require('./queryHelpers.js')
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

//BEGIN REQUESTS

//GET ALL REQUESTS
app.get('/requests', (req, res) => {
  getRequest('requests', res)
})

//GET REQUESTS COMBINED WITH requests_allocations_obligations
app.get('/requests/all', (req, res) => {
  knex('requests_allocations_obligations_requests')
    .select('*')
    .from('requests')
    .innerJoin(
      'requests_allocations_obligations',
      'requests.id',
      '=',
      'requests_allocations_obligations.requests_id'
    )
    .then(rows => res.status(200).json(rows))
    .catch(err => {
      console.log(err);
      res.status(400).json('There was a problem processing your request.')
    })
})

//GET requests_allocations_obligations FOR A REQUEST
app.get('/requests/allocations_obligations/:requestID', (req, res) => {
  const { requestID } = req.params;
  getWithID('requests_allocations_obligations', 'requests_id', requestID, res)
})

//GET ALL USERS
app.get('/users', (req, res) => {
  getRequest('users', res)
})

//GET USER w/ ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  getWithID('users', 'id', id, res)
})

//GET USERNAME FOR USER w/ ID
app.get('/users/username/:id', (req, res) => {
  const { id } = req.params;
  knex('users')
    .select('uname')
    .where('id', '=', `${id}`)
    .then(username => res.status(200).json(username))
    .catch(err => {
      console.log(err);
      res.status(400).json('There was an error accessing the database.')
    })
})

//UPDATE SPECIFIC REQUEST INFORMATION
app.patch('/requests/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  knex('requests')
    .where('id', '=', `${id}`)
    .update({
      pri_ranking: `${body.priRanking}`,
      user: `${body.user}`,
      unit: `${body.unit}`,
      pri_code: `${body.priCode}`,
      request_code:`${body.requestCode}`,
      desc_title:`${body.descTitle}`,
      desc_details:`${body.descDetails}`,
      desc_impact: `${body.descDetails}`
    })
    .then(() => res.status(201).json('Request has been successfully updated.'))
    .catch(err => {
      console.log(err);
      res.status(400).json('There was a problem processing your request.')
    })
})

//UPDATE A SPECIFIC USER (DOES NOT INCLUDE USERNAME/PASS)
app.patch('/users/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req.body;
  knex('users')
    .where('id', '=', `${id}`)
    .update({
      rank: `${body.rank}`,
      fname: `${body.firstname}`,
      lname: `${body.lastname}`,
      unit: `${body.unit}`,
      email: `${body.email}`,
    })
    .then(() => res.status(201).json('User has been successfully updated.'))
    .catch(err => {
      console.log(err);
      res.status(400).json('There was a problem updating the user.')
    })
})

//ADD A NEW REQUEST
app.post('/requests', (req, res) => {
  const { body } = req;
  knex('requests')
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
    .catch (err => {
      console.log(err);
      res.status(400).json('There was an error posting to the database.')
    })
})

//RESERVED FOR WHEN LOGIN IS IMPLEMENTED
// app.post('/login', (req, res) => {
//   const { body } = req;
//   let hashedPass = passHasher(body.password)
//   res.status(202).json('Authenticated')
// })

//DELETE A SPECIFIC REQUEST
app.delete('/requests/:id', (req, res) => {
  const { id } = req.params;
  deleteRequest('requests', id, res)
})

//DELETE A SPECIFIC USER
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  deleteRequest('users', id, res)
})

module.exports = app