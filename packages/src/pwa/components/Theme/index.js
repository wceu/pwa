import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { ThemeProvider } from 'emotion-theming';
import Home from '../Home';
import Title from './Title';
import Favicon from './Favicon';
import AppleMeta from './AppleMeta';
import Manifest from '../Manifest';
import Sessions from '../Sessions';
import Speakers from '../Speakers';
import Venues from '../Venues';
import Posts from '../Posts';
import Pages from '../Pages';
import Announcements from '../Announcements';

import '../../styles';

const theme = {
  color: {
    white: '#FFFFFF',
    black: '#282409',
    lightGrey: '#FBFBFA',
    grey: '#E9E9E6',
    darkGrey: '#A9A79C',
    red: '#F95758',
    yellow: '#EFDC39',
    blue: '#5566C3',
    text: '#282409',
    whiteText: '#FFFFFF',
    greyText: '#757361',
    lightGreyText: '#7E7C6B',
    switch: '#9B998E',
    facebook: '#3b5998',
    twitter: '#1da1f2',
    whatsapp: '#2cb742',
    email: '#7f7f7f',
    share: '#006ca0',
  },
  size: {
    button: '56px',
    cardHeader: '40px',
  },
  padding: {
    home: '80px 24px',
    schedule: '80px 0',
    venues: '80px 0',
    credits: '80px 0',
    scheduleItem: '16px 24px',
    cardBody: '16px',
    menuItem: '16px 24px',
  },
};

class Theme extends Component {
  constructor() {
    super();
    this.handleOnTransitionEnd = this.handleOnTransitionEnd.bind(this);
  }

  handleOnTransitionEnd({ index, fromProps }) {
    if (fromProps) return;
    const { routeChangeRequested, columns } = this.props;
    const { type, id } = columns[index].selectedItem;
    routeChangeRequested({
      selectedItem: {
        type,
        id,
      },
      method: 'push',
    });
  }

  render() {
    const { contextName, columns, selectedColumnIndex } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <Title />
          <Favicon />
          <AppleMeta />
          <Manifest />
          {contextName === 'home' && (
            <Home
              columns={columns}
              selectedColumnIndex={selectedColumnIndex}
              handleOnTransitionEnd={this.handleOnTransitionEnd}
            />
          )}
          {contextName === 'sessions' && (
            <Sessions
              columns={columns}
              selectedColumnIndex={selectedColumnIndex}
              handleOnTransitionEnd={this.handleOnTransitionEnd}
            />
          )}
          {contextName === 'speakers' && (
            <Speakers
              columns={columns}
              selectedColumnIndex={selectedColumnIndex}
              handleOnTransitionEnd={this.handleOnTransitionEnd}
            />
          )}
          {contextName === 'venues' && (
            <Venues
              columns={columns}
              selectedColumnIndex={selectedColumnIndex}
              handleOnTransitionEnd={this.handleOnTransitionEnd}
            />
          )}
          {contextName === 'posts' && (
            <Posts
              columns={columns}
              selectedColumnIndex={selectedColumnIndex}
              handleOnTransitionEnd={this.handleOnTransitionEnd}
            />
          )}
          {contextName === 'page' && <Pages />}
          {contextName === 'announcements' && <Announcements />}
        </Fragment>
      </ThemeProvider>
    );
  }
}

Theme.propTypes = {
  contextName: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedColumnIndex: PropTypes.number.isRequired,
  routeChangeRequested: PropTypes.func.isRequired,
};

export default inject(({ connection }) => ({
  routeChangeRequested: connection.routeChangeRequested,
  contextName: connection.selectedContext.options.name,
  columns: connection.selectedContext.columns,
  selectedColumnIndex: connection.selectedColumn.index,
}))(Theme);
