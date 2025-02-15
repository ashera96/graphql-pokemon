import Koa from 'koa';
import cors from 'koa-cors';
import graphqlHTTP from 'koa-graphql';
import convert from 'koa-convert';

import schema from './schema';

const app = new Koa();

app
  .use(async (ctx, next) => {
    ctx.set('Connection', 'keep-alive');
    ctx.set('Keep-Alive', 'timeout=1500');
    await next();
  })
  .use(convert(cors()))
  .use(convert(graphqlHTTP(async () => ({
    graphiql: true,
    schema,
    formatError: ({ message, locations, stack }) => ({
      message,
      locations,
      stack,
    }),
  })
)));

export default app;
