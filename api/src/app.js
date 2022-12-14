const {passHasher, hashCompare} = require('./hashingHelpers.js')
const {getRequest, getWithID, deleteRequest, checkUsername, getUserhash, getUsername, getID } = require('./queryHelpers.js')
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { randomBytes } = require('node:crypto');

const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(morgan('tiny'));

//BEGIN REQUESTS

//GET ALL REQUESTS
app.get('/requests', (req, res) => {
  getRequest('requests', res)
})

//GET REQUEST w/ ID
app.get('/requests/:id', (req, res) => {
  const { id } = req.params;
  getWithID('requests', 'id', id, res)
})

//GET requests_allocations_obligations by ID
app.get('/requests_allocations_obligations/:id', (req, res) => {
  const { id } = req.params;
  getWithID('requests_allocations_obligations', 'id', id, res)
})

//GET ALL requests_allocations_obligations
app.get('/requests_allocations_obligations', (req, res) => {
  getRequest('requests_allocations_obligations', res)
})

//GET ALL REQUEST CODES
app.get('/request_codes', (req, res) => {
  getRequest('request_codes', res)
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

//UPDATE SPECIFIC REQUEST INFORMATION
app.patch('/requests/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  knex('requests')
    .where('id', '=', `${id}`)
    .update({
      pri_ranking: `${body.priRanking}`,
      users_id: `${body.user}`,
      pri_code_id: `${body.priCode}`,
      request_code_id:`${body.requestCode}`,
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
  const { body } = req;
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
      users_id: `${body.user}`,
      pri_code_id: `${body.priCode}`,
      request_code_id:`${body.requestCode}`,
      desc_title:`${body.descTitle}`,
      desc_details:`${body.descDetails}`,
      desc_impact: `${body.descImpact}`
    })
    .then(() => res.status(201).json('Request successfully created.'))
    .catch (err => {
      console.log(err);
      res.status(400).json('There was an error posting to the database.')
    })
})

//ADD A NEW request_allocation_obligation FOR A REQUEST
app.post('/requests_allocations_obligations', async (req, res) => {
  const { body } = req;
  const requestID = await getID(body.requestName, 'desc_title', 'requests')
  try{
    if(requestID === null){
      res.status(400).json(`No requests exist for the name: ${body.requestName}`)
    }
    knex('requests_allocations_obligations')
      .insert({
        year_fy: `${body.year}`,
        quarter: `${body.quarter}`,
        description: `${body.description}`,
        request_amount:`${body.requestAmount}`,
        allocation_amount:`${body.allocationAmount}`,
        obligation_amount:`${body.obligationAmount}`,
        requests_id: `${requestID}`
      })
      .then(() => res.status(201).json('Creation successful.'))
  }
  catch(err) {
      console.log(err);
      res.status(400).json('There was an error posting to the database.')
    }
})

//CREATE NEW USER
app.post('/login', async (req, res) => {
  const { username } = req.body;
  const plain = req.body.password;
  knex('users')
    .select('username', 'password', 'id')
    .where('username', username.toLowerCase())
    .then(result => {
      if (result[0]) {
        console.log(result[0]);
        console.log(`${plain} =? ${result[0].password}`);
        bcrypt.compare(plain, result[0].password, (err, isMatch) => {
          if (isMatch) {
            console.log(isMatch);
            const token = randomBytes(256);
            res.status(200).send({ auth: token.toString('hex'), id: result[0].id });
          }
          else {
            res.status(401).send(result);
          }
        });
      }
      else {
        res.status(401).send(null);
      }
    });
});

app.post('/users', async (req, res) => {
  const { org, rank, firstName, lastName, email, isAdmin } = req.body;
  const plain = req.body.password;
  bcrypt.hash(plain, saltRounds, (err, hash) => {
    knex('users')
      .insert({
        org: org,
        rank: rank,
        l_name: lastName,
        f_name: firstName,
        password: hash,
        email: email,
        is_admin: isAdmin,
      }, ['email'])
      .then(() => res.status(200).json({ message: `Account for ${email} has been successfully created.` }))
    if (err) {
      res.status(400).json('There was a problem processing your request.')
    }
  });
});

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

//DELETE A request_allocation_obligation
app.delete('/requests_allocations_obligations/:id', (req, res) => {
  const { id } = req.params;
  deleteRequest('requests_allocations_obligations', id, res)
})

module.exports = app
