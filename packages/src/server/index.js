const router = require('express').Router();
const manifest = require('./manifest.js');

router.get('/:siteId/manifest.json', manifest);

module.exports = router
