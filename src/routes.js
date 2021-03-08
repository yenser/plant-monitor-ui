import React from 'react';

const Temperature = React.lazy(() => import('./views/Temperature/Temperature'));
const Images = React.lazy(() => import('./views/Images/Images'));
const Systems = React.lazy(() => import('./views/Systems/Systems'));
const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));

const routes = [
  { path: '/images', name: 'Images', component: Images },
  { path: '/systems', name: 'Systems', component: Systems },
  { path: '/*', name: 'Dashboard', component: Dashboard }
];

export default routes;