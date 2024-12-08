export const cors = (allowedOrigins = '*', allowedMethods = 'GET,POST,PUT,DELETE,OPTIONS', allowedHeaders = 'Content-Type, Authorization') => {
    return async (c, next) => {
        c.res.headers.append('Access-Control-Allow-Origin', allowedOrigins);
        c.res.headers.append('Access-Control-Allow-Methods', allowedMethods);
        c.res.headers.append('Access-Control-Allow-Headers', allowedHeaders);
        if (c.req.method === 'OPTIONS') {
            c.status(204);
            return c.res;
        }
        await next();
    };
};
