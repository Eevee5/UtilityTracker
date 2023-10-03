const express = require('express');
const router = express.Router();
const JWTController = require('../controllers/JWTController');
const dataController = require('../controllers/dataController');

router.get('/bills', JWTController.validateToken, dataController.getData, (req, res) => {
  res.status(200).send(res.locals.data);
});

router.post('/bills', JWTController.validateToken, dataController.addData, (req, res) => {
  res.status(201).send();
});

router.patch('/bills', JWTController.validateToken, dataController.addData, (req, res) => {
  res.status(200).send();
});

router.delete('/bills', JWTController.validateToken, dataController.deleteData, (req, res) => {
  res.status(202).send();
});


module.exports = router;