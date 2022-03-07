import { Router } from 'express';
import {
  readCustomerById,
  readCustomers,
  createCustomer,
  updateCustomer,
} from '../controllers/customersControllers.js';
import {
  validateCreateCustomer,
  validateCustomerId,
  validateUpdateCustomer,
} from '../middlewares/validateCustomerMiddlewares.js';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import pagination from '../middlewares/paginationMiddleware.js';
import customerSchema from '../schemas/customerSchema.js';

const customersRouter = Router();

customersRouter.get('/customers', pagination, readCustomers);
customersRouter.get('/customers/:id', validateCustomerId, readCustomerById);

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
