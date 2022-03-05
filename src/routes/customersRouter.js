import { Router } from 'express';
import {
  readCustomerById,
  readCustomers,
  createCustomer,
  updateCustomer,
} from '../controllers/customersControllers.js';
import {
  validateCustomerCreate,
  validateCustomerById,
  validateCustomerUpdate,
} from '../middlewares/validateCustomerMiddlewares.js';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import customerSchema from '../schemas/customerSchema.js';

const customersRouter = Router();

customersRouter.get('/customers', readCustomers);
customersRouter.get('/customers/:id', validateCustomerById, readCustomerById);

customersRouter.post(
  '/customers',
  validateSchema(customerSchema),
  validateCustomerCreate,
  createCustomer
);

customersRouter.put(
  '/customers/:id',
  validateSchema(customerSchema),
  validateCustomerUpdate,
  updateCustomer
);

export default customersRouter;
