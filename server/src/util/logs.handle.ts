import { Prisma, PrismaClient } from "@prisma/client";

type Props = {data:string,code:number,description:string,url:string, id?:number}

export const GenerateLog = async (
    {code,description,url,id,data}: Props
) => {
    return;
    /*const prisma = new PrismaClient();
    console.log(code, id);
    let ci: string = '';
    if(id) {
        const field = await prisma.people.findFirst({where:{id:id}});
        ci = field ? field.ci : 'no definido'
    } else {
        ci = 'no definido'
    }

    const newLog: Prisma.LogsCreateInput = {
        code: code,
        data: data,
        description: description,
        url: url,
        ci: ci
    }

    if(newLog.ci == 'no definido') {
        const field = await prisma.people.findFirst({where:{id:id}});
        newLog.ci = field ? field.ci : 'no definido'
    }
    await prisma.logs.create({ data:newLog });
    return*/
}