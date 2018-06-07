export default {
  test: element => element && element.attributes && element.attributes.style,
  process: element => {
    delete element.attributes.style;
    return element;
  },
};
