export default {
  test: ({ tagName, attributes }) =>
    tagName === 'div' &&
    attributes &&
    attributes.className &&
    attributes.className.includes('tiled-gallery'),
  process: element => {
    element.attributes.id = 'gallery-0';
    return element;
  },
};
