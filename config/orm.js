var connection = require("../config/connection.js");

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  const arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (let [key, value] of Object.entries(ob)) {
    // var value = ob[key];
    // check to skip hidden properties
    console.log(`${key} and ${value}`)
    // if (Object.hasOwnProperty(key)) {
    //   // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
    // } 
    if (typeof value === "string") {
      value = "'" + value + "'";
    }
    // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
    // e.g. {sleepy: true} => ["sleepy=true"]
    arr.push(`${key}=${value}`);
  }
  console.log(arr);
  return arr.toString();
}
function printQuestionMarks(num) {
  const arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

const orm = {
  all: function(table) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ${table}`;
      connection.query(query, (err, results, fields) => {
        if(err) {
          console.log(err);
          reject(err);
        }
        resolve(results);
      });
    });
  },
  create: function(table, cols, vals) {
    return new Promise((resolve, reject) => {
      let query = 
      `INSERT INTO ${table} (${cols.toString()}) VALUES (`; 
      query += printQuestionMarks(vals.length);
      query += ')';
      console.log(query);
      connection.query(query, vals, (err, result, fields) => {
        if(err) {
          console.log(err);
          reject(err);
        }
        resolve(result);
      });
    });
  },
  update: function(table, colValsObj, condition) {
    return new Promise((resolve, reject) => {
      const query = 
      `UPDATE ${table} SET ${objToSql(colValsObj)} WHERE ${condition}`;
      connection.query(query, (err, result, fields) => {
        if(err) {
          console.log(err);
          reject(err);
        }
        resolve(result);
      });
    });
  },
  remove: function(table, condition) {
    return new Promise((resolve, reject) => {
      const query = 
      `DELETE FROM ${table} WHERE ${condition}`;
      connection.query(query, (err, results, fields) => {
        if(err) {
          console.log(err);
          reject(err);
        }
        resolve(results);
      });
    });
  }
}

module.exports = orm;