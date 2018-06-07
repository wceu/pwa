import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { parse } from 'url';
import IconImage from 'react-icons/lib/fa/image';
import styled from 'react-emotion';

const Image = ({ alt, width, height, content, src, srcSet }) => (
  // content.toString() -> Avoids a warning from emotion.
  <Container content={content.toString()} styles={{ height, width }}>
    <Icon content={content.toString()} styles={{ height, width }}>
      <IconImage size={40} />
    </Icon>
    {src || srcSet ? (
      <img alt={alt} sizes={`${parseInt(width, 10)}vw`} src={src} srcSet={srcSet} />
    ) : null}
  </Container>
);

Image.propTypes = {
  content: PropTypes.bool, // Indicates that Image will be rendered inside Content
  width: PropTypes.string, // CSS values
  height: PropTypes.string, // CSS values
  alt: PropTypes.string, // Alt from HtmlToReactConverter or getAlt selector.
  src: PropTypes.string, // Src from HtmlToReactConverter or getSrc selector.
  srcSet: PropTypes.string, // SrcSet from HtmlToReactConverter or getSrcSet selector.
};

Image.defaultProps = {
  width: 'auto',
  height: 'auto',
  content: false,
  alt: '',
  src: '',
  srcSet: '',
};

export default inject(({ connection, settings }, { id, width, height }) => {
  if (!id) return {};

  const media = connection.entity('media', id);
  const originalPath = parse(media.original.url).path;
  const cdn = (settings.theme.cdn || {}).images;

  // Returns true if width/height ratio of both objects are very, very close.
  // Used when computing the srcSet prop value.
  const sameRatio = ({ width: w1, height: h1 }, { width: w2, height: h2 }) =>
    Math.abs(w1 / h1 - w2 / h2) < 0.01;

  const src = cdn && originalPath ? `${cdn}${originalPath}` : media.original.url;

  return {
    alt: media.alt,
    src,
    srcSet:
      media.sizes
        .reduce((result, current) => {
          if (
            sameRatio(current, media.original) &&
            !result.find(size => size.width === current.width)
          ) {
            result.push(current);
          }
          return result;
        }, [])
        .map(item => {
          const { path } = parse(item.url);
          const url = cdn && path ? `${cdn}${path}` : item.url;

          return `${url} ${item.width}w`;
        })
        .join(', ') || (src ? `${src} 100w` : ''),
    width: width || '100vw',
    height: height || `${media.original.height * 100 / media.original.width}vw`,
  };
})(Image);

const Container = styled.span`
  display: block;
  align-items: stretch;
  box-sizing: border-box;
  height: ${({ styles }) => styles.height};
  position: relative;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    color: transparent;
    border: none;
  }
`;

const Icon = styled.span`
  position: absolute;
  top: 0;
  color: #bdbdbd;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
