import Joi from 'joi';
import regExes from '../Utils/regExes.js';

const gameSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().pattern(regExes.imageUri).required(),
  stockTotal: Joi.string().pattern(regExes.numericalString).required(),
  categoryId: Joi.number().required(),
  pricePerDay: Joi.string().pattern(regExes.numericalString).required(),
});

export default gameSchema;
