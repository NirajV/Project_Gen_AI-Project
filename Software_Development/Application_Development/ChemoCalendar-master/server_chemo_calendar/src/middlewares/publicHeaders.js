import client from '../client.js';

module.exports = (req, res, next) => {
    const token = req.headers['x-auth-token'];
    req.headers['X-AUTH-TOKEN'] = token;
    req.client = client(req);
    next()
};