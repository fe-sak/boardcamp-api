import { Router } from 'express';
import {
  getCustomerById,
  getCustomers,
  postCustomer,
  putCustomer,
} from '../controllers/customersControllers.js';
import validateCustomer from '../middlewares/validateCustomerMiddleware.js';
import validateCustomerPut from '../middlewares/validateCustomerPutMiddleware.js';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import customerSchema from '../schemas/customerSchema.js';

const customersRouter = Router();

customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getCustomerById);

customersRouter.post(
  '/customers',
  validateSchema(customerSchema),
  validateCustomer,
  postCustomer
);

customersRouter.put(
  '/customers/:id',
  validateSchema(customerSchema),
  validateCustomerPut,
  putCustomer
);

export default customersRouter;
