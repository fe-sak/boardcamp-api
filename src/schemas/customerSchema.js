import Joi from 'joi';
import cpfRegEx from '../Utils/cpfRegEx.js';
import phoneRegEx from '../Utils/phoneRegEx.js';

const customerSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().pattern(phoneRegEx).required(),
  cpf: Joi.string().pattern(cpfRegEx).required(),
  birthday: Joi.string().isoDate().required(),
});

export default customerSchema;
