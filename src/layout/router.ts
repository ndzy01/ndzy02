import { PageA0 } from '@/view/A/page0';
import { PageA1 } from '@/view/A/page1';

import { PageB0 } from '@/view/B/page0';

import Login from '@/view/login/Login';

import { ErrorPage } from '@/view/404/ErrorPage';

const appConfig = {
  '404': true,
  menu: [
    {
      key: '/A',
      auth: '',
      title: 'A',
      icon: 'icon-gongdan',
      subMenu: [
        {
          key: '/A/page0',
          auth: '张一',
          title: 'page0'
        },
        {
          key: '/A/page1',
          auth: '张一',
          title: 'page1'
        }
      ]
    },
    {
      key: '/B',
      auth: '',
      title: 'B',
      icon: 'appstore',
      subMenu: [
        {
          key: '/B/page0',
          auth: '',
          title: 'page0'
        }
      ]
    }
  ],
  fullScreen: [
    {
      key: '/login',
      title: '登录页'
    }
  ]
};

const menuRouter = [
  {
    path: '/A/page0',
    auth: '',
    component: PageA0,
    parent: '/A',
    title: 'page0',
    hidden: false
  },
  {
    path: '/A/page1',
    auth: '',
    component: PageA1,
    parent: '/A',
    title: 'page1',
    hidden: false
  },

  {
    path: '/B/page0',
    auth: '',
    component: PageB0,
    parent: '/B',
    title: 'page0',
    hidden: false
  }
];

const fullScreenRouter = [
  {
    path: '/login',
    auth: '',
    component: Login,
    title: '登录页'
  }
];

const errRouter = [
  {
    path: '/404',
    component: ErrorPage,
    title: '错误页面'
  }
];

export { menuRouter, fullScreenRouter, errRouter, appConfig };
