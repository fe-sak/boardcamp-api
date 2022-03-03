import Joi from 'joi';
import imageUriPattern from '../Utils/imageUriRegEx.js';
import numericalStringRegEx from '../Utils/numericalString.js';

const gameSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().pattern(imageUriPattern).required(),
  stockTotal: Joi.string().pattern(numericalStringRegEx).required(),
  categoryId: Joi.number().required(),
  pricePerDay: Joi.string().pattern(numericalStringRegEx).required(),
});

export default gameSchema;
