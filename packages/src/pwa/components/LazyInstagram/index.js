import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from '@frontity/lazyload';
import IconInstagram from 'react-icons/lib/fa/instagram';
import styled from 'react-emotion';

class LazyInstagram extends Component {
  static propTypes = {
    children: PropTypes.shape({}).isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
  };

  constructor() {
    super();

    this.ref = null;
    this.state = {
      loaded: false,
    };

    this.handleContentVisible = this.handleContentVisible.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.loaded !== nextState.loaded;
  }

  componentWillUpdate() {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else if (!window.document.getElementById('lazy-instagram')) {
      const script = window.document.createElement('script');
      script.id = 'lazy-instagram';
      script.src = '//platform.instagram.com/en_US/embeds.js';
      script.async = true;
      script.defer = true;
      script.chartset = 'utf-8';
      script.onload = () => window.instgrm.Embeds.process();

      window.document.body.appendChild(script);
    }
  }

  handleContentVisible() {
    this.setState({
      loaded: true,
    });
  }

  render() {
    const { children, width, height } = this.props;
    const { loaded } = this.state;

    return (
      <Container
        styles={{ height, width }}
        innerRef={node => {
          this.ref = node;
        }}
      >
        {!loaded && (
          <Icon>
            <IconInstagram size={40} />
          </Icon>
        )}
        <StyledLazyLoad
          offsetVertical={2000}
          offsetHorizontal={-10}
          throttle={50}
          onContentVisible={this.handleContentVisible}
        >
          {children}
        </StyledLazyLoad>
      </Container>
    );
  }
}

export default LazyInstagram;

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: ${({ styles }) => styles.width};
  height: ${({ styles }) => styles.height};
  min-height: 170px;
  margin: 15px 0;

  blockquote {
    margin: 0;
  }

  amp-instagram,
  iframe {
    box-sizing: border-box;
    width: 100%;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
  }
`;

const Icon = styled.div`
  position: absolute;
  top: 65px;
  left: 0;
  color: #bdbdbd;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLazyLoad = styled(LazyLoad)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  background-color: transparent;
  border: none;
  z-index: 10;
`;
