import { get } from ".";

const HTTPOK = ({ req, res }) => ({
  req,
  res: { status: 200, body: "OK" }
});

describe("index", () => {
  it("should match a GET /hi request", () => {
    const handler = get("/hi", HTTPOK);
    const req = {
      req: { method: "GET", path: "/hi" },
      res: {}
    };
    expect(handler(req)).toEqual({
      req: { method: "GET", path: "/hi" },
      res: { status: 200, body: "OK" }
    });
  });

  it("shouldn't match a GET /xxx request", () => {
    const handler = get("/hi", HTTPOK);
    const req = {
      req: { method: "GET", path: "/xxx" },
      res: {}
    };
    expect(handler(req)).toEqual({
      req: { method: "GET", path: "/xxx" },
      res: {},
      error: "Expected GET /hi, got GET /xxx"
    });
  });
});
