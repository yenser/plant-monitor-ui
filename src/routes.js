import React from 'react';

const Temperature = React.lazy(() => import('./views/Temperature/Temperature'));
const Systems = React.lazy(() => import('./views/Systems/Systems'));
const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));

const routes = [
  { path: '/systems', name: 'Systems', component: Systems },
  { path: '/*', name: 'Dashboard', component: Dashboard }
];

export default routes;