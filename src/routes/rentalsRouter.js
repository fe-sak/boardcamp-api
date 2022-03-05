import { Router } from 'express';
import {
  createRental,
  readRentals,
  returnRental,
} from '../controllers/rentalsController.js';
import { validateCustomerById } from '../middlewares/validateCustomerMiddlewares.js';
import {
  validateRentalCreate,
  validateRentalRead,
  validateRentalReturn,
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
rentalsRouter.post('/rentals/:id/return', validateRentalReturn, returnRental);

export default rentalsRouter;
