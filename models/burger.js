// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

async function all() {
  try {
    const results = await orm.all('burgers');

    if (Array.isArray(results) && results.length) {
      return results;
    } else {
      throw new Error('Request failed');
    }
  } catch (error) {
    if(error) {
      console.log(error);
      throw error;
    }
  }
}

async function create(cols, vals) {
  try {
    const results = await orm.create('burgers', cols, vals);

    if (Array.isArray(results) && results.length) {
      console.log(results);
      return results;
    }
    // } else {
    //   throw new Error('Request failed');
    // }
  } catch (error) {
    if(error) {
      console.log(error);
      throw error;
    }
  }
}

async function update(colValsObj, condition) {
  try {
    const results = await orm.update('burgers', colValsObj, condition);

    // if (Array.isArray(results) && results.length) {
    //   return results;
    // } 
  } catch (error) {
    if(error) {
      console.log(error);
      throw error;
    }
  }
}

async function remove(condition) {
  try {
    const results = await orm.remove('burgers', condition);
    console.log(results)
    if (results.affectedRows !== 0) {
      return results;
    } else {
      throw new Error('Request Failed');
    }
  } catch (error) {
    if(error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = {
  all,
  create,
  update,
  remove
}