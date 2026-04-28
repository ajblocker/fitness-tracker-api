//create middleware function and return it back
export function authorizeRoles(...allowedRoles) {
  //high order function
  return function (req, res, next) {
    //check if user role is included in allowedRoles[] array
    if (!allowedRoles.includes(req.user.role)) {
      const error = new Error('Forbidden: insufficient permission.');
      error.status = 403;
      return next(error);
    }
    //proceed
    return next();
  };
}
