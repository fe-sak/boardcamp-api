import customerSchema from '../schemas/customerSchema.js';
import createValidationFunction from './createValidationFunction.js';

export default function validateCustomer(req, res, next) {
  createValidationFunction(req, res, next, customerSchema);
}
