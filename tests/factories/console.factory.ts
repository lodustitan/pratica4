import prisma from "config/database";

export async function createConsole(consoleName: string){
    return prisma.console.create({
        data: {
            name: consoleName,
        }
    })
}