import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Slider from '../Slider';
import Post from './Post';
import TopBar from '../TopBar';
import Nav from '../Nav';

const Posts = ({ columns, selectedColumnIndex, handleOnTransitionEnd }) => (
  <Fragment>
    <Slider key="slider" index={selectedColumnIndex} onTransitionEnd={handleOnTransitionEnd}>
      {columns.map(({ index, selectedItem }) => {
        if (index > selectedColumnIndex + 1) return <div key={selectedItem.mstId} />;
        if (index < selectedColumnIndex - 1) return <div key={selectedItem.mstId} />;

        return <Post key={selectedItem.mstId} post={selectedItem} />;
      })}
    </Slider>
    <TopBar />
    <Nav />
  </Fragment>
);

Posts.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedColumnIndex: PropTypes.number.isRequired,
  handleOnTransitionEnd: PropTypes.func.isRequired,
};

export default Posts;
