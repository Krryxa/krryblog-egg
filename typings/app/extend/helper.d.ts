// This file is created by egg-ts-helper@1.31.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExtendIHelper from '../../../app/extend/helper';
type ExtendIHelperType = typeof ExtendIHelper;
declare module 'egg' {
  interface IHelper extends ExtendIHelperType { }
}