import { validationResult } from 'express-validator';

//middleware to handle validation errors from express-validator
export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  //if there are validation errors, return a 400 Bad Request with the error messages
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }
  next();
}
