import { IRoute } from 'umi';

const routes: IRoute[] = [
  { path: '/', component: '@/pages/login.js' },
  { path: '/register', component: '@/pages/register' },
  { path: '/portal', component: '@/pages/portal' },
];
export default routes;
