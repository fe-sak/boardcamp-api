import { Router } from 'express';
import {
  getCustomerById,
  getCustomers,
  postCustomer,
} from '../controllers/customersControllers.js';
import validateCustomer from '../middlewares/validateCustomerMiddleware.js';
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

export default customersRouter;
