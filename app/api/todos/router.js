const express = require('express');
const router = express.Router();
const { index, show, store, update, destroy, destroyAll, changeStatus } = require('./controller');

router.get('/', index);
router.get('/:id', show);
router.post('/', store);
router.put('/:id', update);
router.delete('/:id', destroy);
router.delete('/', destroyAll);
router.put('/:id/change-status', changeStatus);

module.exports = router;