import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import PrevIcon from 'react-icons/lib/fa/angle-left';
import NextIcon from 'react-icons/lib/fa/angle-right';
import Share from './Share';
import Button from './Button';

const Nav = ({ previousItem, nextItem }) => (
  <Container>
    <PrevButton item={previousItem} icon={PrevIcon} text="Prev" />
    <Share />
    <NextButton item={nextItem} icon={NextIcon} text="Next" />
  </Container>
);

Nav.propTypes = {
  previousItem: PropTypes.shape({}),
  nextItem: PropTypes.shape({}),
};

Nav.defaultProps = {
  previousItem: null,
  nextItem: null,
};

export default inject(({ connection }) => {
  const {
    hasPreviousColumn,
    previousColumn,
    hasNextColumn,
    nextColumn,
  } = connection.selectedColumn;
  return {
    previousItem: hasPreviousColumn ? previousColumn.selectedItem : null,
    nextItem: hasNextColumn ? nextColumn.selectedItem : null,
  };
})(Nav);

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  box-sizing: padding-box;
  height: ${({ theme }) => theme.size.button};
  background-color: ${({ theme }) => theme.color.lightGrey};
  border-top: 1px solid ${({ theme }) => theme.color.grey};
  display: flex;
  justify-content: space-between;
`;

const PrevButton = styled(Button)`
  position: absolute;
  top: 0;
  left: 0;
`;

const NextButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
`;
