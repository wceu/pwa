import { types } from 'mobx-state-tree';

export default types
  .model('Notifications')
  .props({
    areSupported: types.optional(types.boolean, false),
    areEnabled: types.optional(types.boolean, true),
    areRegistered: types.optional(types.boolean, false),
  })
  .actions(self => ({
    support() {
      if (!self.areSupported) self.areSupported = true;
    },
    enable() {
      if (!self.areEnabled) self.areEnabled = true;
    },
    disable() {
      if (self.areEnabled) self.areEnabled = false;
    },
    toggleRegistered() {
      self.areRegistered = !self.areRegistered;
    },
  }));
