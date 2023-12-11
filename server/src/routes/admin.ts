import { Router } from 'express';
import { auth } from '../middlewares/session.middleware';
import {
    CreateGroupController,
    ReadGroupController,
    UpdateGroupController,
    DeleteGroupController,

    CreateSubGroupController,
    ReadSubGroupController,
    UpdateSubGroupController,
    DeleteSubGroupController,

    CreateSecctionController,
    ReadSecctionController,
    UpdateSecctionController,
    DeleteSecctionController,

    CreateObjectController,
    ReadObjectController,
    UpdateObjectController,
    DeleteObjectController,

    CreateDepController,
    ReadDepController,
    UpdateDepController,
    DeleteDepController
} from '../controllers/admin.controller';

const router = Router();

router.post('/group', auth, CreateGroupController);
router.get('/group', auth, ReadGroupController);
router.put('/group/:id', auth, UpdateGroupController);
router.delete('/group/:id', auth, DeleteGroupController);

router.post('/subgroup', auth, CreateSubGroupController);
router.get('/subgroup', auth, ReadSubGroupController);
router.put('/subgroup/:id', auth, UpdateSubGroupController);
router.delete('/subgroup/:id', auth, DeleteSubGroupController);

router.post('/secction', auth, CreateSecctionController);
router.get('/secction', auth, ReadSecctionController);
router.put('/secction/:id', auth, UpdateSecctionController);
router.delete('/secction/:id', auth, DeleteSecctionController);

router.post('/dep', auth, CreateDepController);
router.get('/dep', auth, ReadDepController);
router.put('/dep/:id', auth, UpdateDepController);
router.delete('/dep/:id', auth, DeleteDepController);

router.post('/objects', auth, CreateObjectController);
router.get('/objects', auth, ReadObjectController);
router.put('/objects/:id', auth, UpdateObjectController);
router.delete('/objects/:id', auth, DeleteObjectController);

export { router };
