export default function validateSchema(schema) {
  return (req, res, next) => {
    const validate = schema.validate(req.body, { abortEarly: false });

    if (validate.error) {
      return res
        .status(400)
        .send(validate.error.details.map((detail) => detail.message));
    }
    next();
  };
}
