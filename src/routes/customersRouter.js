import { Router } from 'express';
import {
  getCustomers,
  postCustomer,
} from '../controllers/customersControllers.js';
import validateCustomer from '../middlewares/validateCustomerMiddleware.js';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import customerSchema from '../schemas/customerSchema.js';

const customersRouter = Router();
customersRouter.get('/customers', getCustomers);
customersRouter.post(
  '/customers',
  validateSchema(customerSchema),
  validateCustomer,
  postCustomer
);

export default customersRouter;
