import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },

  links: [{ rel: 'icon', href: 'http://81.70.92.245/pictory/logo.ico' }],

  title: 'The road of photography',

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
  //配置 externals 还能减小编译消耗
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
    moment: 'window.moment',
    antd: 'window.antd',
  },
  scripts: [
    'https://cdn.bootcdn.net/ajax/libs/react/17.0.1/umd/react.development.min.js',
    'https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.1/umd/react-dom.production.min.js',
    'https://cdn.bootcdn.net/ajax/libs/moment.js/2.29.1/moment.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/antd/4.8.2/antd.min.js',
  ],
  //样式生效必须写在styles里面
  styles: ['https://cdnjs.cloudflare.com/ajax/libs/antd/4.8.2/antd.min.css'],
  dva: {},
  antd: false, //启用后自动配置 babel-plugin-import实现antd按需加载  false 表示不开启  {} 表示开启
  request: {
    dataField: 'data',
  },
  routes: [
    { path: '/', component: '@/pages/login' },
    { path: '/register', component: '@/pages/register' },
    { path: '/users', component: '@/pages/users' },
  ],
  targets: {
    //配置浏览器最低版本,比如兼容ie11
    ie: 11,
  },
  hash: true, //开启打包文件的hash值后缀,
  proxy: {
    '/api': {
      target: 'http://81.70.92.245:3000/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
