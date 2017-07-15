import { get } from ".";

describe("index", () => {
  it("should match a GET /hi request", () => {
    const handler = get("/hi", ({ req, res }) => ({
      type: "request",
      req,
      res: { status: 200 }
    }));
    const req = {
      type: "request",
      req: { method: "GET", path: "/hi" },
      res: {}
    };
    expect(handler(req)).toEqual({
      req: { method: "GET", path: "/hi" },
      res: { status: 200 },
      type: "request"
    });
  });

  it("shouldn't match a GET /xxx request", () => {
    const handler = get("/hi", ({ req, res }) => ({
      type: "request",
      req,
      res: { status: 200 }
    }));
    const req = {
      type: "request",
      req: { method: "GET", path: "/xxx" },
      res: {}
    };
    expect(handler(req)).toEqual({
      req: { method: "GET", path: "/xxx" },
      res: {},
      error: "Not a GET /hi"
    });
  });
});
