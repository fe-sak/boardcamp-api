import Joi from 'joi';
import regExes from '../Utils/regExes.js';

const customerSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().pattern(regExes.phone).required(),
  cpf: Joi.string().pattern(regExes.cpf).required(),
  birthday: Joi.string().isoDate().required(),
});

export default customerSchema;
