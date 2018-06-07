import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { parse } from 'url';

const Image = ({ alt, src, srcSet }) =>
  src || srcSet ? <img alt={alt} sizes="100vw" src={src} srcSet={srcSet} /> : null;

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired,
};

// Returns true if width/height ratio of both objects are very, very close.
// Used when computing the srcSet prop value.
const sameRatio = ({ width: w1, height: h1 }, { width: w2, height: h2 }) =>
  Math.abs(w1 / h1 - w2 / h2) < 0.01;

export default inject(({ settings }, { entity }) => {
  const cdn = (settings.theme.cdn || {}).images;
  const originalPath = parse(entity.original.url).path;
  const src = cdn && originalPath ? `${cdn}${originalPath}` : entity.original.url;

  const sizes = entity.sizes
    .filter(item => sameRatio(item, entity.original))
    .map(item => {
      const { path } = parse(item.url);
      const url = cdn && path ? `${cdn}${path}` : item.url;
      return `${url} ${item.width}w`;
    })
    .join(', ');

  return {
    alt: entity.alt,
    src: entity.original.url,
    srcSet: sizes || (src ? `${src} 100w` : ''),
  };
})(Image);
