export type HttpResponse = {
  status?: number;
  body?: string;
};
export type HttpState = { req: any; res: HttpResponse; error?: string };
export type Handler = (s: HttpState) => HttpState;

export function isError(s: HttpState): boolean {
  return Boolean(!s || s.error);
}

export function get(path: string, h: Handler): Handler {
  return ({ req, res }) => {
    if (req.method === "GET" && req.path.indexOf(path) === 0) {
      return h({ req, res });
    } else {
      return {
        req,
        res,
        error: "Expected GET " + path + ", got " + req.method + " " + req.path
      };
    }
  };
}

export function first(...handlers: Array<Handler>): Handler {
  return ({ req, res }) => {
    for (let i = 0; i < handlers.length; i++) {
      let h = handlers[i];
      const r = h({ req, res });
      if (!isError(r)) {
        return r;
      }
    }
    return { req, res, error: "No handler matched first()" };
  };
}
