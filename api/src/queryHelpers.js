const {passHasher, hashCompare} = require('./hashingHelpers.js')
const express = require('express');

const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)
const app = express();

//REQUEST HELPERS

//BASIC GET REQUEST
const getRequest = (table, res) => {
  knex(`${table}`)
    .select('*')
    .then(rows => res.status(200).json(rows))
    .catch(err => {
      console.log('Occurred in getRequest', err)
      res.status(400).json('There was a problem accessing the database.')
    })
}

//GET AN ID FOR A GIVEN NAME
const getID = async (name, columnName, table) => {
  let id = await knex(`${table}`)
  .select(`id`)
  .where(`${columnName}`, '=', `${name}`)
  .then(idField => {
    return idField.length ? idField[0].id : null
  })
  .catch(err => {
    console.log('Occurred at getID', err)
  })
  return id
}

//GET THE HASH FOR A USERNAME
const getUserhash = async (username) => {
  let hash = await knex('users')
    .select('passwd')
    .where('uname', '=', `${username}`)
    .then(passField => {
      return passField.length ? passField[0].passwd : null
    })
    .catch(err => {
      console.log('Occurred in getUserHash', err)
    })
  return hash
}

//VERIFY USERNAME EXISTENCE
const checkUsername = async (username) => {
  let password = await getUserhash(username)
  try{
    password !== null ? true : false
  }
  catch(err){
    console.log('Occured in checkUsername', err)
  }
}

//GET ALL DATA FOR A GIVEN ID
const getWithID = (table, id_param, id_value, res) => {
    knex(`${table}`)
    .select('*')
    .where(`${id_param}`, '=', `${id_value}`)
    .then(rows => res.status(200).json(rows))
    .catch(err => {
      console.log('Occurred in getWithID', err)
      res.status(400).json('There was an error accessing the database.')
    })
}

//GET USERNAME WITH A GIVEN ID
const getUsername = async (userID) => {
  let username = await knex('users')
    .select('uname')
    .where('id', '=', `${id}`)
    .then(username => username)
    .catch(err => {
      console.log(err);
      res.status(400).json('There was an error accessing the database.')
    })
  return username
}

//GENERIC DELETE REQUEST
const deleteRequest = (table, id, res) => {
  knex(`${table}`)
    .delete('*')
    .where('id', '=', `${id}`)
    .then(() => res.status(200).json('Deletion successful'))
    .catch(err => {
      console.log('Occurred in deleteRequest', err)
      res.status(400).json('There was a problem processing your request.')
    })
}

module.exports = { getRequest, getWithID, deleteRequest, checkUsername, getUserhash, getUsername, getID }