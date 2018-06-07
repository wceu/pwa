import React from 'react';
import Anchor from '../components/Anchor';

export default {
  test: ({ tagName, attributes }) =>
    tagName === 'a' && attributes.href && /^#(\S+)/.test(attributes.href),
  converter: (element, { extraProps }) => {
    const { attributes: { href, className } } = element;

    return children => (
      <Anchor
        key={href}
        hash={href}
        item={extraProps.item}
        className={className && className.join(' ')}
      >
        {children}
      </Anchor>
    );
  },
};
