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

app.post('/requests', (req, res) => {
  const { body } = req;
  knex('requests')
    .insert({
      pri_ranking: `${body.priRanking}`,
      user: `${body.user}`,
      unit: `${body.unit}`,
      pri_code: `${body.priCode}`,
      request_code: `${body.requestCode}`,
      desc_title: `${body.descTitle}`,
      desc_details: `${body.descDetails}`,
      desc_impact: `${body.descDetails}`
    })
    .then(() => res.status(201).json('Request successfully created.'))
    .catch(err => {
      console.log(err);
      res.status(400).json('There was an error posting to the database.')
    })
})

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

module.exports = app