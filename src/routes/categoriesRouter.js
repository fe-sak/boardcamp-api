import { Router } from 'express';
import {
  getCategories,
  postCategories,
} from '../controllers/categoriesController.js';
import categoriesPostValidation from '../middlewares/categoriesPostValidationMiddlware.js';

const categoriesRouter = Router();

categoriesRouter.get('/categories', getCategories);
categoriesRouter.post('/categories', categoriesPostValidation, postCategories);

export default categoriesRouter;
