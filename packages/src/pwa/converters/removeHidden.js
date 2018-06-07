export default {
  test: ({ attributes }) =>
    attributes &&
    attributes.style &&
    (attributes.style.display === 'none' || attributes.style.visibility === 'hidden'),
  converter: () => null
};
