const { all, create, update, remove } = require('../models/burger');

const express = require("express");

const router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", async (req, res) => {
  try {
    const data = await all();
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
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
    const result = await create(["burger_name"], [req.body.name]);
    // Send back the ID of the new quote
    // res.json({ id: result.insertId });
    res.status(200).end();
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
    console.log("condition", condition);
    console.log(req.body.name)
    const result = await update({ burger_name: req.body.name }, condition);

    // if (result.changedRows === 0) {
    //   // If no rows were changed, then the ID must not exist, so 404
    //   return res.status(404).end();
    // }
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
    console.log("condition", condition);

    const result = await remove(condition);

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
