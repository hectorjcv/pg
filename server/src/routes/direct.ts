import { Router } from 'express';
import { ControllerBloquedAdmin, ControllerDisBloquedAdmin, ControllerGetAllAdmin, ControllerRegisterAdmin } from '../controllers/direct.controller';
import { auth } from '../middlewares/session.middleware';

const router = Router();

router.post('/admin/create', auth, ControllerRegisterAdmin);

router.get('/admin', auth, ControllerGetAllAdmin);

router.put('/admin/bloqued', auth, ControllerBloquedAdmin);

router.put('/admin/disbloqued', auth, ControllerDisBloquedAdmin);

export { router };
