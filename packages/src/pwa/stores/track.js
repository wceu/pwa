import { types, getParent } from 'mobx-state-tree';
import Session from './session';

const Id = types.union(types.number, types.string);

const Track = types
  .model('Track')
  .props({
    id: types.identifier(Id),
    sessions: types.optional(types.array(types.reference(types.late(() => Session))), []),
  })
  .views(self => {
    const getConnection = () => getParent(self, 3).connection;
    return {
      get entity() {
        return getConnection().entity('wcb_track', self.id);
      },
      get name() {
        return self.entity.name;
      },
      get firstDaySessions() {
        return self.sessionsByWithFilter(new Date('2018-06-15T08:00:00+02:00'));
      },
      get secondDaySessions() {
        return self.sessionsByWithFilter(new Date('2018-06-16T08:00:00+02:00'));
      },
      sessionsByWithFilter(date) {
        const onlyFavorites = getParent(self, 2).schedule.isFiltered;

        return this.sessionsBy(date, onlyFavorites).filter(
          session => session.type === 'wcb_session',
        );
      },
      sessionsBy(date, onlyFavorites = false) {
        const day = new Date(date); // Copy date passed as argument
        day.setHours(0);
        day.setMinutes(0);
        day.setSeconds(0);
        day.setMilliseconds(0);

        const nextDay = new Date(day);
        nextDay.setHours(24);

        return self.sessions.filter(
          session =>
            (!onlyFavorites || session.isFavorite) && session.date >= day && session.date < nextDay,
        );
      },
      sessionOnNow(date) {
        const currentTime = date || new Date();
        return self.sessions.reverse().find(({ date: d }) => d <= currentTime);
      },
      sessionUpNext(date) {
        const currentTime = date || new Date();
        return self.sessions.find(({ date: d }) => d > currentTime);
      },
    };
  })
  .actions(self => ({
    addSession(session) {
      if (!self.sessions.includes(session)) {
        self.sessions.push(session);
        // Ensures that sessions are always sorted
        self.sessions = self.sessions.sort((a, b) => a.timestamp - b.timestamp);
      }
    },
  }));

export default Track;
