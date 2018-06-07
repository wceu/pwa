import React from 'react';
import LazyYoutube from '../components/LazyYoutube';
import { filter } from '../components/HtmlToReactConverter/filter';

export default {
  test: ({ tagName, attributes }) => tagName === 'iframe' && /youtube/.test(attributes.src),
  converter: element => {
    const { attributes } = element;

    let height;

    if (attributes.height && attributes.width) {
      height = `${(attributes.height * 100) / attributes.width}vw`; // prettier-ignore
    } else {
      height = '120px';
    }

    const match =
      attributes.src.match(/\/embed\/([\d\w]+)/) || attributes.src.match(/\/([\w-]+?)\?/);

    const youtubeId = match ? match[1] : null;

    return (
      <LazyYoutube
        key={`youtube${youtubeId}`}
        width="100vw"
        height={height}
        youtubeId={youtubeId}
        attributes={filter(element.attributes)}
      />
    );
  },
};
