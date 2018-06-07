/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from '@frontity/lazyload';
import IconAudio from 'react-icons/lib/md/audiotrack';
import styled from 'react-emotion';

const LazyAudio = ({ width, height, attributes, children }) => (
  <Container styles={{ height, width }}>
    <Icon>
      <IconAudio size={40} />
    </Icon>
    <LazyLoad elementType="span" offsetVertical={2000} offsetHorizontal={-10} throttle={50}>
      <audio {...attributes}>{children}</audio>
    </LazyLoad>
  </Container>
);

LazyAudio.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  attributes: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.arrayOf(PropTypes.shape({}))]),
};

LazyAudio.defaultProps = {
  children: null,
};

export default LazyAudio;

const Container = styled.span`
  position: relative;
  box-sizing: border-box;
  width: ${({ styles }) => styles.width};
  height: ${({ styles }) => styles.height};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;

  & > .LazyLoad {
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

  amp-audio,
  audio {
    width: ${({ styles }) => styles.width};
    height: ${({ styles }) => styles.height};
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
