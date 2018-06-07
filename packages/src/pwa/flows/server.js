import { flow, addMiddleware } from 'mobx-state-tree';
import {
  homeContext,
  venueContext,
  announcementsContext,
  creditsContext,
  pageContext,
  postsContext,
} from '../contexts';

const extractId = href => /\/(\d+)$/g.exec(href)[1];
const extractGravatar = url => (/gravatar\.com\/avatar\/([0-9A-Fa-f]+)/.exec(url) || [])[1];

const wcbMiddleware = (call, next) => {
  if (call.name === 'addEntity') {
    const [{ entity }] = call.args;

    if (entity.type === 'wcb_session') {
      const { theme } = call.tree;

      const {
        type,
        id,
        session_track: tracks,
        session_category: categories,
        _links: { speakers: speakerHrefs = [] },
      } = entity;

      const speakers = speakerHrefs.map(({ href }) => parseInt(extractId(href), 10));

      theme.createSession({ type, id, tracks, categories, speakers });
    } else if (entity.type === 'wcb_track') {
      const { theme } = call.tree;
      const { id } = entity;
      if (!theme.track(id)) theme.createTrack({ id });
    } else if (entity.type === 'wcb_speaker') {
      const { theme } = call.tree;
      const {
        id,
        avatar_urls: { 96: avatarUrl },
      } = entity;
      const gravatar = avatarUrl ? extractGravatar(avatarUrl) : null;
      if (!theme.speaker(id)) theme.createSpeaker({ id, gravatar });
      else theme.speaker(id).setGravatar(gravatar);
    }
  }
  next(call);
};

export default self =>
  flow(function* ThemeServer({ selectedItem }) {
    addMiddleware(self, wcbMiddleware);

    const { type, id, page } = selectedItem;
    const action = { selectedItem: { type, id, page } };

    if (type === 'page') {
      if ([23, 26, 28, 30, 32, 34].includes(id)) action.context = venueContext;
      else if (id === 36) action.context = creditsContext;
      else if (id === 76) action.context = pageContext({ id, title: 'Code of Conduct' });
      else if (id === 78) action.context = pageContext({ id, title: 'Menus' });
      else action.context = homeContext;
    } else if (type === 'latest' && id === 'post') {
      action.context = announcementsContext;
    } else if (type === 'post') {
      yield self.connection.fetchEntity(selectedItem);
      action.context = postsContext([[selectedItem]]);
    } else {
      action.context = homeContext;
    }

    self.connection.routeChangeSucceed(action);

    yield Promise.all([
      self.connection.fetchListPage({
        type: 'latest',
        id: 'post',
        page: 1,
      }),
      self.connection.fetchCustomPage({
        name: 'sessions',
        type: 'wcb_session',
        page: 1,
        params: { per_page: 100, _embed: false },
      }),
      self.connection.fetchCustomPage({
        name: 'speakers',
        type: 'wcb_speaker',
        page: 1,
        params: { per_page: 100, _embed: false },
      }),
      self.connection.fetchCustomPage({
        name: 'tracks',
        type: 'wcb_track',
        page: 1,
        params: { per_page: 100, _embed: false },
      }),
      self.connection.fetchCustomPage({
        name: 'pages',
        type: 'page',
        page: 1,
        params: {
          per_page: 100,
          _embed: false,
          include: '13, 15, 17, 19, 23, 26, 28, 30, 32, 34, 36, 50, 52, 56, 58, 60, 62, 76, 78',
        },
      }),
    ]);

    const track = self.theme.tracks.find(t => t.name === 'Milky Way Track') || self.theme.tracks[0];
    self.theme.schedule.setSelected(track);

    const allTrackIds = self.theme.tracks.map(t => t.id);

    // Adds custom sessions
    const before = {
      type: 'page',
      id: 50,
      sessionTitle: 'BEFORE',
      sessionTimestamp: new Date('2018-05-01T00:00:00+02:00').getTime(),
      tracks: allTrackIds,
    };
    const contributors = {
      type: 'page',
      id: 52,
      sessionTitle: 'CONTRIBUTORS',
      sessionTimestamp: new Date('2018-06-14T08:00:00+02:00').getTime(), // check time
      tracks: allTrackIds,
    };
    const thursdayNight = {
      type: 'page',
      id: 56,
      sessionTitle: 'THURSDAY NIGHT',
      sessionTimestamp: new Date('2018-06-14T18:00:00+02:00').getTime(), // check time
      tracks: allTrackIds,
    };
    const fridayNight = {
      type: 'page',
      id: 58,
      sessionTitle: 'FRIDAY NIGHT',
      sessionTimestamp: new Date('2018-06-15T18:00:00+02:00').getTime(), // check time
      tracks: allTrackIds,
    };
    const afterParty = {
      type: 'page',
      id: 60,
      sessionTitle: 'AFTER PARTY',
      sessionTimestamp: new Date('2018-06-16T20:00:00+02:00').getTime(), // check time
      tracks: allTrackIds,
    };
    const after = {
      type: 'page',
      id: 62,
      sessionTitle: 'AFTER',
      sessionTimestamp: new Date('2018-06-17T02:00:00+02:00').getTime(),
      tracks: allTrackIds,
    };
    const afterAfter = {
      mstId: 'after_after_session',
      type: 'page',
      id: 62,
      sessionTitle: 'AFTER',
      sessionTimestamp: new Date('2019-06-17T02:00:00+02:00').getTime(),
      tracks: allTrackIds,
    };

    self.theme.createSession(before);
    self.theme.createSession(contributors);
    self.theme.createSession(thursdayNight);
    self.theme.createSession(fridayNight);
    self.theme.createSession(afterParty);
    self.theme.createSession(after);
    self.theme.createSession(afterAfter);
  });
