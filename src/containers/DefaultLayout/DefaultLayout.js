import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import DefaultHeader from './DefaultHeader';

import routes from '../../routes';

const useStyles = makeStyles({
  container: {
    marginTop: 20,
  }
});

const getSuspenseDOM = () => <div className="fade-in pt-1 text-center">Loading...</div>

const DefaultLayout = () => {
  const classes = useStyles();

  return (
    <>
      <DefaultHeader title="Raspberry Pi Dashboard" />
        <Suspense fallback={getSuspenseDOM()}>
          <Routes>
            {routes.map((route, idx) => {
              return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} element={<route.component />} />)
                : (null);
            },
            )}
          </Routes>
        </Suspense>
    </>
  )
}

export default DefaultLayout;