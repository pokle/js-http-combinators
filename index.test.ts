import { get } from '.';

describe('index', () => {
    it('should match a GET /hi request', () => {
        const combo = get('/hi', ({req, res}) => ({ type: 'request', req, res: { status: 200 }}))
        expect(combo({ type: 'request', req: { method: 'GET', path: '/hi'}, res: {}}))
            .toEqual({"req": {"method": "GET", "path": "/hi"}, "res": {"status": 200}, "type": "request"})
    })
})