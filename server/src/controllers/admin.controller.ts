import {
  CreateGroup,
  ReadGroup,
  UpdateGroup,
  DeleteGroup,

  CreateSubGroup,
  ReadSubGroup,
  UpdateSubGroup,
  DeleteSubGroup,

  CreateSecction,
  ReadSecction,
  UpdateSecction,
  DeleteSecction,

  CreatheObjects,
  ReadObjects,
  ReadOneObjects,
  UpdateObjects,
  DeleteObjects,

  CreatheDep,
  ReadDep,
  UpdateDep,
  DeleteDep,

  ReadLogs,

} from '../services/admin.service';
import { Response } from 'express';
import { RequestExtend } from '../interfaces/jwt.interface';
import { handleHTTP } from '../util/error.handle';
import { Clasifications, Groups, ObjectCreate, Quantity, Secction, SubGroups } from '../interfaces/objects.interface';
import { DepCreate } from '../interfaces/dep.interface';
import { GenerateLog } from '../util/logs.handle';

/**
 * 
 * GROUPS_CRUD
 */
const CreateGroupController = async (req: RequestExtend, res:Response) => {
  try {
    const data:Groups = {
      group: req.body.group
    }
    const responseService = await CreateGroup(data);

    GenerateLog({
      id: parseInt(req.user.userid),
      code:200,
      data:'SUCCESS_CREATE_GROUPS',
      description:'grupo creado exitosamente',
      url:'/admin/group'
    });
    return res
      .status(200)
      .json({ response:'SUCCESS_CREAte_GROUPS', body:responseService });

  } catch (error) {
    GenerateLog({
      id: parseInt(req.user.userid),
      code:400,
      data:'DANGER_CREATE_GROUPS',
      description:'error al crear grupo',
      url:'/admin/group'
    });
    handleHTTP(res, 'DANGER_CREATE_GROUPS', error)
  }
}

const ReadGroupController = async (req: RequestExtend, res:Response) => {
  try {
    const responseService = await ReadGroup();

    GenerateLog({
      id: parseInt(req.user.userid),
      code:200,
      data:'SUCCESS_READ_GROUPS',
      description:'grupos',
      url:'/admin/group'
    });
    return res
      .status(200)
      .json({ response:'SUCCESS_READ_GROUPS', body:responseService });

  } catch (error) {
    GenerateLog({
      id: parseInt(req.user.userid),
      code:400,
      data:'DANGER_READ_GROUPS',
      description:'error al leer los grupos',
      url:'/admin/group'
    });
    handleHTTP(res, 'DANGER_READ_GROUPS', error)
  }
}

const UpdateGroupController = async (req: RequestExtend, res:Response) => {
  try {
    const data:Groups = {
      group: req.body.group
    }
    const id = parseInt(`${req.params.id}`);
    const responseService = await UpdateGroup(data, id);

    GenerateLog({
      id: parseInt(req.user.userid),
      code:200,
      data:'SUCCESS_UPDATE_GROUPS',
      description:'gropu actualizado',
      url:'/admin/group'
    });

    return res
      .status(200)
      .json({ response:'SUCCESS_UPDATE_GroupsS', body:responseService });

  } catch (error) {
    GenerateLog({
      id: parseInt(req.user.userid),
      code:400,
      data:'DANGER_UPDATE_GROUP',
      description:'error al actualizar grupo',
      url:'/admin/id'
    });
    handleHTTP(res, 'DANGER_UPDATE_GroupsS', error)
  }
}

const DeleteGroupController = async (req: RequestExtend, res:Response) => {
  try {
    const id = parseInt(`${req.params.id}`)
    const responseService = await DeleteGroup(id);

    GenerateLog({
      id: parseInt(req.user.userid),
      code:200,
      data:'DANGER_DELETE_GROUP',
      description:'grupo eliminado',
      url:'/admin/group/id'
    });
    return res
      .status(200)
      .json({ response:'SUCCESS_DELETE_GROUPS', body:responseService });

  } catch (error) {
    GenerateLog({
      id: parseInt(req.user.userid),
      code:401,
      data:'DANGER_DELETE_GROUP',
      description:'error al crear grupo',
      url:'/admin/group/id'
    });
    handleHTTP(res, 'DANGER_DELETE_GROUPS', error)
  }
}

