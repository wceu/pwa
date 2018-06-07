import React from 'react';
import LazyVideo from '../components/LazyVideo';
import { filter } from '../components/HtmlToReactConverter/filter';

export default {
  test: ({ tagName }) => tagName === 'video',
  converter: element => {
    const { attributes } = element;

    let height;

    if (attributes.height && attributes.width) {
      height = `${(attributes.height * 100) / attributes.width}vw`; // prettier-ignore
    } else {
      height = '120px';
    }

    return children => (
      <LazyVideo width="100vw" height={height} throttle={50} attributes={filter(attributes)}>
        {children}
      </LazyVideo>
    );
  },
};
