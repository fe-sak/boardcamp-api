import { Router } from 'express';
import {
  createRental,
  readRentals,
  returnRental,
} from '../controllers/rentalsController.js';
import {
  validateCreateRental,
  validateReadRentals,
  validateRentalId,
  validateReturnRental,
} from '../middlewares/validateRentalMiddlewares.js';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import rentalSchema from '../schemas/rentalSchema.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals', validateReadRentals, readRentals);

rentalsRouter.post(
  '/rentals',
  validateSchema(rentalSchema),
  validateCreateRental,
  createRental
);
rentalsRouter.post(
  '/rentals/:id/return',
  validateRentalId,
  validateReturnRental,
  returnRental
);

export default rentalsRouter;
