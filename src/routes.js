import React from 'react';

const Temperature = React.lazy(() => import('./views/Temperature/Temperature'));
const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));

const routes = [
  { path: '/*', name: 'Dashboard', component: Dashboard },
];

export default routes;