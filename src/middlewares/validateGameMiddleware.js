import gameSchema from '../schemas/gameSchema.js';
import createValidationFunction from './createValidationFunction.js';

export default function validateGame(req, res, next) {
  createValidationFunction(req, res, next, gameSchema);
}
