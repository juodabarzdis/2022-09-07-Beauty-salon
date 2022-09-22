export const auth = (req, res, next) => {
  if (req.session.user.role === 0) {
    return next();
  } else {
    res.status(401).send("Your session has expired. Please log in again.");
  }
};

export const adminAuth = (req, res, next) => {
  if (req.session.user.role === 1) {
    return next();
  } else {
    res.status(401).send("Your session has expired. Please log in again.");
  }
};
