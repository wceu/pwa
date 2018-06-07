import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { inject } from 'mobx-react';

const Manifest = ({ siteId, dynamicUrl }) => (
  <Helmet>
    <link rel="manifest" href={`${dynamicUrl}dynamic/wordcamp-theme/${siteId}/manifest.json`} />
  </Helmet>
);
Manifest.propTypes = {
  siteId: PropTypes.string.isRequired,
  dynamicUrl: PropTypes.string.isRequired,
}

export default inject(({ build }) => ({
  siteId: build.siteId,
  dynamicUrl: build.dynamicUrl,
}))(Manifest);
