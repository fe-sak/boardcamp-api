import { Router } from 'express';
import {
  listCategories,
  insertCategory,
} from '../controllers/categoriesController.js';
import validateCategory from '../middlewares/validateCategoryMiddlware.js';

const categoriesRouter = Router();

categoriesRouter.get('/categories', listCategories);
categoriesRouter.post('/categories', validateCategory, insertCategory);

export default categoriesRouter;
