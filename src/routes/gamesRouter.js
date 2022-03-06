import { Router } from 'express';
import { createGame, readGames } from '../controllers/gamesController.js';
import validateCreateGame from '../middlewares/validateGameMiddleware.js';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import verifyUrlQuery from '../middlewares/verifyUrlQueryMiddleware.js';
import gameSchema from '../schemas/gameSchema.js';

const gamesRouter = Router();

gamesRouter.get('/games', verifyUrlQuery, readGames);

gamesRouter.post(
  '/games',
  validateSchema(gameSchema),
  validateCreateGame,
  createGame
);

export default gamesRouter;
