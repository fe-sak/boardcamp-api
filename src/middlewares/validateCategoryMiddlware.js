import categorySchema from '../schemas/categorySchema.js';
import createValidationFunction from './createValidationFunction.js';

export default function validateCategory(req, res, next) {
  createValidationFunction(req, res, next, categorySchema);
}
