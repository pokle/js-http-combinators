
type HError = { type: 'error', message: string };
type HttpState = { type: 'request', req, res}; 
type Handler = (s:HttpState) => HttpState | HError;


export function get(path:string, h:Handler):Handler {
    return ({type, req, res}) => {
        if (req.method === 'GET' && req.path.indexOf(path) === 0) {
            return h({type, req, res});
        } else {
            return {type: 'error', message: 'Not a GET ' + path}
        }
    }
}

export function first(...handlers: Array<Handler>):Handler {
    return ({type, req, res}) => {
        for (let i = 0; i < handlers.length; i++) {
            let h = handlers[i];
            const r = h({ type, req, res})
            if (r && r.type !== 'error') {
                return r;
            }
        }
        return {type: 'error', message: 'No handler matched'}
    }
}


