var connection = require("../config/connection.js");

const orm = {
  // Helper function to convert object key/value pairs to SQL syntax
  objToSql: function(ob) {
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
  },
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
      const query = 
      `INSERT INTO ${table} (${cols.toString()}) VALUES ("${vals.toString()}")`;
      connection.query(query, (err, result, fields) => {
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
      `UPDATE ${table} SET ${this.objToSql(colValsObj)} WHERE ${condition}`;
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