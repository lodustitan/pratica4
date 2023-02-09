import app from "../../src/app";
import supertest from "supertest";

import { createConsole } from "../factories/console.factory";
import httpStatus from "http-status";
import { cleanDb } from "../helper";


const server = supertest(app);

beforeEach( async () => {
    await cleanDb();
})

describe("GET /consoles", () => {
    it("Should return array of consoles", async () => {
        await createConsole("Playstation")
        await createConsole("Playstation 2")
        await createConsole("Super Nintendo")

        const {status, body} = await server.get("/consoles");

        expect(status).toEqual(httpStatus.OK)
        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                })
            ])
        )
    })

    it("Should return 200 and console object", async () => {
        const console = await createConsole("Playstation") 
        const {status, body} = await server.get(`/consoles/${console.id}`);

        expect(status).toEqual(httpStatus.OK)
        expect(body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
            })
        )
    })

    it("Should return 404 if not exist", async () => {
        const {status} = await server.get("/consoles/8521081");

        expect(status).toEqual(httpStatus.NOT_FOUND)
    })
})
describe("POST /consoles", () => {

    it("Should return status 201 and object created", async () => {
        const {status} = await server.post("/consoles").send({name: "Xbox Classic"});

        expect(status).toEqual(httpStatus.CREATED);
    })
    it("Should return status 409 and object created", async () => {
        await createConsole("Xbox Classic");
        const {status} = await server.post("/consoles").send({name: "Xbox Classic"});

        expect(status).toEqual(httpStatus.CONFLICT);
    })
})