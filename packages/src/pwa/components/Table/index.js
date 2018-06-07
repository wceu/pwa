import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Table = ({ children }) => (
  <Container className="table">
    <table>{children}</table>
  </Container>
);

Table.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Table;

const Container = styled.div`
  box-sizing: border-box;
  width: calc(100% - 30px);
  margin: 15px;
  overflow: auto;

  tr:nth-child(even) {
    background-color: #eee;
  }

  tr:nth-child(odd) {
    background-color: #fafafa;
  }

  td {
    border-spacing: 0;
    padding: 10px;
    text-align: center;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
