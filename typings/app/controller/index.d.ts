// This file is created by egg-ts-helper@1.31.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/controller/base';
import ExportHome from '../../../app/controller/home';
import ExportPart from '../../../app/controller/part';
import ExportAdminList from '../../../app/controller/admin/list';
import ExportAdminMusic from '../../../app/controller/admin/music';
import ExportAdminPicture from '../../../app/controller/admin/picture';
import ExportAdminUser from '../../../app/controller/admin/user';
import ExportBlogClassify from '../../../app/controller/blog/classify';
import ExportBlogList from '../../../app/controller/blog/list';

declare module 'egg' {
  interface IController {
    base: ExportBase;
    home: ExportHome;
    part: ExportPart;
    admin: {
      list: ExportAdminList;
      music: ExportAdminMusic;
      picture: ExportAdminPicture;
      user: ExportAdminUser;
    }
    blog: {
      classify: ExportBlogClassify;
      list: ExportBlogList;
    }
  }
}
