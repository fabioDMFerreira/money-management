import request from "supertest";
import app from "./getMockedContainer";

describe("GET ", () => {

    describe("/api/albums/:id/photos", () => {
        it("should return status 404 if album was not found", (done) => {
            request(app).get("/api/albums/100/photos")
                .expect(404, done);
        });

        it("album 1 should return 6 photos", (done) => {
            request(app).get("/api/albums/1/photos")
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body).toHaveLength(6);
                    done();
                });
        });

        it("album 2 should return 4 photos", (done) => {
            request(app).get("/api/albums/2/photos")
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body).toHaveLength(4);
                    done();
                });
        });
    });

    describe("/api/albums/photos", () => {
        it("should return 200 OK", (done) => {
            request(app).get("/api/albums/photos")
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res.body).toHaveLength(5);
                    done();
                });
        });
    });

    describe("/api/albums", () => {
        it("should return 200 OK", (done) => {
            request(app).get("/api/albums")
                .expect(200, done);
        });
    });
});
