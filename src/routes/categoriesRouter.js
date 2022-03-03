import { Router } from 'express';
import {
  getCategories,
  postCategory,
} from '../controllers/categoriesController.js';
import validateCategory from '../middlewares/validateCategoryMiddlware.js';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import categorySchema from '../schemas/categorySchema.js';

const categoriesRouter = Router();

categoriesRouter.get('/categories', getCategories);

categoriesRouter.post(
  '/categories',
  validateSchema(categorySchema),
  validateCategory,
  postCategory
);

export default categoriesRouter;
