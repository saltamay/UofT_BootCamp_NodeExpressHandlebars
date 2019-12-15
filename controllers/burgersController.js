const { getlAllBurger, createBurger, updateBurger, removeBurger } = require('../models/burger');

const express = require("express");

const router = express.Router();

// Create all  routes and set up logic within those routes where required.
router.get("/", async (req, res) => {
  try {
    const results = await getlAllBurger();
    var hbsObject = {
      burgers: results
    };
    if (Array.isArray(results) && results.length) {
      res.render("index", hbsObject);
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    if (error) {
      console.log(error);
      throw error;
    }
  } 
});

router.post('/api/burgers', async (req, res) => {
  try {
    console.log(req.body.name);
    const result = await createBurger(["burger_name"], [req.body.name]);
    if (result.affectedRows === 0) {
      // If no rows were affected, then the neww burger could not been added, so 404
      return res.status(404).end();
    } 
    // Send back the ID of the new burger
    res.status(200).json({ id: result.insertId });
  } catch (error) {
    if (error) {
      console.log(error);
      throw error;
    }
  }
});

router.put('/api/burgers/:id', async (req, res) => {
  try {
    const condition = "id = " + req.params.id;
    console.log(req.body.name)
    const result = await updateBurger({ burger_name: req.body.name }, condition);

    if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  } catch (error) {
    if (error) {
      console.log(error);
      throw error;
    }
  }
});

router.delete('/api/burgers/:id', async (req, res) => {
  try {
    const condition = "id = " + req.params.id;

    const result = await removeBurger(condition);

    if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  } catch (error) {
    if (error) {
      console.log(error);
      throw error;
    }
  }
});

// Export routes for server.js to use.
module.exports = router;