/**
 * 
 * OBJECTS_CRUD
 */
const CreateSubGroupController = async (req: RequestExtend, res:Response) => {
  try {
    const data: SubGroups = {
      sub_group: req.body.sub_group,
      group_id: req.body.group_id
    }
    const responseService = await CreateSubGroup(data);

    GenerateLog({
      id: parseInt(req.user.userid),
      code:200,
      data:'SUCCESS_CREATE_SUBGROUPS',
      description:'subgrupo creado exitosamente',
      url:'/admin/subgroup'
    });
    return res
      .status(200)
      .json({ response:'SUCCESS_CREATE_SUB_GROUP', body:responseService });

  } catch (error) {
    GenerateLog({
      id: parseInt(req.user.userid),
      code:401,
      data:'DANGER_CREATE_SUBGROUPS',
      description:'error al crear subgrupo',
      url:'/admin/subgroup'
    });
    handleHTTP(res, 'DANGER_CREATE_SUB_GROUP', error)
  }
}

const ReadSubGroupController = async (req: RequestExtend, res:Response) => {
  try {
    const groupId = parseInt(`${req.query.group_id}`)
    const responseService = await ReadSubGroup(groupId);

    GenerateLog({
      id: parseInt(req.user.userid),
      code:200,
      data:'SUCCESS_READ_SUBGROUPS',
      description:'subgrupo',
      url:'/admin/subgroup'
    });
    return res
      .status(200)
      .json({ response:'SUCCESS_READ_SUB_GROUP', body:responseService });

  } catch (error) {
    GenerateLog({
      id: parseInt(req.user.userid),
      code:400,
      data:'DANGER_READ_SUBGROUPS',
      description:'subgrupo',
      url:'/admin/subgroup/'
    });
    handleHTTP(res, 'DANGER_READ_SUB_GROUP', error)
  }
}

const UpdateSubGroupController = async (req: RequestExtend, res:Response) => {
  try {
    const data: SubGroups = {
      sub_group: req.body.sub_group,
      group_id: req.body.group_id
    }
    const id = parseInt(`${req.params.id}`);
    const responseService = await UpdateSubGroup(data, id);

    GenerateLog({
      id: parseInt(req.user.userid),
      code:200,
      data:'SUCCESS_UPDATE_SUBGROUPS',
      description:'subgrupo actualizado exitosamente',
      url:'/admin/subgroup/:id'
    });
    return res
      .status(200)
      .json({ response:'SUCCESS_UPDATE_SUB_GROUP', body:responseService });

  } catch (error) {
    GenerateLog({
      id: parseInt(req.user.userid),
      code:400,
      data:'DANGER_UPDATE_SUBGROUPS',
      description:'error al actualizar subgrupo',
      url:'/admin/subgroup/:id'
    });
    handleHTTP(res, 'DANGER_UPDATE_SUB_GROUP', error)
  }
}

const DeleteSubGroupController = async (req: RequestExtend, res:Response) => {
  try {
    const id = parseInt(`${req.params.id}`);
    const responseService = await DeleteSubGroup(id);

    GenerateLog({
      id: parseInt(req.user.userid),
      code:200,
      data:'SUCCESS_DELETE_SUBGROUP',
      description:'subgrupo eliminado exitosamente',
      url:'/admin/subgroup/:id'
    });
    return res
      .status(200)
      .json({ response:'SUCCESS_DELETE_SUB_GROUPS', body:responseService });

  } catch (error) {
    GenerateLog({
      id: parseInt(req.user.userid),
      code:400,
      data:'DANGER_DELETE_SUBGROUP',
      description:'error al eliminar subgrupo',
      url:'/admin/subgroup/:id'
    });
    handleHTTP(res, 'DANGER_DELETE_SUB_GROUPS', error)
  }
}

