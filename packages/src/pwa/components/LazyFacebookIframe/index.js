import React from 'react';
import PropTypes from 'prop-types';
import LazyIframe from '../LazyIframe';

const LazyFacebook = ({ height, attributes }) => (
  <LazyIframe width="100vw" height={height} attributes={attributes} />
);

LazyFacebook.propTypes = {
  height: PropTypes.string.isRequired,
  attributes: PropTypes.shape({}).isRequired,
};

export default LazyFacebook;
