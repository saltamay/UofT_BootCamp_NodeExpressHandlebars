// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

async function getlAllBurgers() {
  try {
    const results = await orm.all('burgers');
    return results;
  } catch (error) {
    if(error) {
      console.log(error);
      throw error;
    }
  }
}

async function createBurger(cols, vals) {
  try {
    const result = await orm.create('burgers', cols, vals);
    return result;
  } catch (error) {
    if(error) {
      console.log(error);
      throw error;
    }
  }
}

async function updateBurger(colValsObj, condition) {
  try {
    const result = await orm.update('burgers', colValsObj, condition);
    return result;
  } catch (error) {
    if(error) {
      console.log(error);
      throw error;
    }
  }
}

async function removeBurger(condition) {
  try {
    const result = await orm.remove('burgers', condition);
    return result;
  } catch (error) {
    if(error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = {
  getlAllBurgers,
  createBurger,
  updateBurger,
  removeBurger
}