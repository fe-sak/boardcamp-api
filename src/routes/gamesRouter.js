import { Router } from 'express';
import { postGame, getGames } from '../controllers/gamesController.js';
import validateGame from '../middlewares/validateGameMiddleware.js';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import gameSchema from '../schemas/gameSchema.js';

const gamesRouter = Router();

gamesRouter.get('/games', getGames);

gamesRouter.post('/games', validateSchema(gameSchema), validateGame, postGame);

export default gamesRouter;
