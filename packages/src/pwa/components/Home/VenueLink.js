import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import Link from '../Link';
import { venueContext } from '../../contexts';
import * as consts from '../../consts';

const venueFromTrack = id => {
  if (id === consts.TRACK_MILKY_WAY) return consts.PAGE_VENUE_MILKY_WAY;
  if (id === consts.TRACK_ANDROMEDA) return consts.PAGE_VENUE_ANDROMEDA;
  if (id === consts.TRACK_HAYABUSA) return consts.PAGE_VENUE_HAYABUSA;
  if (id === consts.TRACK_CASSINI) return consts.PAGE_VENUE_CASSINI;
  if (id === consts.TRACK_ROSETTA) return consts.PAGE_VENUE_ROSETTA;
  return consts.PAGE_VENUE_ALL;
};

const VenueLink = ({ trackId, name }) => (
  <Link type="page" id={venueFromTrack(trackId)} context={venueContext}>
    <a>{name}</a>
  </Link>
);

VenueLink.propTypes = {
  trackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
};

VenueLink.defaultProps = {
  trackId: null,
};

export default inject(({ theme }, { trackId, name }) => ({
  name: trackId && theme.track(trackId) ? theme.track(trackId).name : name,
}))(VenueLink);
