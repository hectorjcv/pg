import { Router } from 'express';
import { ControllerDeleteAdmin, ControllerGetAllAdmin, ControllerRegisterAdmin } from '../controllers/direct.controller';
import { auth } from '../middlewares/session.middleware';

const router = Router();

router.post('/admin/create', auth, ControllerRegisterAdmin);

router.get('/admin', auth, ControllerGetAllAdmin);

router.delete('/admin/delete', auth, ControllerDeleteAdmin);

export { router };
