import { PrismaClient } from '@prisma/client';
import { Clasifications, Groups, ObjectCreate, ObjectsCompletedList, ObjectCompleted, Quantity, Secction, SubGroups } from '../interfaces/objects.interface';
import { DepCreate } from '../interfaces/dep.interface';

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
    const subGroupsAll: any[] = [];
    const subGroups = await prisma.sub_groups.findMany({ orderBy:{ group_id:'asc' } });
    subGroups.map(item => {
        const obj = {
            ...item,
            group_reference: groups.find(d => d.id == item.group_id),
        }
        subGroupsAll.push(obj);
    })
    return {subGroupsAll}
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
    const toSave = await prisma.objects.create({ data:objSave })
    
    return {toSave}
}

const ReadObjects = async () => {
    const prisma = new PrismaClient();

    const count = await prisma.objects.count();

    const Objects = await prisma.objects.findMany();
    const Dates = await prisma.dates_objects.findMany();
    const Clasifications = await prisma.clasification_objects.findMany();
    const Quantity = await prisma.quantity_objects.findMany();
    const Dep = await prisma.departament.findMany();

    const Groups = await prisma.groups.findMany();
    const SubGroups = await prisma.sub_groups.findMany();
    const Sections = await prisma.secction.findMany();

    const ObjetsResult: any[] = [];
    Objects.map(async (item) => {
        const clasi = Clasifications.find(c => c.id == item.clasification_id);

        const obj = {
            ...item,
            date_reference: Dates.find(d => d.id == item.date_id),
            clasification_reference: {
                ...clasi,
                group_reference: Groups.find(e => e.id == clasi?.group_id),
                sub_group_reference: SubGroups.find(e => e.id == clasi?.sub_group_id),
                section_reference: Sections.find(e => e.id == clasi?.secction_id)
            },
            quantity_reference: Quantity.find(q => q.id == item.quantity_id),
            dep_reference: Dep.find(d => d.id == item.dep_id)
        };
        ObjetsResult.push(obj);
    });


    console.log(ObjetsResult);
    return {ObjetsResult, count}
}

const ReadOneObjects = async (id:number) => {
    const prisma = new PrismaClient();

    const obj = await prisma.objects.findFirst({
        where:{id}
    });
    if(!obj) throw new Error('No existe');

    const Dates = await prisma.dates_objects.findFirst({ where:{id:obj.date_id} });
    const Clasifications = await prisma.clasification_objects.findFirst({ 
        where:{id:obj.clasification_id}
    });
    const Quantity = await prisma.quantity_objects.findFirst({ where:{id:obj.quantity_id} });
    const Dep = await prisma.departament.findFirst({ where:{id:obj.dep_id} });

    const Groups = await prisma.groups.findMany();
    const SubGroups = await prisma.sub_groups.findMany();
    const Sections = await prisma.secction.findMany();

    const objComplete = {
        ...obj,
        date_reference: Dates,
        clasification_reference: {
            ...Clasifications,
            group_reference: Groups.find(e => e.id == Clasifications?.group_id),
            sub_group_reference: SubGroups.find(e => e.id == Clasifications?.sub_group_id),
            section_reference: Sections.find(e => e.id == Clasifications?.secction_id),
        },
        quantity_reference: Quantity,
        dep_reference: Dep
    };


    return objComplete
}

const UpdateObjects = async () => {

    return {}
}

const DeleteObjects = async () => {

    return {}
}

/**
 * 
 * @DEP_CRUD
 */

const CreatheDep = async (dep: DepCreate) => {
    const prisma = new PrismaClient();
    const create = await prisma.departament.create({ data:dep });
    return create;
}

const ReadDep = async () => {
    const prisma = new PrismaClient();
    const read = await prisma.departament.findMany();
    return read; 
}

const UpdateDep = async (dep:DepCreate, id:number) => {
    const prisma = new PrismaClient();
    const up = await prisma.departament.update({ data: dep, where:{id:id}});
    return up;
}

const DeleteDep = async (id: number ) => {
    const prisma = new PrismaClient();
    const del = await prisma.departament.delete({ where:{id:id} });
    return del;
}

/**
 * 
 * LOGS
 */

const ReadLogs = async (id?: number) => {
    const prisma = new PrismaClient();
    if (id) {
        const result = await prisma.logs.findMany({ where:{id}, take:15 });
        return result;
    }
    const result = await prisma.logs.findMany({ take:15 });
    return result;
}

export {
    CreatheDep,
    ReadDep,
    UpdateDep,
    DeleteDep,

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

    ReadLogs
}