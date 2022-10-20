// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportErrorHandler from '../../../app/middleware/error_handler';
import ExportGzip from '../../../app/middleware/gzip';
import ExportJwtErr from '../../../app/middleware/jwt_err';

declare module 'egg' {
  interface IMiddleware {
    errorHandler: typeof ExportErrorHandler;
    gzip: typeof ExportGzip;
    jwtErr: typeof ExportJwtErr;
  }
}
