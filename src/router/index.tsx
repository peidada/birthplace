import { IRoute } from 'umi';

const routes: IRoute[] = [
  { path: '/', component: '@/pages/login.js' },
  { path: '/register', component: '@/pages/register' },
  { path: '/users', component: '@/pages/users' },
];
export default routes;
