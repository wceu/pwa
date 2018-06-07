import React from 'react';
import LazyIframe from '../components/LazyIframe';
import { filter } from '../components/HtmlToReactConverter/filter';

export default {
  test: ({ tagName, ignore }) => tagName === 'iframe' && !ignore,
  converter: element => {
    const { attributes } = element;

    let height;

    if (attributes.height && attributes.width) {
      height = `${(attributes.height * 100) / attributes.width}vw`; // prettier-ignore
    } else {
      height = '120px';
    }

    return <LazyIframe width="100vw" height={height} attributes={filter(element.attributes)} />;
  },
};
