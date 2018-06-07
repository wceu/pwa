import memoize from 'lodash/memoize';
import * as consts from '../consts';

export const homeContext = {
  columns: [
    [
      {
        type: 'page',
        id: consts.PAGE_HOME_ON_NOW,
      },
    ],
    [
      {
        type: 'page',
        id: consts.PAGE_HOME_UP_NEXT,
      },
    ],
    [
      {
        type: 'page',
        id: consts.PAGE_HOME_SCHEDULE,
      },
    ],
  ],
  options: {
    name: 'home',
    title: 'Schedule',
    color: 'grey',
  },
};

export const venueContext = {
  columns: [
    [
      {
        type: 'page',
        id: consts.PAGE_VENUE_ALL,
      },
    ],
    [
      {
        type: 'page',
        id: consts.PAGE_VENUE_MILKY_WAY,
      },
    ],
    [
      {
        type: 'page',
        id: consts.PAGE_VENUE_ANDROMEDA,
      },
    ],
    [
      {
        type: 'page',
        id: consts.PAGE_VENUE_HAYABUSA,
      },
    ],
    [
      {
        type: 'page',
        id: consts.PAGE_VENUE_CASSINI,
      },
    ],
    [
      {
        type: 'page',
        id: consts.PAGE_VENUE_ROSETTA,
      },
    ],
  ],
  options: {
    name: 'venues',
    title: 'Venue Map',
    color: 'grey',
  },
};

export const announcementsContext = {
  columns: [
    [
      {
        type: 'latest',
        id: 'post',
        page: 1,
      },
    ],
  ],
  options: {
    name: 'announcements',
    title: 'Announcements',
    color: 'grey',
  },
};

export const postsContext = memoize((columns = []) => ({
  columns,
  options: {
    name: 'posts',
    title: 'Announcement',
    color: 'grey',
  },
}));

export const sessionsContext = memoize((columns = []) => ({
  columns,
  options: {
    name: 'sessions',
    title: 'Session',
    color: 'lightGrey',
  },
}));

export const speakersContext = memoize((columns = []) => ({
  columns,
  options: {
    name: 'speakers',
    title: 'Speaker',
    color: 'lightGrey',
  },
}));

export const pageContext = memoize(({ id, title, color = 'grey' }) => ({
  columns: [[{ type: 'page', id }]],
  options: { name: 'page', title, color },
}));
