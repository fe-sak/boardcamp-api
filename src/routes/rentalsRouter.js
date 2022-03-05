import { Router } from 'express';
import { createRental, readRentals } from '../controllers/rentalsController.js';
import validateRental from '../middlewares/validateRentalMiddleware.js';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import rentalSchema from '../schemas/rentalSchema.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals', readRentals);

rentalsRouter.post(
  '/rentals',
  validateSchema(rentalSchema),
  validateRental,
  createRental
);

export default rentalsRouter;
