import { Router } from 'express';
import {
  readCustomerById,
  readCustomers,
  createCustomer,
  updateCustomer,
} from '../controllers/customersControllers.js';
import validateCustomerPost from '../middlewares/validateCustomerPostMiddleware.js';
import validateCustomerPut from '../middlewares/validateCustomerPutMiddleware.js';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import customerSchema from '../schemas/customerSchema.js';

const customersRouter = Router();

customersRouter.get('/customers', readCustomers);
customersRouter.get('/customers/:id', readCustomerById);

customersRouter.post(
  '/customers',
  validateSchema(customerSchema),
  validateCustomerPost,
  createCustomer
);

customersRouter.put(
  '/customers/:id',
  validateSchema(customerSchema),
  validateCustomerPut,
  updateCustomer
);

export default customersRouter;
