import { Router } from 'express';
import {
  readCategories,
  createCategory,
} from '../controllers/categoriesController.js';
import validateCreateCategory from '../middlewares/validateCategoryMiddlware.js';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import pagination from '../middlewares/paginationMiddleware.js';
import categorySchema from '../schemas/categorySchema.js';

const categoriesRouter = Router();

categoriesRouter.get('/categories', pagination, readCategories);

categoriesRouter.post(
  '/categories',
  validateSchema(categorySchema),
  validateCreateCategory,
  createCategory
);

export default categoriesRouter;
