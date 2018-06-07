/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import IconVideo from 'react-icons/lib/md/ondemand-video';
import styled from 'react-emotion';
import LazyLoad from '@frontity/lazyload';

const LazyVideo = ({ children, width, height, attributes }) => {
  const { autoPlay, loop, className, ...filteredAttributes } = attributes;

  return (
    <Container styles={{ height, width }}>
      <Icon>
        <IconVideo size={40} />
      </Icon>
      <LazyLoad elementType="span" offsetVertical={2000} offsetHorizontal={-10} throttle={50}>
        <video controls autoPlay={!!autoPlay} loop={!!loop} {...filteredAttributes}>
          {children}
        </video>
      </LazyLoad>
    </Container>
  );
};

LazyVideo.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.shape({}))])
    .isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  attributes: PropTypes.shape({}).isRequired,
};

export default LazyVideo;

const Container = styled.span`
  position: relative;
  box-sizing: border-box;
  width: ${({ styles }) => styles.width};
  height: ${({ styles }) => styles.height};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;

  video {
    width: 100%;
    height: 100%;
  }

  .LazyLoad {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    background-color: transparent;
    color: transparent;
    border: none;
  }
`;

const Icon = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  color: #bdbdbd;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