/**
 * 
 * SECTIONS_CRUD
 */
const CreateSecctionController = async (req: RequestExtend, res:Response) => {
  try {
    const data:Secction = {
      secction: req.body.secction
    }
    const responseService = await CreateSecction(data);

    GenerateLog({
      id: parseInt(req.user.userid),
      code:200,
      data:'SUCCESS_CREATE_SECTION',
      description:'sección creada exitosamente',
      url:'/admin/secction'
    });
    return res
      .status(200)
      .json({ response:'SUCCESS_CREATE_SECCTION', body:responseService });

  } catch (error) {
    GenerateLog({
      id: parseInt(req.user.userid),
      code:400,
      data:'DANGER_CREATE_SECTION',
      description:'error al actualizar subgrupo',
      url:'/admin/section'
    });
    handleHTTP(res, 'DANGER_CREATE_SECCTION', error)
  }
}

const ReadSecctionController = async (req: RequestExtend, res:Response) => {
  try {
    const responseService = await ReadSecction();

    GenerateLog({
      id: parseInt(req.user.userid),
      code:200,
      data:'SUCCESS_READ_SECTION',
      description:'secciones',
      url:'/admin/secction'
    });
    return res
      .status(200)
      .json({ response:'SUCCESS_READ_SECCTION', body:responseService });

  } catch (error) {
    GenerateLog({
      id: parseInt(req.user.userid),
      code:400,
      data:'DANGER_READ_SECTION',
      description:'error al leer las secciones',
      url:'/admin/secction'
    });
    handleHTTP(res, 'DANGER_READ_SECCTION', error)
  }
}

const UpdateSecctionController = async (req: RequestExtend, res:Response) => {
  try {
    const data:Secction = {
      secction: req.body.secction
    }
    const id = parseInt(`${req.params.id}`);
    const responseService = await UpdateSecction(data, id);

    GenerateLog({
      id: parseInt(req.user.userid),
      code:200,
      data:'SUCCESS_UPDATE_SECTION',
      description:'sección actualizada exitosamente',
      url:'/admin/secction/:id'
    });
    return res
      .status(200)
      .json({ response:'SUCCESS_UPDATE_SECCTION', body:responseService });

  } catch (error) {
    GenerateLog({
      id: parseInt(req.user.userid),
      code:200,
      data:'DANGER_UPDATE_SECTION',
      description:'error al actualizar sección',
      url:'/admin/secction/:id'
    });
    handleHTTP(res, 'DANGER_UPDATE_SECCTION', error)
  }
}

const DeleteSecctionController = async (req: RequestExtend, res:Response) => {
  try {
    const id = parseInt(`${req.params.id}`);
    const responseService = DeleteSecction(id);

    GenerateLog({
      id: parseInt(req.user.userid),
      code:200,
      data:'SUCCESS_DELETE_SECTION',
      description:'sección eliminada exitosamente',
      url:'/admin/secction'
    });
    return res
      .status(200)
      .json({ response:'SUCCESS_DELETE_SECCTION', body:responseService });

  } catch (error) {
    GenerateLog({
      id: parseInt(req.user.userid),
      code:200,
      data:'DANGER_DELETE_SECTION',
      description:'error al eliminar sección',
      url:'/admin/secction'
    });
    handleHTTP(res, 'DANGER_DELETE_SECCTION', error)
  }
}

/**
 * 
 * DEPARTAMENTS
 */
