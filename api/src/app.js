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

app.get('/requests', (req, res) => {
  knex({ reqs: 'requests' })
    .join('users', 'users.id', 'user')
    .join('orgs', 'reqs.org', 'orgs.id')
    .select('reqs.*', 'users.l_name', 'users.f_name', 'orgs.name as org_name')
    .then((result) => {
      res.status(201).json(result)
    })
})

//GET REQUEST w/ ID
app.get('/requests/:id', (req, res) => {
  const { id } = req.params;
  getWithID('requests', 'id', id, res)
})

//GET ALL ORGS
app.get('/orgs', (req, res) => {
  knex('orgs')
    .select('*')
    .then((result) => res.status(201).json(result))
})

//GET ALL USERS
app.get('/users', (req, res) => {
  getRequest('users', res)
})

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  getWithID('users', 'id', id, res)
})

app.patch('/requests/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  knex('requests')
    .where('id', '=', `${id}`)
    .update({
      user: `${body.user}`,
      quarter: `${body.quarter}`,
      priority: `${body.priority}`,
      cost: `${body.cost}`,
      request_code: `${body.requestCode}`,
      request_title: `${body.descTitle}`,
      description: `${body.descDetails}`,
    })
    .then(() => res.status(201).json('Request has been successfully updated.'))
    .catch(err => {
      console.log(err);
      res.status(400).json('There was a problem processing your request.')
    })
})

app.patch('/users/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  knex('users')
    .where('id', '=', `${id}`)
    .update({
      rank: `${body.rank}`,
      f_name: `${body.firstname}`,
      l_name: `${body.lastname}`,
      org: `${body.org}`,
      email: `${body.email}`,
      branch: `${body.branch}`
    })
    .then(() => res.status(201).json('User has been successfully updated.'))
    .catch(err => {
      console.log(err);
      res.status(400).json('There was a problem updating the user.')
    })
})

app.post('/requests', (req, res) => {

  const {
    user,
    org,
    priority,
    reqCode,
    reqDate,
    cost,
    title,
    description,
    impact,
  } = req.body;

  knex('requests')
    .insert({
      user: user,
      req_date: reqDate,
      org: org,
      priority: priority,
      cost: cost,
      req_code: reqCode,
      req_title: title,
      description: description,
      req_impact: impact,
    })
    .then(() => res.status(201).json('Request successfully created.'))
    .catch(err => {
      console.log(err);
      res.status(400).json('There was an error posting to the database.')
    })
})

//LOGIN
app.post('/login', async (req, res) => {
  const { email } = req.body;
  const plain = req.body.password;
  knex('users')
    .select('email', 'password', 'id')
    .where('email', email.toLowerCase())
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

//CREATE NEW USER
app.post('/users', async (req, res) => {
  const { org, branch, rank, firstName, lastName, email, isAdmin } = req.body;
  const plain = req.body.password;
  bcrypt.hash(plain, saltRounds, (err, hash) => {
    knex('users')
      .insert({
        org: org,
        branch: branch,
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

module.exports = app

