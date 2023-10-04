const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const JWTController = {};

// TOKEN_SECRET
JWTController.generateToken = (req, res, next) => {
  console.log('in generateToken');
  console.log('userID ' + res.locals.userId);
  const token = jwt.sign(
    { userId: res.locals.userId },
    process.env.TOKEN_SECRET,
    {
      expiresIn: '1800s',
    }
  );
  // const jwtToken = jwt.sign(
  //   { client_id: clientID },
  //   process.env.TOKEN_SECRET
  // );
  console.log('token ' + token);
  res.locals.token = token;

  return next();
};

JWTController.validateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  try {
    const valid = jwt.verify(token, process.env.TOKEN_SECRET);
    res.locals.userId = valid;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = JWTController;
