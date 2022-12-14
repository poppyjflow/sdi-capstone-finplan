const bcrypt = require('bcrypt');

const passHasher = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt)
  return hash;
}

const hashCompare = async (inputPassword, storedHash) => {
  try{
    let doesMatch = bcrypt.compareSync(inputPassword, storedHash)
    return doesMatch
  }
  catch(err){
    console.log('Occurred in hashCompare', err)
  }
}

module.exports = {passHasher, hashCompare}