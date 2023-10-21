const express=require('express');
const router=express.Router();
const myController = require('../controllers/fileController');

router.get('/', myController.home);
router.post("/create/", myController.create);
router.get("/delete/:file", myController.delete);
router.get("/view/:file", myController.view);

module.exports = router;