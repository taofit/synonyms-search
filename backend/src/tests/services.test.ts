import request from "supertest";
import { Server, IncomingMessage, ServerResponse } from "http";
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
  it("POST should be succeed", (done) => {
    request(server)
      .post("/api/synonyms")
      .send(["papa", "daughter", "sisters", "family", "dog"])
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({
          status: "success",
          msg: "successfully add synonyms",
        });
        done();
      });
  });
});

describe("Get synonyms", () => {
  it("should return synonyms list", (done) => {
    request(server)
      .get("/api/synonyms")
      .query({
        search: "family",
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

describe("Post synonyms", () => {
  it("POST should be succeed", (done) => {
    request(server)
      .post("/api/synonyms")
      .send(["father", "child", "aunt", "siblings", "cat"])
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({
          status: "success",
          msg: "successfully add synonyms",
        });
        done();
      });
  });
});

describe("Post synonyms", () => {
  it("POST should be succeed", (done) => {
    request(server)
      .post("/api/synonyms")
      .send(["family", "father", "son", "mother", "uncle", "papa"])
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({
          status: "success",
          msg: "successfully add synonyms",
        });
        done();
      });
  });
});

describe("Get synonyms", () => {
  it("should return synonyms list", (done) => {
    request(server)
      .get("/api/synonyms")
      .query({
        search: "papa",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(Array.from(res.body).sort()).toMatchObject(
          [
            "papa",
            "daughter",
            "sisters",
            "dog",
            "family",
            "son",
            "mother",
            "uncle",
            "father",
            "child",
            "aunt",
            "siblings",
            "cat",
          ].sort()
        );
        done();
      });
  });
});

afterAll((done) => {
  server.close();
  done();
});
