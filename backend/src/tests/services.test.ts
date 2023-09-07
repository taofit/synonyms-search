import request from "supertest";
import { Server, IncomingMessage, ServerResponse } from "http";
import { Express } from "express-serve-static-core";
import app from "../index";

let server: Server<typeof IncomingMessage, typeof ServerResponse>;

beforeAll(() => {
  server = app;
});

describe("App root test", () => {
  it("should return 200", (done) => {
    request(server)
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({
          message: "synonyms server is started",
        });
        done();
      });
  });
});

describe("Post synonyms", () => {
  it("should return synonyms", (done) => {
    request(server)
      .post("/api/synonyms")
      .send({
        synonyms: ["papa", "daughter", "sisters", "family", "dog"],
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject([
          "papa",
          "daughter",
          "sisters",
          "family",
          "dog",
        ]);
        done();
      });
  });
});

afterAll((done) => {
  server.close();
  done();
});