const CreateDepController = async (req: RequestExtend, res: Response) => {
  try {
    const depCreate: DepCreate = {
      departament_name: req.body.dep_name
    };

    const responseService = await CreatheDep(depCreate);

    GenerateLog({
      id: parseInt(req.user.userid),
      code:200,
      data:'SUCCESS_CREATE_DEPARTAMENT',
      description:'departamento creado exitosamente',
      url:'/admin/dep'
    });
    return res
      .status(200)
      .json({ response: 'SUCCESS_DEP_CREATE', body:responseService })
  } catch (error) {
    GenerateLog({
      id: parseInt(req.user.userid),
      code:400,
      data:'DANGER_CREATE_DEPARTAMENT',
      description:'error al crear departamento',
      url:'/admin/dep'
    });
    handleHTTP(res, 'DANGER_DEP_CREATE')
  }
}

const ReadDepController = async (req: RequestExtend, res: Response) => {
  try {
    const responseService = await ReadDep();
    GenerateLog({
      id: parseInt(req.user.userid),
      code:200,
      data:'SUCCESS_READ_DEPARTAMENT',
      description:'sección',
      url:'/admin/dep'
    });
    return res
      .status(200)
      .json({ response: 'SUCCESS_DEP_READ', body:responseService })
  } catch (error) {
    GenerateLog({
      id: parseInt(req.user.userid),
      code:400,
      data:'DANGER_READ_DEPARTAMENT',
      description:'error al leer secciones',
      url:'/admin/dep'
    });
    handleHTTP(res, 'DANGER_DEP_READ')
  }
}

const UpdateDepController = async (req: RequestExtend, res: Response) => {
  try {
    const depUp: DepCreate = {
      departament_name: req.body.dep_name
    }
    const id:number = parseInt(req.params.id);
    const responseService = await UpdateDep(depUp, id);
    GenerateLog({
      id: parseInt(req.user.userid),
      code:200,
      data:'SUCCESS_UPDATE_DEPARTAMENT',
      description:'departamento actualizada exitosamente',
      url:'/admin/dep'
    });
    return res
      .status(200)
      .json({ response: 'SUCCESS_DEP_UPDATE', body:responseService })
  } catch (error) {
    GenerateLog({
      id: parseInt(req.user.userid),
      code:400,
      data:'DANGER_UPDATE_DEPARTAMENT',
      description:'error al actualizar departamento',
      url:'/admin/dep'
    });
    handleHTTP(res, 'DANGER_DEP_UPDATE')
  }
}

const DeleteDepController = async (req: RequestExtend, res: Response) => {
  try {
    const id:number = parseInt(req.params.id);
    const responseService = await DeleteDep(id);
    GenerateLog({
      id: parseInt(req.user.userid),
      code:200,
      data:'SUCCESS_UPDATE_DEPARTAMENT',
      description:'departamento eliminado exitosamente',
      url:'/admin/dep'
    });
    return res
      .status(200)
      .json({ response: 'SUCCESS_DEP_DELETE', body:responseService })
  } catch (error) {
    GenerateLog({
      id: parseInt(req.user.userid),
      code:400,
      data:'DANGER_UPDATE_DEPARTAMENT',
      description:'eror al eliminar departamento',
      url:'/admin/dep'
    });
    handleHTTP(res, 'DANGER_DEP_DELETE')
  }
}

/**
 * 
 * OBJECTS_CRUD
 */
