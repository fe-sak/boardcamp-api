import gameSchema from '../schemas/gameSchema.js';

export default function validateGame(req, res, next) {
  const validate = gameSchema.validate(req.body, {
    abortEarly: false,
  });

  if (req.body.name === '') return res.sendStatus(400);

  if (validate.error)
    return res
      .status(422)
      .send(validate.error.details.map((detail) => detail.message));

  next();
}
