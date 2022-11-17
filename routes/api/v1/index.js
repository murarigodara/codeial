// const express = require('express');

// const router = express.Router();

// router.use('/posts', require('./posts'));
// router.use('/users', require('./users'));
// module.exports = router;
const express = require('express');

const router = express.Router();

router.use('/posts', require('./posts'));
router.use('/users', require('./users'));

module.exports = router;