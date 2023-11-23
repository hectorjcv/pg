import { Router } from 'express';
import { UserCtrl } from '../controllers/user.controller';

const router = Router();

router.get('/', UserCtrl);

export { router };