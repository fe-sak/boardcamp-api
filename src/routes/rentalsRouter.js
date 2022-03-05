import { Router } from 'express';
import { createRental, readRentals } from '../controllers/rentalsController.js';
import {
  validateRentalCreate,
  validateRentalRead,
  validateRentalUpdate,
} from '../middlewares/validateRentalMiddlewares.js';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import rentalSchema from '../schemas/rentalSchema.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals', validateRentalRead, readRentals);

rentalsRouter.post(
  '/rentals',
  validateSchema(rentalSchema),
  validateRentalCreate,
  createRental
);
rentalsRouter.post('/rentals/:id/return', validateRentalUpdate);

export default rentalsRouter;
