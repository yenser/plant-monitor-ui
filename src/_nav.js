import {
  Dashboard,
  Computer,
  Image
} from '@material-ui/icons';

export default (teamId) => {
  return {
    items: [
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: Dashboard,
        type: 'url',
        badge: {
          variant: 'danger',
          text: 'WIP'
        }
      },
      {
        name: 'Systems',
        url: '/systems',
        icon: Computer,
        type: 'url'
      },
      {
        name: 'Images',
        url: '/images',
        icon: Image,
        type: 'url'
      }
    ]
  }
};
