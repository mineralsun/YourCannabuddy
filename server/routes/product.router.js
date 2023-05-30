const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// This allows a user to retrieve their stash stored in the database
router.get('/', (req, res) => {
  console.log('/product GET route');
  // GET route code here
  console.log('is authenticated?', req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log('user', req.user);
    let queryText = `SELECT "products".*, 
                            "topEffect"."top_effect_name" AS "top_effect_id", 
                            "productType"."typeName" AS "product_id"
                             FROM "products"
                             JOIN "productType" ON "products"."product_id" = "productType"."id"
                             JOIN "topEffect" ON "products"."top_effect_id" = "topEffect"."id"
                             WHERE "user_id" = $1;`
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

router.get('/:id', (req, res) => {
  console.log(req.body)
  const queryText = `SELECT * FROM products WHERE "id" = $1`;
  pool.query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log('ERROR: get specific products', error)
      res.sendStatus(500);
    })
})

// This is my route to filter specific products
router.get('/filter/:id', (req, res) => {
  const queryText = `SELECT "products"."product_id", 
                    "productType"."typeName" AS "product_id"
                     FROM "products"
                     JOIN "productType" ON "products"."product_id" = "productType"."id"
                     WHERE "product_id" = $1 AND "user_id" = $2;`
  pool.query(queryText, [req.body.product_id, req.user.id])
  .then((result) => {
    res.send(result.rows[0]);
  })
  .catch((error) => {
    console.log(`Error in filter route, ${error}`)
    res.sendStatus(500);
  })
})

router.put('/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `UPDATE "products" 
    SET "product_name" = $1, "brand_name" = $2, "product_id" = $3, "rating" = $4, "comments" = $5, "top_effect_id" = $6, "isFavorite" = $7
    WHERE "id" = $8 AND "user_id" = $9;`;
    pool.query(queryText,
      [req.body.newProduct.product_name, req.body.newProduct.brand_name, req.body.newProduct.product_id, req.body.newProduct.rating, req.body.newProduct.comments, req.body.newProduct.top_effect_id, req.body.newProduct.isFavorite, req.params.id, req.user.id,])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500)
      })
  } else {
    res.sendStatus(403);
  }
})

router.delete('/:id', (req, res) => {
  console.log('/products DELETE route');
  console.log('is authenticated?', req.isUnauthenticated());
  console.log('user:', req.user)
  if (req.isAuthenticated()) {
    let queryText = `DELETE FROM products WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
      .then(() => { res.sendStatus(200); })
      .catch((error) => {
        console.log(`ERROR in DELETE router, ${error}`);
        res.sendStatus(500);
      });
  }
})

router.post('/', (req, res) => {
  console.log('/products POST route');
  console.log(req.body);
  console.log('is authenticated?', req.isUnauthenticated());
  console.log('user:', req.user);
  if (req.isAuthenticated()) {
    let queryText = `
    INSERT INTO "products" ("user_id", "product_name", "brand_name", "product_id", "rating", "comments", "top_effect_id", "isFavorite")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    pool.query(queryText, [req.user.id, req.body.newProduct.product_name, req.body.newProduct.brand_name, req.body.newProduct.product_id, req.body.newProduct.rating, req.body.newProduct.comments, req.body.newProduct.top_effect_id, req.body.newProduct.isFavorite])
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