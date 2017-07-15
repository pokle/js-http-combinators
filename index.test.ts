import { first, get, Handler, HttpState } from ".";

const HTTPOK: Handler = ({ req, res }) => ({
  req,
  res: { status: 200, body: "OK" }
});

const HTTPNOTFOUND: Handler = ({ req, res }) => ({
  req,
  res: { status: 404, body: "NOT FOUND" }
});

function request(method: string, path: string): HttpState {
  return {
    req: { method, path },
    res: {}
  };
}

describe("get combinator", () => {
  it("should match a GET /hi request", () => {
    const handler = get("/hi", HTTPOK);
    expect(handler(request("GET", "/hi"))).toEqual({
      req: { method: "GET", path: "/hi" },
      res: { status: 200, body: "OK" }
    });
  });

  it("shouldn't match a GET /xxx request", () => {
    const handler = get("/hi", HTTPOK);
    expect(handler(request("GET", "/xxx"))).toEqual({
      req: { method: "GET", path: "/xxx" },
      res: {},
      error: "Expected GET /hi, got GET /xxx"
    });
  });
});

describe("first combinator", () => {
  it("should match the first successful handler", () => {
    const handler = first(
      get("/hii", HTTPOK),
      get("/hey", HTTPNOTFOUND),
      get("/yoo", HTTPOK)
    );
    expect(handler(request("GET", "/hey"))).toEqual({
      req: { method: "GET", path: "/hey" },
      res: { status: 404, body: "NOT FOUND" }
    });
  });
});
