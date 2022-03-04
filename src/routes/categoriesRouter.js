import { Router } from 'express';
import {
  readCategories,
  createCategory,
} from '../controllers/categoriesController.js';
import validateCategory from '../middlewares/validateCategoryMiddlware.js';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import categorySchema from '../schemas/categorySchema.js';

const categoriesRouter = Router();

categoriesRouter.get('/categories', readCategories);

categoriesRouter.post(
  '/categories',
  validateSchema(categorySchema),
  validateCategory,
  createCategory
);

export default categoriesRouter;
