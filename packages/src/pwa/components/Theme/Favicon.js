import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Helmet } from 'react-helmet';

const Favicon = ({ logoUrl }) => (
  <Helmet>
    <link href={`${logoUrl}?w=32`} rel="shortcut icon" type="image/x-icon" />
  </Helmet>
);

Favicon.propTypes = {
  logoUrl: PropTypes.string.isRequired,
};

export default inject(({ settings }) => ({
  logoUrl: settings.theme.logoUrl,
}))(Favicon);
