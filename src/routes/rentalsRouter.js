import { Router } from 'express';
import { createRental, readRentals } from '../controllers/rentalsController.js';
import validateRentalGet from '../middlewares/validateRentalGetMiddleware.js';
import validateRentalPost from '../middlewares/validateRentalPostMiddleware.js';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import rentalSchema from '../schemas/rentalSchema.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals', validateRentalGet, readRentals);

rentalsRouter.post(
  '/rentals',
  validateSchema(rentalSchema),
  validateRentalPost,
  createRental
);

export default rentalsRouter;
