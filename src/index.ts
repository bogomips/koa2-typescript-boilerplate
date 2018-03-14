import 'app-module-path/register';
import * as Koa from 'koa';
//import * as colors from 'colors';
import * as compress from 'koa-compress';
//import * as body from 'koa-better-body';
//import dbApi from 'dbApi';
import config from 'config';
import headers from 'mdw/headers';
import { sslServer } from 'helpers/ssl';
//import { logger } from 'logging';
import { routes } from 'routes';

const app = new Koa();

/**
 * Middlewares
 */
/*const body_onError = (err,ctx,next) => {
    if (err.message == 'invalid json received')
            ctx.throw('invalid json or body content format', 422);
    else
            ctx.throw(err);
};*/

app.use(compress({  
  //threshold: 1024 //1024 is the default value
  flush: require('zlib').Z_SYNC_FLUSH 
}));

//app.use(body({fields:'body',strict:false,onerror: body_onError}));
app.use(headers);
//app.use(logger);

app.use(routes.allowedMethods()); //I need it for OPTIONS
app.use(routes.routes());

const start_msg = `\n\n
*************************************************************
Launched at ${new Date()}
Running at ${config.server.address}:${config.server.port}${config.api.prefix}
Env: ${process.env.NODE_ENV}
*************************************************************\n\n`;

//dbApi.connect();

const server = (config.server.ssl.active) ? sslServer.create() : app;

if (server) 
  server.listen(config.server.port,() => console.log(start_msg));
else
  console.log("\nCannot start the server, check the errors above");


