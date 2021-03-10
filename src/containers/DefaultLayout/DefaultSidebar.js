import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Hidden,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListSubheader,
  ListItemText,
  Toolbar
} from '@material-ui/core';

const DefaultSidebar = ({ classes, mobileOpen, toggleMobile, title, navConfig, container }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const changePage = (url) => {
    if(mobileOpen) {
      toggleMobile();
    }
    navigate(url);
  }

  const makeLink = (item) => {
    return (
        <ListItem button selected={location.pathname === item.url} key={item.name} onClick={() => changePage(item.url)}>
          {item.icon ? <ListItemIcon><item.icon /></ListItemIcon> : null}
          <ListItemText primary={item.name} />
        </ListItem>
    );
  }

  const makeSubText = (item) => {
    return (
        <ListSubheader>{item.name}</ListSubheader>
    );
  }

  const parseNav = () => {
    const list = navConfig.items.map(item => {
      switch (item.type) {
        case 'url': return makeLink(item);
        case 'divider': return <Divider />;
        case 'subtext': return makeSubText(item);
      }
    });

    return (
      <div
        className={classes.toolbar}
        role="presentation"
      >
        <List>
          {list}
        </List>
      </div>
    );
  }

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={toggleMobile}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {parseNav()}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <Toolbar />
          {parseNav()}
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default DefaultSidebar;