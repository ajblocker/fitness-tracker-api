import rateLimit from 'express-rate-limit';

//create and return rateLimit higher order middleware function
//eliminates risk of brute force attacks
export const logInLimiter = rateLimit({
  //set timeframe for limit in ms
  windowMs: 60 * 1000,
  //define max number of request allowed in time window
  limit: process.env.NODE_ENV === 'test' ? 1000 : 3,
  //runs when limit is exceeded
  handler: function (req, res, next) {
    const error = new Error('Too many login requests. Try again later.');
    error.status = 429;
    next(error);
  },
});
