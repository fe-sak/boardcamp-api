import Joi from 'joi';
import imageUriPattern from '../Utils/imageUriRegEx.js';

const gameSchema = Joi.object({
  name: Joi.string().required().allow(''),
  image: Joi.string().pattern(imageUriPattern).required(),
  stockTotal: Joi.string().required(),
  categoryId: Joi.number().required(),
  pricePerDay: Joi.string().required(),
});

export default gameSchema;
