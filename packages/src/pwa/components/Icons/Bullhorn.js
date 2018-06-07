import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Bullhorn = ({ size, inCard }) => (
  <Svg
    size={size}
    inCard={inCard}
    aria-hidden="true"
    data-prefix="fal"
    data-icon="bullhorn"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    className="svg-inline--fa fa-bullhorn fa-w-18"
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      d="M544 192V32c0-17.7-14.3-32-32-32-65 56-174 128-304 128H48c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h16.8c-5.3 58.6 15 107 28.9 151.6 1.5 5 4.3 9.5 8 13.2C119 502.1 142.8 512 167 512c31.8 0 60.9-17 75.5-47.7 7-14.7 1.9-32.3-11.9-40.9-27.9-17.4-32-22.5-26.8-31.5 6.9-12.1 5.2-27.3-4.2-37.6-5.3-5.8-1.3-27.4 11-34.3 128.9.9 236.9 72.4 301.5 128 17.7 0 32-14.3 32-32V256c17.7 0 32-14.3 32-32s-14.4-32-32.1-32zM213.7 450.5c-17.4 36.7-63.5 37.4-89.4 11.6C110.5 417.6 91.4 372.9 97 320h73.7c-8.3 19.2-7.6 42.1 5.3 56-19.9 34.7 8 56 37.7 74.5zM32 272v-96c0-8.8 7.2-16 16-16h176v128H48c-8.8 0-16-7.2-16-16zm480 134.4c-36.6-29.1-74.7-53.4-113.7-72.2-47.3-22.9-95-37.4-142.3-43.2V157c47.3-5.9 95-20.3 142.3-43.2 38.9-18.9 77.1-43.1 113.7-72.2v364.8z"
    />
  </Svg>
);

Bullhorn.propTypes = {
  size: PropTypes.number.isRequired,
  inCard: PropTypes.bool.isRequired,
};

export default Bullhorn;

const Svg = styled.svg`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  color: ${({ theme, inCard }) => (inCard ? theme.color.blue : theme.color.black)};
  ${({ inCard }) => (inCard ? 'margin-right: 12px' : null)};
`;
