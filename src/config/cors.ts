import { MiddlewareHandler, Context } from 'hono';

export const cors = (
  allowedOrigins: string = '*',
  allowedMethods: string = 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: string = 'Content-Type, Authorization'
): MiddlewareHandler => {
  return async (c: Context, next: () => Promise<void>) => {
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
