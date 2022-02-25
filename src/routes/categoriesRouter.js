import { Router } from 'express';
import {
  listCategories,
  insertCategory,
} from '../controllers/categoriesController.js';
import categoryValidation from '../middlewares/categoryValidationMiddlware.js';

const categoriesRouter = Router();

categoriesRouter.get('/categories', listCategories);
categoriesRouter.post('/categories', categoryValidation, insertCategory);

export default categoriesRouter;
