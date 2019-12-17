const { getlAllBurgers, createBurger, updateBurger, removeBurger } = require('../models/burger');

const express = require("express");

const router = express.Router();

// Create all  routes and set up logic within those routes where required.
router.get("/", async (req, res) => {
  try {
    const results = await getlAllBurgers();
    const hbsObject = {
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

router.get('/devour', async (req, res) => {
  try {
    const results = await getlAllBurgers();
    const hbsObject = {
      burgers: results
    };
    if (Array.isArray(results) && results.length) {
      res.render("devour", hbsObject);
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

router.get('/byob', (req, res) => {
  const premiumToppings = {
    firstRow: ['Bacon', 'Pepper Jack', 'Swiss'],
    secondRow: ['Cheddar', 'Goat Cheese', 'Ginger Glazed Pineapple'],
    thirdRow: ['Sauteed Mushrooms', 'Cheese Curd']
  };

  const toppings = {
    firstRow: ['Tomatoes', 'Lettuce', 'Cucumber', 'Pickles', 'Guacamole', 'Hot Peppers', 'Red Onions', 'Cajun', 'Onions'],
    secondRow: ['Green Olives', 'Dijon Mustard', 'Honey Mustard', 'Yellow Mustard', 'Ketchup', 'BBQ Sauce', 'Hot Sauce', 'Jalapeno', 'Sour Cream'],  
    thirdRow: ['Signature Sauce', 'Gourmet Dill Pickle Relish', 'Hot Pepper Relish', 'Mango Chutney Relish', 'Sweet Relish', 'Garlic Mayo', 'Wasabi Mayo']
  }

  const onTheGrill = [
    {
      img_url: './assets/images/byob-burger.png',
      burger_info: 'Our beef is 100% fresh, never frozen, Canadian Angus. Raised without the use of antibiotics or hormones. No fillers, no steroids.'
    },
    {
      img_url: './assets/images/byob-veggie.png',
      burger_info: 'Soy based. Low in fat, high in fibre. Vegan friendly.'
    },
    {
      img_url: './assets/images/byob-chicken.png',
      burger_info: 'Whole chicken breast, no additives, hormone free, grain fed, flame grilled.'
    },
    {
      img_url: './assets/images/byob-hotdog.png',
      burger_info: 'Grilled, 100% beef. No added hormones, antibiotics, or by-products.'
    },
    {
      img_url: './assets/images/byob-turkey.png',
      burger_info: 'Grain-fed turkey, grilled fresh to order. No added hormones or steroids.'
    }
  ]
  res.render('byob', {
    premiums: premiumToppings,
    toppings: toppings,
    grills: onTheGrill
  });
})

router.post('/api/burgers', async (req, res) => {
  try {
    const { burger_name, burger_info, devoured, img_url } = req.body;
    const result = await 
    createBurger(
      ["burger_name", "burger_info", "devoured", "img_url"], 
      [burger_name, burger_info, devoured, img_url]);
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
    console.log(req.body);
    const result = await updateBurger(req.body, condition);

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
