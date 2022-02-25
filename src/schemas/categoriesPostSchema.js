import joi from 'joi';

const categoriesPostSchema = joi.object({
  name: joi.string().required(),
});

export default categoriesPostSchema;
