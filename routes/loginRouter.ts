import express, {Request, Response} from 'express';
import loginController from '../controller/auth/loginController';

const router = express.Router();

router.post('/login', loginController);

export default router;