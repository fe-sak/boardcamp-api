import { Router } from 'express';
import insertGame from '../controllers/gamesController.js';
import validateGame from '../middlewares/validateGameMiddleware.js';

const gamesRouter = Router();

gamesRouter.post('/games', validateGame, insertGame);

export default gamesRouter;
