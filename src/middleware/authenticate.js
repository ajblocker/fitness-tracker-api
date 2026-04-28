import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
//only users with a valid token can proceed
export function authenticate(req, res, next) {
  //verification fails and/or token expires
  const err = new Error('Not authenticated. Please provide a valid token.');
  err.status = 401;
  //read auth header from request
  const authHeader = req.headers.authorization;
  //check if header exists with bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(err);
  }
  //if header is valid, extract token and take second element
  const token = authHeader.split(' ')[1];
  try {
    //verify token and if succeed return decoded payload
    const payload = jwt.verify(token, JWT_SECRET);
    //attach info to req.user
    req.user = { id: payload.userId, role: payload.role };
    //call next middleware to continue
    next();
  } catch (error) {
    return next(err);
  }
}

//optional authentication
export function authenticateOptional(req, res, next) {
  const authHeader = req.headers.authorization;
  //if no token provided, just continue without setting req.user
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }
  //if header is valid, extract token
  const token = authHeader.split(' ')[1];
  try {
    //verify token and if succeed, set req.user
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.userId, role: payload.role };
  } catch (error) {
    //if token is invalid, just ignore it and continue without req.user
  }

  //always continue to next middleware
  next();
}
