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
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy
const oAuthRouter = require('./routes/oAuthRouter');
const dataRouter = require('./routes/dataRouter');

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

passport.use(
  new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET_KEY,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, cb) => {
      const user = await User.findOne({
          accountId: profile.id,
          provider: 'github',
      })
      if(!user){
          console.log('Adding new github user to DB..');
          const user = new User({
              accountId : profile.id,
              name: profile.username,
              provider: profile.provider,
          })
          await user.save();
          return cb(null, profile);
      }
  }
  )
)
app.use('/', (req, res) => {
  console.log(path.resolve(__dirname, '../build'));
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});
app.use('/user', userRouter);
app.use('/auth', oAuthRouter);
app.use('/data', dataRouter);

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
