import { types } from 'mobx-state-tree';

export default types
  .model('Menu')
  .props({ isOpen: types.optional(types.boolean, false) })
  .actions(self => ({
    open() {
      if (!self.isOpen) self.isOpen = true;
    },
    close() {
      if (self.isOpen) self.isOpen = false;
    },
  }));
