import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled, { keyframes } from 'react-emotion';
import FetchingIcon from 'react-icons/lib/fa/refresh';

class Refresh extends Component {
  constructor() {
    super();
    this.state = { isClicked: false };
    this.getFirstPage = this.getFirstPage.bind(this);
    this.unclick = this.unclick.bind(this);
  }

  componentDidMount() {
    this.getFirstPage();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  getFirstPage() {
    const { type, id, fetchListPage, isFetching } = this.props;
    if (!isFetching) fetchListPage({ type, id, page: 1, force: true });
    this.setState({ isClicked: true });

    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.unclick, 500);
  }

  unclick() {
    this.setState({ isClicked: false });
  }

  render() {
    const isFetching = this.props.isFetching || this.state.isClicked;
    return (
      <Button onClick={this.getFirstPage} isFetching={isFetching}>
        <Text>{isFetching ? 'Refreshing' : 'Refresh'}</Text>
        <Icon />
      </Button>
    );
  }
}

Refresh.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchListPage: PropTypes.func.isRequired,
};

export default inject(({ connection }, { list }) => ({
  type: list.type,
  id: list.id,
  isFetching: list.isFetching,
  fetchListPage: connection.fetchListPage,
}))(Refresh);

const spinner = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Button = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  color: ${({ isFetching }) => (isFetching ? '#282409' : '#5566C3')};
  background: ${({ isFetching }) => (isFetching ? '#FCF8D7' : 'white')};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  box-shadow: ${({ isFetching }) => (isFetching ? 'none' : 'inset 0 -1px 0 0 #E9E9E6')};

  svg {
    animation: ${({ isFetching }) => (isFetching ? `${spinner} 1s ease infinite` : 'none')};
  }
`;

const Text = styled.div`
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 24px;
  padding-right: 8px;
`;

const Icon = styled(FetchingIcon)`
  width: 20px;
  height: 20px;
  color: #5566c3;
`;
