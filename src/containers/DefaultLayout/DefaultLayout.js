import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as router from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import DefaultHeader from './DefaultHeader';
import DefaultSidebar from './DefaultSidebar';
import useToggle from '../../hooks/useToggle';

// sidebar nav config
import navigation from '../../_nav';
import routes from '../../routes';

const TITLE = 'Plant Monitor';

const drawerWidth = '260px';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  container: {
    padding: 20,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth})`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  appbarButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

const getSuspenseDOM = () => <div className="fade-in pt-1 text-center">Loading...</div>

const DefaultLayout = () => {
  const classes = useStyles();
  const [mobileOpen, toggleMobile] = useToggle(false);

  return (
    <div className={classes.root}>
      <DefaultHeader title={TITLE} classes={classes} toggleDrawer={toggleMobile} />
      <DefaultSidebar
        classes={classes}
        router={router}
        title="Plant Monitor"
        navConfig={navigation()}
        toggleMobile={toggleMobile}
        mobileOpen={mobileOpen}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Suspense fallback={getSuspenseDOM()}>
          <Grid container spacing={3}>
            <Routes>
              {routes.map((route, idx) => {
                return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} element={<route.component />} />)
                  : (null);
              },
              )}
            </Routes>
          </Grid>
        </Suspense>
      </main>
    </div>
  )
}

export default DefaultLayout;