const {  getRequest, getWithID, deleteRequest, checkUsername, getUserhash, getUsername, getID } = require('./queryHelpers.js');
const { getBannerData } = require('./banner.js');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { randomBytes } = require('node:crypto');

const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];
const knex = require('knex')(config);
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const formatNum = (num) => {
  return num.replaceAll(',', '');
}

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
  getWithID('requests', 'id', id, res);
});

//GET EMAIL NOTIFICATIONS FOR SPECIFIC UNIT ID
app.get('/email_notifications/:id', (req, res) => {
  const { id } = req.params;
  getWithID('notifications', 'org_id', id, res);
});


app.get('/orgs', (req, res) => {
  knex('orgs')
    .select('*')
    .then((result) => res.status(201).json(result))
})

app.get('/majcoms', (req, res) => {
  knex('orgs')
    .select('*')
    .whereNull('majcom')
    .then((result) => res.status(201).json(result))
})

app.get('/:majcom/wings', (req, res) => {
  const { majcom } = req.params;
  knex('orgs')
    .select('*')
    .where('majcom', majcom)
    .whereNull('wing')
    .then((result) => res.status(201).json(result))
})

app.get('/:wing/groups', (req, res) => {
  const { wing } = req.params;
  knex('orgs')
    .select('*')
    .whereNull('group')
    .where('wing', wing)
    .then((result) => res.status(201).json(result))
})

app.get('/:group/squadrons', (req, res) => {
  const { group } = req.params;
  knex('orgs')
    .select('*')
    .where('group', group)
    .then((result) => res.status(201).json(result))
})

//GET ALL USERS
app.get('/users', (req, res) => {
  getRequest('users', res);
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  knex('users')
    .select('id', 'org', 'branch', 'rank', 'l_name', 'f_name', 'email', 'is_admin')
    .where('id', id)
    .then((result) => res.status(201).send(result))
});



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
      res.status(400).json('There was a problem updating the user.');
    });
});

app.post('/requests', (req, res) => {

  const {
    user,
    org,
    priority,
    reqCode,
    reqDate,
    requested,
    title,
    description,
  } = req.body;

  knex('requests')
    .insert({
      user: user,
      org: org,
      req_date: reqDate,
      priority: priority,
      requested: formatNum(requested),
      req_code: reqCode,
      req_title: title,
      description: description,
    })
    .then(() => res.status(201).json('Request successfully created.'))
    .catch(err => {
      console.log(err);
      res.status(400).json('There was an error posting to the database.');
    });
});

app.put('/requests/:id', (req, res) => {
  const { org, reqCode, reqDate, priority, allocated, requested, obligated, title, description, } = req.body;
  const { id } = req.params;
  knex('requests')
    .where('id', id)
    .update({
      org: org,
      req_code: reqCode,
      req_date: reqDate,
      priority: priority,
      requested: requested,
      allocated: allocated,
      obligated: obligated,
      req_title: title,
      description: description,
    })
    .then(() => res.status(201).json('Request successfully created.'))
    .catch(err => {
      console.log(err);
      res.status(400).json('There was an error posting to the database.');
    });
});

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
      .then(() => res.status(200).json({ message: `Account for ${email} has been successfully created.` }));
    if (err) {
      res.status(400).json('There was a problem processing your request.');
    }
  });
});

app.post('/email_notifications', (req, res) => {
  let { org_id, frequency, due_date } = req.body;
  console.log(req.body)
  // console.log(`before: ${due_date}`);
  //  due_date = new Date(due_date)
  // console.log(`after: ${due_date}`);

  try {
    if (org_id === null) {
      res.status(400).json(`No org name passed.`);
    }
    knex('notifications')
      .insert({
        org_id: `${org_id}`,
        frequency: `${frequency}`,
        due_date: `${due_date}`,
      })
      .then(() => res.status(201).json('Creation successful.'));
  }
  catch (err) {
    console.log(err);
    res.status(400).json('There was an error posting to the database.');
  }
});

app.get('/requests/org/:id', async (req, res) => {
  const { id } = req.params;
  knex('request')
    .select('*')
    .where('org', id)
    .then(requests => {
      const data = requests.map((request) => request);
      res.status(200).send(data);
    });
});

app.get('requests/user/:id', async (req, res) => {
  const { id } = req.params;
  knex('request')
    .select('*')
    .where('user', id)
    .then(requests => {
      const data = requests.map((request) => request);
      res.status(200).send(data);
    });
});

// This spools-up the data for the summary banner at the top of the grid page.
app.post('/banner', async (req, res) => {
  const { org_id, year_fy } = req.body;
  getBannerData(res, org_id, year_fy);
});

//DELETE A SPECIFIC REQUEST
app.delete('/requests/:id', (req, res) => {
  const { id } = req.params;
  deleteRequest('requests', id, res);
});

//DELETE AN EMAIL NOTIFICATION
app.delete('/email_notifications/:id', (req, res) => {
  const { id } = req.params;
  knex(`notifications`)
    .delete('*')
    .where('org_id', '=', `${id}`)
    .then(() => res.status(200).json('Deletion successful'))
    .catch(err => {
      console.log('Occurred in deleteRequest', err)
      res.status(400).json('There was a problem processing your request.')
    })
});

//DELETE A SPECIFIC USER
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  deleteRequest('users', id, res);
});

module.exports = app

