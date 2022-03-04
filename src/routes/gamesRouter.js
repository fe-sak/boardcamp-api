import { Router } from 'express';
import { createGame, readGames } from '../controllers/gamesController.js';
import validateGame from '../middlewares/validateGameMiddleware.js';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import gameSchema from '../schemas/gameSchema.js';

const gamesRouter = Router();

gamesRouter.get('/games', readGames);

gamesRouter.post(
  '/games',
  validateSchema(gameSchema),
  validateGame,
  createGame
);

export default gamesRouter;
