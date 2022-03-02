import categorySchema from '../schemas/categorySchema.js';

export default function validateCategory(req, res, next) {
  const validate = categorySchema.validate(req.body, {
    abortEarly: false,
  });

  if (req.body.name === '') return res.sendStatus(400);

  if (validate.error) {
    res
      .status(422)
      .send(validate.error.details.map((detail) => detail.message));
    return;
  }
  next();
}
