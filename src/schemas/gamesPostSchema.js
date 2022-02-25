import Joi from 'joi';

import JoiImageExtension from 'joi-image-extension';

const Joi = Joi.extend(JoiImageExtension);

const gamesPostSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.image().required(),
  stockTotal: Joi.string().required(),
  categoryId: Joi.number().required(),
  pricePerDay: Joi.string().required(),
});
