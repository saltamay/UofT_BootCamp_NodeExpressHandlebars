// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

async function all() {
  try {
    const results = await orm.all('burgers');

    if (Array.isArray(results) && results.length) {
      return results;
    } else {
      throw err ('Request failed');
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
    const results = await create('burger', cols, vals);

    if (Array.isArray(results) && results.length) {
      return results;
    } else {
      throw err ('Request failed');
    }
  } catch (error) {
    if(error) {
      console.log(error);
      throw error;
    }
  }
}

async function update(colValsObj, condition) {
  try {
    const results = await create('burger', colValsObj, condition);

    if (Array.isArray(results) && results.length) {
      return results;
    } else {
      throw err ('Request failed');
    }
  } catch (error) {
    if(error) {
      console.log(error);
      throw error;
    }
  }
}

async function remove(condition) {
  try {
    const results = await create('burger', condition);

    if (Array.isArray(results) && results.length) {
      return results;
    } else {
      throw err ('Request failed');
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