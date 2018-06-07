import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';

const Logo = ({ src, srcSet }) => (
  <Container>
    <Img alt="Wordcamp logo" src={src} srcSet={srcSet} />
  </Container>
);

Logo.propTypes = {
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired,
};

export default inject(({ settings }) => {
  const sizes = [
    { px: 32, ratio: 1 },
    { px: 48, ratio: 1.5 },
    { px: 64, ratio: 2 },
    { px: 80, ratio: 2.5 },
    { px: 96, ratio: 3 },
  ];

  const { logoUrl } = settings.theme;

  return {
    src: logoUrl,
    srcSet: sizes.map(size => `${logoUrl}?w=${size.px} ${size.ratio}x`).join(', '),
  };
})(Logo);

const Container = styled.div`
  box-sizing: border-box;
  width: ${({ theme }) => theme.size.button};
  height: ${({ theme }) => theme.size.button};
  padding: 12px 0 12px 16px;
`;

const Img = styled.img`
  object-fit: contain;
  height: 100%;
  width: 100%;
`;
