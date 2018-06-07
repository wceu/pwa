export default {
  test: ({ tagName, attributes }) =>
    tagName === 'div' &&
    attributes &&
    attributes.className &&
    attributes.className.includes('td-slide-on-2-columns'),
  process: element => {
    element.attributes.id = 'gallery-0';
    return element;
  },
};
