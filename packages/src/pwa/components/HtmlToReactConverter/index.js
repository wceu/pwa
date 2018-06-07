import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { parse } from 'himalaya';
import he from 'he';
import { flow, camelCase, capitalize } from 'lodash';

import injector from './injector';
import { filter } from './filter';

// Adapts the new Himalaya AST Specification v1
// to the old Himalaya AST Specification v0, used by converters and processors.
// See https://github.com/andrejewski/himalaya/blob/v1.0.1/text/ast-spec-v1.md
// and https://github.com/andrejewski/himalaya/blob/v1.0.1/text/ast-spec-v0.md
const adaptNode = element => {
  const isData = /^data-(.*)/;
  const attributes = {};
  element.type = capitalize(element.type);
  if (element.attributes && element.attributes.length > 0) {
    element.attributes.forEach(({ key, value }) => {
      const match = isData.exec(key);
      if (key === 'class') {
        attributes.className = value.split(' ');
      } else if (match) {
        if (!attributes.dataset) attributes.dataset = {};
        attributes.dataset[camelCase(match[1])] = value;
      } else attributes[key] = value;
    });
    element.attributes = attributes;
  } else {
    element.attributes = {};
  }
  return element;
};

const adaptNodes = nodes =>
  nodes.map(n => {
    if (n.children) n.children = adaptNodes(n.children);
    return adaptNode(n);
  });

class HtmlToReactConverter extends React.Component {
  static propTypes = {
    html: PropTypes.string.isRequired,
    theme: PropTypes.shape({}),
    state: PropTypes.shape({}),
    adsConfig: PropTypes.shape({}),
    elementsToInject: PropTypes.arrayOf(PropTypes.shape({})),
    processors: PropTypes.arrayOf(PropTypes.shape({})),
    converters: PropTypes.arrayOf(PropTypes.shape({})),
    extraProps: PropTypes.shape({}),
  };

  static defaultProps = {
    theme: {},
    state: {},
    adsConfig: null,
    elementsToInject: [],
    processors: [],
    converters: [],
    extraProps: {},
  };

  constructor(props) {
    super(props);

    this.process = flow(
      props.processors.map(({ test, process }) => element => {
        const { extraProps, state, theme } = this.props;
        try {
          return test(element) ? process(element, { extraProps, state, theme }) : element;
        } catch (e) {
          return element;
        }
      }),
    ).bind(this);

    this.convert = this.convert.bind(this);
    this.handleNode = this.handleNode.bind(this);
  }

  convert(element) {
    const { converters, extraProps, state, theme } = this.props;
    try {
      const match = converters.find(({ test }) => test(element));
      return match ? match.converter(element, { extraProps, state, theme }) : element;
    } catch (e) {
      return element;
    }
  }

  handleNode({ element, index }) {
    let { extraProps } = this.props;

    // If element is already a react element, return element.
    if (React.isValidElement(element)) return element;

    // If element is an array of react elements, return element.
    if (element instanceof Array && element.every(React.isValidElement)) return element;


    // Process element
    const e = this.process(element);
    // Applies conversion if needed
    const conversion = this.convert(e);
    const requiresChildren = typeof conversion === 'function';
    const converted = e !== conversion;

    const handleNodes = nodes =>
      nodes.length === 1
        ? this.handleNode({ element: nodes[0], index: 0 })
        : nodes.map((el, i) => this.handleNode({ element: el, index: i }));

    // Removes extraProps for HTML components
    if (typeof e.tagName !== 'function') extraProps = {};

    switch (e.type) {
      case 'Element': {
        if (e.tagName === 'head') {
          return null;
        }

        if (['!doctype', 'html', 'body'].includes(e.tagName)) {
          return e.children.map((el, i) => this.handleNode({ element: el, index: i }));
        }

        if (converted) {
          return (
            <Fragment key={index}>
              {requiresChildren ? conversion(handleNodes(e.children)) : conversion}
            </Fragment>
          );
        } else if (e.children && e.children.length > 0) {
          return (
            <e.tagName {...filter(e.attributes)} {...extraProps} key={index}>
              {e.children.length > 1
                ? handleNodes(e.children)
                : this.handleNode({ element: e.children[0] })}
            </e.tagName>
          );
        }
        return <e.tagName {...filter(e.attributes)} {...extraProps} key={index} />;
      }
      case 'Text':
        return he.decode(e.content);
      default:
        return null;
    }
  }

  render() {
    const { html, elementsToInject } = this.props;
    const htmlTree = adaptNodes(parse(html));

    // toInject should be an array of elements to place along the content.
    if (elementsToInject) injector({ htmlTree, elementsToInject });

    return htmlTree.map((element, index) => this.handleNode({ element, index }));
  }
}

export default HtmlToReactConverter;
