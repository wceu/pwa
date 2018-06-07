import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TopBar from '../TopBar';
import Slider from '../Slider';
import Venue from './Venue';
import Nav from '../Nav';

const Venues = ({ columns, selectedColumnIndex, handleOnTransitionEnd }) => (
  <Fragment>
    <Slider key="slider" index={selectedColumnIndex} onTransitionEnd={handleOnTransitionEnd}>
      {columns.map(({ selectedItem }) => <Venue key={selectedItem.mstId} venue={selectedItem} />)}
    </Slider>
    <TopBar />
    <Nav />
  </Fragment>
);

Venues.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedColumnIndex: PropTypes.number.isRequired,
  handleOnTransitionEnd: PropTypes.func.isRequired,
};

export default Venues;
