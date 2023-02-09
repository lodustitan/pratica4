import app from "../../src/app";
import supertest from "supertest";

import { createConsole } from "../factories/console.factory";
import { createGame } from "../factories/game.factory";

import httpStatus from "http-status";
import { cleanDb } from "../helper";


const server = supertest(app);

beforeEach( async () => {
    await cleanDb();
})

describe("GET /games", () => {
    it("Should return array of games", async () => {
        const playstation = await createConsole("Playstation");
        const playstation2 = await createConsole("Playstation 2");
        const superNintendo = await createConsole("Super Nintendo");
        
        await createGame("FIFA 10", playstation.id);
        await createGame("Pacman 3D", playstation.id);
        await createGame("Medal of Honor", playstation2.id);
        await createGame("Final Fantasy X", playstation2.id);
        await createGame("Chrono Trigger", superNintendo.id);
        
        const {status, body} = await server.get("/games");

        expect(status).toEqual(httpStatus.OK)
        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    title: expect.any(String),
                    consoleId: expect.any(Number),
                })
            ])
        )
    })
})