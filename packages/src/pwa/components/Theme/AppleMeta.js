import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Helmet } from 'react-helmet';

const AppleMeta = ({ icon120, icon180, startupImage, title, color }) => (
  <Helmet>
    <link rel="apple-touch-icon" href={icon120} />
    <link rel="apple-touch-icon" sizes="180x180" href={icon180} />
    <link rel="apple-touch-startup-image" href={startupImage} />
    <meta name="apple-mobile-web-app-title" content={title} />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content={color} />
  </Helmet>
);

AppleMeta.propTypes = {
  icon120: PropTypes.string.isRequired,
  icon180: PropTypes.string.isRequired,
  startupImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default inject(({ settings }) => ({
  icon120: `${settings.theme.manifest.iosIconSrc}?profile=ios-icon-120`,
  icon180: `${settings.theme.manifest.iosIconSrc}?profile=ios-icon-180`,
  startupImage: settings.theme.manifest.iosStartupImage,
  title: settings.theme.manifest.shortName,
  color: settings.theme.manifest.themeColor,
}))(AppleMeta);
