import categorySchema from '../schemas/categorySchema.js';

export default function categoryValidation(req, res, next) {
  const validate = categorySchema.validate(req.body, {
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
