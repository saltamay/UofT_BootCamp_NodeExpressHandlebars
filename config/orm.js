var connection = require("../config/connection.js");

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (const [key, value] in Object.entries(ob)) {
    // var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty(key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push = `${key}=${value}`;
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }
}

function all (table) {
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
} 

function create (table, cols, vals) {
  return new Promise((resolve, reject) => {
    const query = 
    `INSERT INTO ${table}
      (${cols.toString()}) 
      VALUES (${vals.toString()})`;
    connection.query(query, (err, results, fields) => {
      if(err) {
        console.log(err);
        reject(err);
      }
      resolve(results);
    });
  });
}

function update (table, colVals, condition) {
  return new Promise((resolve, reject) => {
    const query = 
    `UPDATE ${table}
      SET ${objToSql(colVals)}
      WHERE ${condition}`;
    connection.query(query, (err, results, fields) => {
      if(err) {
        console.log(err);
        reject(err);
      }
      resolve(results);
    });
  });
}

function remove (table, condition) {
  return new Promise((resolve, reject) => {
    const query = 
    `DELETE FROM ${table}
      WHERE ${condition}`;
    connection.query(query, (err, results, fields) => {
      if(err) {
        console.log(err);
        reject(err);
      }
      resolve(results);
    });
  });
}

module.exports = {
  all,
  create,
  update,
  remove
}