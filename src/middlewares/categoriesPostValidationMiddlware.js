import categoriesPostSchema from '../schemas/categoriesPostSchema.js';

export default function categoriesPostValidation(req, res, next) {
  const validate = categoriesPostSchema.validate(req.body, {
    abortEarly: false,
  });

  if (validate.error) {
    res
      .status(422)
      .send(validate.error.details.map((detail) => detail.message));
    return;
  }
  next();
}
