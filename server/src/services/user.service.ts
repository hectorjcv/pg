import { PrismaClient } from '@prisma/client';

const GetUserCompleted = async (id: number) => {
    const prisma = new PrismaClient();
    
    const people = await prisma.people.findFirst({
        where: {
            id: id
        }
    })

    return people;
    
}

export { GetUserCompleted };