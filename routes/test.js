const express = require('express');
const {startTest} = require("../utils/engine");
const router = express.Router();

router.post('/test', function(req, res, next) {
  res.send(startTest(req.body));
});

module.exports = router;
