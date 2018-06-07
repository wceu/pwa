import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Content from '../Content';

const Page = ({ content }) => (
  <Container>
    <Content content={content} padding={24} />
  </Container>
);

Page.propTypes = {
  content: PropTypes.string.isRequired,
};

export default inject((_, { entity }) => ({
  content: entity.content,
}))(Page);

const Container = styled.div`
  box-sizing: border-box;
  padding: 80px 0;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
