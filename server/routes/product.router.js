const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// This allows a user to retrieve their stash stored in the database
router.get('/', (req, res) => {
    console.log('/product GET route');
  // GET route code here
    console.log('is authenticated?', req.isAuthenticated());
    if(req.isAuthenticated()) {
        console.log('user', req.user);
        let queryText = `SELECT * FROM "products" 
                         JOIN "productType" ON "products"."product_id" = "productType"."id"
                         JOIN "topEffect" ON "products"."top_effect_id" = "topEffect"."id"
                         WHERE "user_id" = $1;`;
        pool.query(queryText, [req.user.id]).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

// router.get('/', (req, res) => {
//   if(req.isAuthenticated()) {
//     console.log('user', req.user);
//     let queryText = `SELECT * FROM "productType"`;
//     pool.query(queryText, [req.user.id]).then((result) => {
//       res.send(result.rows);
//     }).catch((error) => {
//       console.log(error);
//       res.sendStatus(500);
//     });
//   } else {
//     res.sendStatus(403);
//   }
// })

router.get('/type', (req, res) => {
  const query = `SELECT * FROM "productType" JOIN "productType_topEffect"
                 ON "productType"."id" = "productType_topEffect"."product_id";`;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error in GET product types router ${error}`);
      res.sendStatus(500);
    })
});

router.get('/effect', (req, res) => {
  const query = `SELECT * FROM "topEffect" JOIN "productType_topEffect"
                 ON "topEffect"."id" = "productType_topEffect"."top_effect_id";`;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error in GET product types router ${error}`);
      res.sendStatus(500);
    })
});

// This route should allow a user to add a product to their stash!
router.post('/', (req, res) => {
  console.log('/products POST route');
  console.log(req.body);
  console.log('is authenticated?', req.isUnauthenticated());
  console.log('user:', req.user);
  if(req.isAuthenticated()) {
    let queryText = `
    INSERT INTO "products" ("user_id", "product_name", "brand_name", "product_id", "rating", "comments", "top_effect_id", "isFavorite")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    pool.query(queryText, [req.user.id, req.body.product_name, req.body.brand_name, req.body.product_id, req.body.rating, req.body.comments, req.body.top_effect_id, req.body.isFavorite])
    .then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log(`Error in POST route ${error}`);
        res.sendStatus(500);
    })
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;