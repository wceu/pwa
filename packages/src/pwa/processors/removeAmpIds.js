export default {
  test: ({ attributes }) => attributes.id === 'amp',
  process: (element, { state }) => {
    if (state.build.amp) {
      element.attributes.id = null;
    }

    return element;
  },
};
