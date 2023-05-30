const express = require('express');
const mongoose = require('./db/config');
const user = require('./db/user');
const app = express();
//handle corse
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
  let userData = new user(req.body);
  let result = await userData.save();
  res.send(result);
});

app.post('/login', async (req, res) => {
  if (req.body.email && req.body.password) {
    let result = await user.findOne(req.body).select('-password');
    res.send(result ? result : 'user not found');
  } else {
    res.send('Invalid data');
  }
});

app.listen(5000);
