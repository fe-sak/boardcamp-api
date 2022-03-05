import { Router } from 'express';
import {
  readCategories,
  createCategory,
} from '../controllers/categoriesController.js';
import validateCategoryCreate from '../middlewares/validateCategoryMiddlware.js';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import categorySchema from '../schemas/categorySchema.js';

const categoriesRouter = Router();

categoriesRouter.get('/categories', readCategories);

categoriesRouter.post(
  '/categories',
  validateSchema(categorySchema),
  validateCategoryCreate,
  createCategory
);

export default categoriesRouter;
