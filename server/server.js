const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
dotenv.config();
const db = require('./db.js');
const userRouter = require('./routes/userRouter');
const app = express();
const jwt = require('jsonwebtoken');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// Route handlers

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(path.resolve(), 'dist')));
//   app.get('/*', function (_req, res) {
//     return res.sendFile(path.join(path.resolve(), 'dist', 'index.html'));
//   });
// }

app.use('/user', userRouter);

app.use('*', (req, res) => {
  return res.status(404).send('Invalid endpoint');
});

app.use((err, req, res) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}...`);
});
