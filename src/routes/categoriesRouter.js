import { Router } from 'express';
import {
  readCategories,
  createCategory,
} from '../controllers/categoriesController.js';
import validateCreateCategory from '../middlewares/validateCategoryMiddlware.js';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import verifyUrlQuery from '../middlewares/verifyUrlQueryMiddleware.js';
import categorySchema from '../schemas/categorySchema.js';

const categoriesRouter = Router();

categoriesRouter.get('/categories', verifyUrlQuery, readCategories);

categoriesRouter.post(
  '/categories',
  validateSchema(categorySchema),
  validateCreateCategory,
  createCategory
);

export default categoriesRouter;
