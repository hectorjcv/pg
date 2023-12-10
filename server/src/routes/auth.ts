import { Router } from 'express';
import { controllerLogin, controllerRegister, controllerSetPassword, controllerRefresToken, controllerClosedSession } from '../controllers/auth.controller';

const router = Router();

router.post('/login', controllerLogin);
router.post('/register', controllerRegister);
router.get('/refresh/token/:id', controllerRefresToken);
router.put('/logout/:id', controllerClosedSession)
router.put('/password/:id', controllerSetPassword)

export { router };