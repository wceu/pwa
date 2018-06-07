import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Slider from '../Slider';
import Speaker from './Speaker';
import TopBar from '../TopBar';
import Nav from '../Nav';

const Speakers = ({ columns, selectedColumnIndex, handleOnTransitionEnd }) => (
  <Fragment>
    <Slider key="slider" index={selectedColumnIndex} onTransitionEnd={handleOnTransitionEnd}>
      {columns.map(({ index, selectedItem }) => {
        if (index > selectedColumnIndex + 1) return <div key={selectedItem.mstId} />;
        if (index < selectedColumnIndex - 1) return <div key={selectedItem.mstId} />;

        return <Speaker key={selectedItem.mstId} item={selectedItem} />;
      })}
    </Slider>
    <TopBar />
    <Nav />
  </Fragment>
);

Speakers.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedColumnIndex: PropTypes.number.isRequired,
  handleOnTransitionEnd: PropTypes.func.isRequired,
};

export default Speakers;
