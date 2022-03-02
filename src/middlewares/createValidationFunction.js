export default async function createValidationFunction(req, res, next, schema) {
  function validationFunction() {
    const validate = schema.validate(req.body, { abortEarly: false });

    if (validate.error) {
      return res
        .status(400)
        .send(validate.error.details.map((detail) => detail.message));
    }
    next();
  }
  return validationFunction();
}
