import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import fastdom from 'fastdom';
import fdPromised from 'fastdom/extensions/fastdom-promised';
import { getScrollingElement } from '../../utils';

const fastdomPromised = fastdom.extend(fdPromised);

class Anchor extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const { scrollAndChangeRoute, hash } = this.props;
    scrollAndChangeRoute({ hash });
  }

  render() {
    const { hash, children, className } = this.props;
    return (
      <a className={className} href={hash} onClick={this.onClick}>
        {children}
      </a>
    );
  }
}

Anchor.propTypes = {
  hash: PropTypes.string.isRequired,
  scrollAndChangeRoute: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  className: PropTypes.string,
};

Anchor.defaultProps = {
  children: null,
  className: null,
};

const mapDispatchToProps = (dispatch, { item }) => {
  const routeChangeRequested = dep('connection', 'actions', 'routeChangeRequested');
  return {
    async scrollAndChangeRoute({ hash }) {
      const scrollingElement = await getScrollingElement();
      const element = window.document.querySelector(hash);
      let top;
      let scrollTop;
      await fastdomPromised.measure(() => {
        top = Math.floor(element.getBoundingClientRect().top);
        ({ scrollTop } = scrollingElement);
      });
      dispatch(routeChangeRequested({ selectedItem: item, method: 'push' }));
      await fastdomPromised.mutate(() => {
        if (scrollingElement.scrollBy) scrollingElement.scrollBy({ top, behavior: 'smooth' });
        else scrollingElement.scrollTop = scrollTop + top;
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(Anchor);
