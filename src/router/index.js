import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// Dynamically import all view components from the views folder
const modules = require.context('../views', true, /\.vue$/);

const routes = modules.keys().map((file) => {
  const componentName = file
    .replace(/^\.\/(.*)\.vue$/, '$1') // Remove './' and '.vue'
    .toLowerCase(); // Convert to lowercase for uniformity

  const routePath = componentName === 'homeview' ? '/' : `/${componentName.replace('view', '')}`; // Home route logic
  const routeName = componentName.replace('view', ''); // Remove 'View' suffix

  return {
    path: routePath,
    name: routeName,
    component: modules(file).default,
  };
});

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
