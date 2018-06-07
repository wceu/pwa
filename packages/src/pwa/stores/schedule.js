import { types, getParent } from 'mobx-state-tree';
import Track from './track';

export default types
  .model('Schedule')
  .props({
    selected: types.maybe(types.reference(Track)),
    isFiltered: types.optional(types.boolean, false),
  })
  .views(self => ({
    get tracks() {
      return getParent(self)
        .tracks.filter(track => track.name !== 'Networking')
        .sort((a, b) => a.id - b.id);
    },
  }))
  .actions(self => ({
    setSelected(track) {
      self.selected = track;
    },
    selectTrack(value) {
      const track = getParent(self).tracks.find(t => t.name === value);
      if (self.selected !== track) self.selected = track;
    },
    toggleFilter() {
      self.isFiltered = !self.isFiltered;
    },
  }));
