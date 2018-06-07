import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import IconImage from 'react-icons/lib/fa/image';
import Image from './Image';

const Media = ({ entity, isRounded }) => (
  <Container isRounded={isRounded}>
    <Icon>
      <IconImage size={40} />
    </Icon>
    <Image entity={entity} />
  </Container>
);

Media.propTypes = {
  entity: PropTypes.shape({}).isRequired,
  isRounded: PropTypes.bool,
};

Media.defaultProps = {
  isRounded: false,
};

export default Media;

const Container = styled.div`
  position: relative;
  z-index: 0;
  box-sizing: border-box;
  width: 100%;
  height: 160px;
  background: ${({ theme }) => theme.color.grey};
  border-radius: 3px;

  img {
    border-radius: ${({ isRounded }) => (isRounded ? '3px' : 0)};
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const Icon = styled.span`
  position: absolute;
  z-index: -1;
  top: 0;
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
