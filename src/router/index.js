import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// Dynamically import all view components from the views folder
const modules = require.context('../views', true, /\.vue$/);

const dynamicRoutes = modules.keys().map((file) => {
  const componentName = file
    .replace(/^\.\/(.*)\.vue$/, '$1') // Remove './' and '.vue'
    .toLowerCase(); // Convert to lowercase for uniformity

  // Define route path and name
  const routePath =
    componentName === 'homeview'
      ? '/' // Map 'HomeView' to '/'
      : `/${componentName.replace('view', '')}`; // Remove 'View' suffix for other routes

  const routeName = componentName.replace('view', ''); // Name routes without 'View'

  return {
    path: routePath,
    name: routeName,
    component: modules(file).default,
  };
});

// Manually defined routes
const manualRoutes = [
  {
    path: '/job-seekers/view/:id',
    name: 'job-seekers-view',
    component: () => import('@/views/job-seekers/view.vue'),
    props: true,
  },
];

// Combine dynamic and manual routes
const routes = [...dynamicRoutes, ...manualRoutes];

// Create and export router instance
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
