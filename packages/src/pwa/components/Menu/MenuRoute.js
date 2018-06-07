import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import { homeContext, venueContext, announcementsContext, pageContext } from '../../contexts';
import Link from '../Link';
import {
  PAGE_HOME_ON_NOW,
  PAGE_VENUE_ALL,
  PAGE_MENU_COC,
  PAGE_MENU_MENUS,
} from '../../consts'

const routes = {
  'schedule': {
    type: 'page',
    id: PAGE_HOME_ON_NOW,
    context: homeContext,
    text: 'Schedule',
  },
  'venue-map': {
    type: 'page',
    id: PAGE_VENUE_ALL,
    context: venueContext,
  },
  announcements: {
    type: 'latest',
    id: 'post',
    page: 1,
    context: announcementsContext,
    text: 'Announcements',
  },
  menus: {
    type: 'page',
    id: PAGE_MENU_MENUS,
    context: pageContext({ id: PAGE_MENU_MENUS, title: 'Menus' }),
  },
  'code-of-conduct': {
    type: 'page',
    id: PAGE_MENU_COC,
    context: pageContext({ id: PAGE_MENU_COC, title: 'Code of Conduct' }),
  },
};

const MenuRoute = ({ type, id, page, context, text, closeMenu }) => (
  <Container onClick={closeMenu}>
    <Link type={type} id={id} page={page} context={context}>
      <A>{text}</A>
    </Link>
  </Container>
);

MenuRoute.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  page: PropTypes.number,
  context: PropTypes.shape({}).isRequired,
  text: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

MenuRoute.defaultProps = {
  page: null,
};

export default inject(({ connection, theme }, { name }) => {
  const { type, id, page, context, text } = routes[name];

  return {
    type,
    id,
    page,
    context,
    text: text || connection.entity(type, id).title,
    closeMenu: theme.menu.close,
  };
})(MenuRoute);

const Container = styled.div`
  box-sizing: border-box;
  height: ${({ theme }) => theme.size.button};
  box-shadow: inset 0 -1px 0 0 rgba(40, 36, 9, 0.1);
  font-size: 20px;
  line-height: 20px;
`;

const A = styled.a`
  box-sizing: border-box;
  height: ${({ theme }) => theme.size.button};
  padding: 16px 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${({ theme }) => theme.color.text};
`;
