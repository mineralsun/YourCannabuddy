const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    console.log('/productType GET route');
    // GET route code here
    console.log('is authenticated?', req.isAuthenticated());
    if (req.isAuthenticated()) {
      console.log('user', req.user);
      let queryText = `SELECT * FROM "productType";`
      pool.query(queryText).then((result) => {
        console.log(result.rows)
        res.send(result.rows);
      }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
    } else {
      res.sendStatus(403);
    }
  });

module.exports = router;