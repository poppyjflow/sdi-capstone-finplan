const {passHasher, hashCompare} = require('./hashingHelpers.js')
const express = require('express');

const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)
const app = express();

//REQUEST HELPERS
const getRequest = (table, res) => {
  knex(`${table}`)
    .select('*')
    .then(rows => res.status(200).json(rows))
    .catch(err => {
      console.log(err)
      res.status(400).json('There was a problem accessing the database.')
    })
}

const getWithID = (table, id_param, id_value, res) => {
    knex(`${table}`)
    .select('*')
    .where(`${id_param}`, '=', `${id_value}`)
    .then(rows => res.status(200).json(rows))
    .catch(err => {
      console.log(err)
      res.status(400).json('There was an error accessing the database.')
    })
}

const deleteRequest = (table, id, res) => {
  knex(`${table}`)
    .delete('*')
    .where('id', '=', `${id}`)
    .then(() => res.status(200).json('Deletion successful'))
    .catch(err => {
      console.log(err)
      res.status(400).json('There was a problem processing your request.')
    })
}

module.exports = { getRequest, getWithID, deleteRequest}