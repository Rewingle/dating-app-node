import express, { Request, Response } from 'express';
import {matchController} from '../controller/matchController'
const router = express.Router();

router.post('/match', matchController);

export default router;