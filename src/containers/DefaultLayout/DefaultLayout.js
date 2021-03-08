import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import DefaultHeader from './DefaultHeader';

import routes from '../../routes';

const TITLE = 'Plant Monitor';

const useStyles = makeStyles({
  container: {
    padding: 20,
  }
});

const getSuspenseDOM = () => <div className="fade-in pt-1 text-center">Loading...</div>

const DefaultLayout = () => {
  const classes = useStyles();

  return (
    <>
      <DefaultHeader title={TITLE} />
        <Suspense fallback={getSuspenseDOM()}>
          <Grid className={classes.container} container spacing={3}>
            <Routes>
              {routes.map((route, idx) => {
                return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} element={<route.component />} />)
                  : (null);
              },
              )}
            </Routes>
          </Grid>
        </Suspense>
    </>
  )
}

export default DefaultLayout;