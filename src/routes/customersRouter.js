import { Router } from 'express';
import {
  readCustomerById,
  readCustomers,
  createCustomer,
  updateCustomer,
} from '../controllers/customersControllers.js';
import {
  validateCreateCustomer,
  validateReadCustomerById,
  validateUpdateCustomer,
} from '../middlewares/validateCustomerMiddlewares.js';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import customerSchema from '../schemas/customerSchema.js';

const customersRouter = Router();

customersRouter.get('/customers', readCustomers);
customersRouter.get(
  '/customers/:id',
  validateReadCustomerById,
  readCustomerById
);

customersRouter.post(
  '/customers',
  validateSchema(customerSchema),
  validateCreateCustomer,
  createCustomer
);

customersRouter.put(
  '/customers/:id',
  validateSchema(customerSchema),
  validateUpdateCustomer,
  updateCustomer
);

export default customersRouter;
