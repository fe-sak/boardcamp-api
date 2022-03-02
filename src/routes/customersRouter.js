import { Router } from 'express';
import insertCustomer from '../controllers/customersControllers.js';
import validateCustomer from '../middlewares/validateCustomerMiddleware.js';

const customersRouter = Router();

customersRouter.post('/customers', validateCustomer, insertCustomer);

export default customersRouter;
