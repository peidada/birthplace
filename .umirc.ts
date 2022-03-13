import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },

  // links: [{ rel: 'icon', href: 'http://81.70.92.245/pictory/logo.ico' }],

  title: 'birthplace',

  //开启按需加载
  dynamicImport: {},
  //开启按需加载后把 css 打包成一个文件
  chainWebpack(config) {
    config.optimization.splitChunks({
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(css|scss)$/,
          chunks: 'async',
          minChunks: 1,
          minSize: 0,
        },
      },
    });
  },
  //样式生效必须写在styles里面
  styles: ['https://cdnjs.cloudflare.com/ajax/libs/antd/4.8.2/antd.min.css'],
  dva: {},
  antd: {}, //启用后自动配置 babel-plugin-import实现antd按需加载  false 表示不开启  {} 表示开启
  request: {
    dataField: 'data',
  },
  /* 
    exact: 表示是否严格匹配，即 location 是否和 path 完全对应上
  */
  routes: [
    {
      exact: false,
      path: '/',
      component: '@/layouts/index',
      routes: [
        { exact: true, path: '/', component: '@/pages/index' },
        { exact: true, path: '/login', component: '@/pages/login/login' },
        {
          exact: true,
          path: '/register',
          component: '@/pages/register/register',
        },
        { exact: true, path: '/portal', component: '@/pages/portal/portal' },
      ],
    },
  ],
  targets: {
    //配置浏览器最低版本,比如兼容ie11
    ie: 11,
  },
  hash: true, //开启打包文件的hash值后缀,
  proxy: {
    '/api': {
      target: 'http://39.106.3.240:8070/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
