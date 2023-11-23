import { Prisma, PrismaClient } from '@prisma/client';
import { Clasifications, Groups, ObjectCreate, Quantity, Secction, SubGroups } from '../interfaces/objects.interface';

/**
 * @GROUPS_CRUD
 */
const CreateGroup = async (data: Groups) => {
    const prisma = new PrismaClient();

    const toSave = await prisma.groups.create({ data: data });
    return {toSave}
}

const ReadGroup = async () => {
    const prisma = new PrismaClient();

    const groups = await prisma.groups.findMany(); 
    return {groups}
}

const UpdateGroup = async (data: Groups, id:number) => {
    const prisma = new PrismaClient();

    const toUpdate = await prisma.groups.update({ where:{id}, data:data })
    return {toUpdate}
}

const DeleteGroup = async (id: number) => {
    const prisma = new PrismaClient();

    const toDelete = await prisma.groups.delete({ where: {id} })

    return {toDelete}
}

/**
 * @SUB_GROUPS_CRUD
 */
const CreateSubGroup = async (data: SubGroups) => {
    const prisma = new PrismaClient();

    const toSave = await prisma.sub_groups.create({ data:data });

    return {toSave}
}

const ReadSubGroup = async (id?:number) => {
    const prisma = new PrismaClient();
    const groups = await prisma.groups.findMany();
    if(id) {
        const subGroups = await prisma.sub_groups.findMany({ where:{group_id:id} });
        return {subGroups}
    }
    const subGroups = await prisma.sub_groups.findMany({ orderBy:{ group_id:'asc' } });
    return {subGroups}
}

const UpdateSubGroup = async (data:SubGroups, id:number) => {
    const prisma = new PrismaClient();
    const toUpdate = await prisma.sub_groups.update({ where:{id}, data:data })
    return {toUpdate}
}

const DeleteSubGroup = async (id:number) => {
    const prisma = new PrismaClient();
    const toDelete = await prisma.sub_groups.delete({ where:{id} })
    return {toDelete}
}

/**
 * @SUB_SECCTIONS
 */
const CreateSecction = async (data: Secction) => {
    const prisma = new PrismaClient();
    const toSave = await prisma.secction.create({ data:data });
    return {toSave};
}

const ReadSecction = async (id?:number) => {
    const prisma = new PrismaClient();
    const secctions = await prisma.secction.findMany();
    return {secctions}
}

const UpdateSecction = async (data:Secction, id:number) => {
    const prisma = new PrismaClient();
    const toUpdate = await prisma.secction.update({ where:{id}, data:data })
    return {toUpdate}
}

const DeleteSecction = async (id:number) => {
    const prisma = new PrismaClient();
    const toDelete = await prisma.secction.delete({ where:{id}})
    return {toDelete}
}

/**
 * @OBJECTS_CRUD
 */
const CreatheObjects = async (data: ObjectCreate, clf: Clasifications, qun: Quantity, uid: number) => {
    const prisma = new PrismaClient();
    const date = new Date();
    console.log(data);
    const DateSave = {
        creathe: date,
        update: date,
        delete: date
    }
    const dateReady = await prisma.dates_objects.create({data:DateSave});
    const clfReady = await prisma.clasification_objects.create({data:clf});
    const qunReady = await prisma.quantity_objects.create({data:qun});
    const userReady = await prisma.people.findFirst({ where:{id:uid} });

    if(!userReady) throw new Error(''); 
    const objSave = {
        ...data,
        date_id: dateReady.id,
        clasification_id: clfReady.id,
        quantity_id: qunReady.id
    }
    objSave.creathe_by = userReady.id;
    console.log(objSave);
    const toSave = await prisma.objects.create({ data:objSave })
    

    return {toSave}
}

const ReadObjects = async () => {

    return {}
}

const UpdateObjects = async () => {

    return {}
}

const DeleteObjects = async () => {

    return {}
}

export {
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
}