const CreateObjectController = async (req: RequestExtend, res:Response) => {
  try {
    const QuantitySave: Quantity = {
      fisica: parseInt(`${req.body.quantity.fisica}`),
      contable: parseInt(`${req.body.quantity.contable}`)
    } 
    
    const Clasification: Clasifications = {
      group_id: parseInt(`${req.body.clasification.group_id}`),
      sub_group_id: parseInt(`${req.body.clasification.sub_group_id}`),
      secction_id: parseInt(`${req.body.clasification.secction_id}`)
    }

    const ObjectSave:ObjectCreate = {
      name: req.body.data.name,
      description:req.body.data.description,
      price: req.body.data.price,
      quantity: QuantitySave.fisica,
      n_identification: req.body.data.n_identification,
      estado: req.body.data.estado,
      creathe_by: parseInt(req.user.userid),
      dep_id: parseInt(req.body.dep)
    }

    const responseService = await CreatheObjects(ObjectSave, Clasification, QuantitySave, parseInt(req.user.userid));

    GenerateLog({
      id: parseInt(req.user.userid),
      code:200,
      data:'SUCCESS_CREATE_OBJECTS',
      description:'bien creado',
      url:'/admin/object'
    });
    return res
      .status(200)
      .json({ response:'SUCCESS_CREAte_OBJECTS', body:responseService });

  } catch (error) {
    GenerateLog({
      id: parseInt(req.user.userid),
      code:400,
      data:'DANGER_CREATE_OBJECTS',
      description:'error al eliminar el bien',
      url:'/admin/object'
    });
    handleHTTP(res, 'DANGER_CREATE_OBJECTS', error)
  }
}

const ReadObjectController = async (req: RequestExtend, res:Response) => {
  try {
    console.log(req.query);
    const take = `${req.query.take}`;
    const sk = `${req.query.sk}`;
    console.log(req.user);
    const responseService = await ReadObjects(parseInt(take), parseInt(sk));

    GenerateLog({
      id: parseInt(req.user.userid),
      code:200,
      data:'SUCCESS_READ_OBJECTS',
      description:'bien',
      url:'/admin/object'
    });
    return res
      .status(200)
      .json({ response:'SUCCESS_READ_OBJECTS', body:responseService });

  } catch (error) {
    GenerateLog({
      id: parseInt(req.user.userid),
      code:400,
      data:'DANGER_CREATE_OBJECTS',
      description:'error al leer el bien',
      url:'/admin/object'
    });
    handleHTTP(res, 'DANGER_READ_OBJECTS', error)
  }
}

const ReadOneObjectController = async (req: RequestExtend, res:Response) => {
  try {
    const id = parseInt(req.params.id);
    const responseService = await ReadOneObjects(id);

    GenerateLog({
      id: parseInt(req.user.userid),
      code:200,
      data:'SUCCESS_READ_OBJECT',
      description:'bien',
      url:'/admin/object'
    });
    return res
      .status(200)
      .json({ response:'SUCCESS_READ_OBJECT', body:responseService });

  } catch (error) {
    GenerateLog({
      id: parseInt(req.user.userid),
      code:400,
      data:'DANGER_CREATE_OBJECT',
      description:'error al leer el bien',
      url:'/admin/object'
    });
    handleHTTP(res, 'DANGER_READ_OBJECTS', error)
  }
}

const UpdateObjectController = async (req: RequestExtend, res:Response) => {
  try {
    const responseService = '';

    return res
      .status(200)
      .json({ response:'SUCCESS_UPDATE_OBJECTS', body:responseService });

  } catch (error) {
    handleHTTP(res, 'DANGER_UPDATE_OBJECTS', error)
  }
}

const DeleteObjectController = async (req: RequestExtend, res:Response) => {
  try {
    const responseService = '';

    return res
      .status(200)
      .json({ response:'SUCCESS_DELETE_OBJECTS', body:responseService });

  } catch (error) {
    handleHTTP(res, 'DANGER_DELETE_OBJECTS', error)
  }
}

/**
 * 
 * LOGS
 */
const ReadLogsController = async (req: RequestExtend, res:Response) => {
  try {
    const id = parseInt(`${req.query.id}`);
    const result = await ReadLogs(id);
    return res
      .status(200)
      .json({ response:'SUCCESS_GET_LOGS', body: result });
  } catch (error) {
    handleHTTP(res, 'DANGER_GET_LOGS', error);
  }
}

export {
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

  CreateDepController,
  ReadDepController,
  UpdateDepController,
  DeleteDepController,

  CreateObjectController,
  ReadObjectController,
  ReadOneObjectController,
  UpdateObjectController,
  DeleteObjectController,

  ReadLogsController
}
