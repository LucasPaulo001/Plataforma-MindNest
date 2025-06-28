import { validationResult } from 'express-validator';

export const validation = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extratedErrors = [];

  errors.array().map((err) => extratedErrors.push(err));

  return res.status(422).json({
    errors: extratedErrors,
  });
};
