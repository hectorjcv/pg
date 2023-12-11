import { Router } from 'express';
import { controllerLogin, controllerRegister, controllerSetPassword, controllerRefresToken, controllerClosedSession } from '../controllers/auth.controller';
import { auth } from '../middlewares/session.middleware';

const router = Router();

router.post('/login', controllerLogin);
router.post('/register', controllerRegister);
router.get('/refresh/token/:id', controllerRefresToken);
router.put('/logout/:id', auth, controllerClosedSession)
router.put('/password/:id', auth, controllerSetPassword)

export { router };