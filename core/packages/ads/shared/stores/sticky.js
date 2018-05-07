import { types, getEnv } from 'mobx-state-tree';
import * as actionTypes from '../actionTypes';

export default types
  .model('Sticky')
  .props({
    isOpen: false,
    timeout: null,
    closedByUser: false,
  })
  .actions(self => {
    const { store, isClient } = getEnv(self);
    return {
      [actionTypes.STICKY_HAS_SHOWN]: ({ timeout }) => {
        self.isOpen = true;
        self.timeout = timeout;
      },
      [actionTypes.STICKY_HAS_HIDDEN]: () => {
        self.isOpen = false;
        self.timeout = null;
        self.closedByUser = true;
      },
      [actionTypes.STICKY_UPDATE_TIMEOUT]: ({ timeout }) => {
        self.timeout = timeout;
      },
      afterCreate: () => {
        if (isClient) {
          if (store)
            store.subscribe(() => {
              const action = store.getState().lastAction;

              if (self[action.type]) {
                self[action.type](action);
              }
            });
        }
      },
    };
  });
