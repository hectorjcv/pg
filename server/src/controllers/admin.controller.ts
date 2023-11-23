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
  UpdateObjects,
  DeleteObjects
} from '../services/admin.service';
import { Response } from 'express';
import { RequestExtend } from '../interfaces/jwt.interface';
import { handleHTTP } from '../util/error.handle';
import { Clasifications, Groups, ObjectCreate, Quantity, Secction, SubGroups } from '../interfaces/objects.interface';

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

    return res
      .status(200)
      .json({ response:'SUCCESS_CREAte_GROUPS', body:responseService });

  } catch (error) {
    handleHTTP(res, 'DANGER_CREATE_GROUPS', error)
  }
}

const ReadGroupController = async (req: RequestExtend, res:Response) => {
  try {
    const responseService = await ReadGroup();

    return res
      .status(200)
      .json({ response:'SUCCESS_READ_GROUPS', body:responseService });

  } catch (error) {
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

    return res
      .status(200)
      .json({ response:'SUCCESS_UPDATE_GroupsS', body:responseService });

  } catch (error) {
    handleHTTP(res, 'DANGER_UPDATE_GroupsS', error)
  }
}

const DeleteGroupController = async (req: RequestExtend, res:Response) => {
  try {
    const id = parseInt(`${req.params.id}`)
    const responseService = await DeleteGroup(id);

    return res
      .status(200)
      .json({ response:'SUCCESS_DELETE_GROUPS', body:responseService });

  } catch (error) {
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

    return res
      .status(200)
      .json({ response:'SUCCESS_CREATE_SUB_GROUP', body:responseService });

  } catch (error) {
    handleHTTP(res, 'DANGER_CREATE_SUB_GROUP', error)
  }
}

const ReadSubGroupController = async (req: RequestExtend, res:Response) => {
  try {
    const groupId = parseInt(`${req.query.group_id}`)
    const responseService = await ReadSubGroup(groupId);

    return res
      .status(200)
      .json({ response:'SUCCESS_READ_SUB_GROUP', body:responseService });

  } catch (error) {
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

    return res
      .status(200)
      .json({ response:'SUCCESS_UPDATE_SUB_GROUP', body:responseService });

  } catch (error) {
    handleHTTP(res, 'DANGER_UPDATE_SUB_GROUP', error)
  }
}

const DeleteSubGroupController = async (req: RequestExtend, res:Response) => {
  try {
    const id = parseInt(`${req.params.id}`);
    const responseService = await DeleteSubGroup(id);

    return res
      .status(200)
      .json({ response:'SUCCESS_DELETE_SUB_GROUPS', body:responseService });

  } catch (error) {
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

    return res
      .status(200)
      .json({ response:'SUCCESS_CREATE_SECCTION', body:responseService });

  } catch (error) {
    handleHTTP(res, 'DANGER_CREATE_SECCTION', error)
  }
}

const ReadSecctionController = async (req: RequestExtend, res:Response) => {
  try {
    const responseService = await ReadSecction();

    return res
      .status(200)
      .json({ response:'SUCCESS_READ_SECCTION', body:responseService });

  } catch (error) {
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

    return res
      .status(200)
      .json({ response:'SUCCESS_UPDATE_SECCTION', body:responseService });

  } catch (error) {
    handleHTTP(res, 'DANGER_UPDATE_SECCTION', error)
  }
}

const DeleteSecctionController = async (req: RequestExtend, res:Response) => {
  try {
    const id = parseInt(`${req.params.id}`);
    const responseService = DeleteSecction(id);

    return res
      .status(200)
      .json({ response:'SUCCESS_DELETE_SECCTION', body:responseService });

  } catch (error) {
    handleHTTP(res, 'DANGER_DELETE_SECCTION', error)
  }
}

/**
 * 
 * OBJECTS_CRUD
 */
const CreateObjectController = async (req: RequestExtend, res:Response) => {
  try {
    console.log(req.user);
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
      quantity: req.body.data.quantity,
      n_identification: req.body.data.n_identification,
      estado: req.body.data.estado,
      creathe_by: parseInt(req.user.userid)
    }

    const responseService = await CreatheObjects(ObjectSave, Clasification, QuantitySave, parseInt(req.user.userid));

    return res
      .status(200)
      .json({ response:'SUCCESS_CREAte_OBJECTS', body:responseService });

  } catch (error) {
    handleHTTP(res, 'DANGER_CREATE_OBJECTS', error)
  }
}

const ReadObjectController = async (req: RequestExtend, res:Response) => {
  try {
    const responseService = '';

    return res
      .status(200)
      .json({ response:'SUCCESS_READ_OBJECTS', body:responseService });

  } catch (error) {
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

  CreateObjectController,
  ReadObjectController,
  UpdateObjectController,
  DeleteObjectController
}
