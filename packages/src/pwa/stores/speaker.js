import { types, getParent } from 'mobx-state-tree';
import Session from './session';

const Id = types.union(types.number, types.string);

const Speaker = types
  .model('Speaker')
  .props({
    id: types.identifier(Id),
    type: types.optional(types.string, 'wcb_speaker'),
    gravatar: types.maybe(types.string),
    sessions: types.optional(types.array(types.reference(types.late(() => Session))), []),
  })
  .views(self => {
    const getConnection = () => getParent(self, 3).connection;
    return {
      get entity() {
        return getConnection().entity(self.type, self.id);
      },
      get name() {
        return self.entity.title;
      },
      get link() {
        return self.entity.link;
      },
    };
  })
  .actions(self => ({
    addSession(session) {
      if (!self.sessions.includes(session)) self.sessions.push(session);
    },
    setGravatar(gravatar) {
      self.gravatar = gravatar;
    },
  }));

export default Speaker;
