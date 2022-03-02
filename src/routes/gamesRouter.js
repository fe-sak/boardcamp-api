import { Router } from 'express';
import insertGame, { listGames } from '../controllers/gamesController.js';
import validateGame from '../middlewares/validateGameMiddleware.js';

const gamesRouter = Router();

gamesRouter.get('/games', listGames);
gamesRouter.post('/games', validateGame, insertGame);

export default gamesRouter;
