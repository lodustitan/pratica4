import prisma from "config/database";

export async function createGame(gameName: string, consoleId: number){
    return prisma.game.create({
        data: {
            title: gameName,
            consoleId: consoleId
        }
    })
}