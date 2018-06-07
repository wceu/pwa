export default {
  test: ({ tagName, attributes }) =>
    tagName === 'div' &&
    attributes &&
    attributes.className &&
    attributes.className.includes('gallery_regular'),
  process: element => {
    element.attributes.id = 'gallery-0';
    return element;
  },
};
