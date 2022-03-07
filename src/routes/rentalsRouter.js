import { Router } from 'express';
import {
  createRental,
  deleteRental,
  readMetrics,
  readRentals,
  returnRental,
} from '../controllers/rentalsController.js';
import {
  validateCreateRental,
  validateReadRentals,
  validateRentalId,
  validateRentalFinished,
} from '../middlewares/validateRentalMiddlewares.js';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import pagination from '../middlewares/paginationMiddleware.js';

import rentalSchema from '../schemas/rentalSchema.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals', validateReadRentals, pagination, readRentals);
rentalsRouter.get('/rentals/metrics', readMetrics);

rentalsRouter.post(
  '/rentals',
  validateSchema(rentalSchema),
  validateCreateRental,
  createRental
);
rentalsRouter.post(
  '/rentals/:id/return',
  validateRentalId,
  validateRentalFinished,
  returnRental
);

rentalsRouter.delete(
  '/rentals/:id',
  validateRentalId,
  validateRentalFinished,
  deleteRental
);

export default rentalsRouter;
