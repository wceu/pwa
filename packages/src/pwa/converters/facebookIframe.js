import React from 'react';
import LazyFacebookIframe from '../components/LazyFacebookIframe';
import { filter } from '../components/HtmlToReactConverter/filter';

const facebookVideo = /video.php\?href=([^&]+)/;

export default {
  test: ({ tagName, attributes, ignore }) =>
    tagName === 'iframe' && attributes.src.startsWith('https://www.facebook.com/') && !ignore,
  converter: element => {
    const { attributes } = element;


    const videoData = facebookVideo.exec(attributes.src);
    const isVideo = !!videoData;

    const href = isVideo ? decodeURIComponent(videoData[1]) : null;

    let height;

    if (attributes.height && attributes.width) {
      height = `${(attributes.height * 100) / attributes.width}vw`; // prettier-ignore
    } else {
      height = '120px';
    }

    return (
      <LazyFacebookIframe
        isVideo={isVideo}
        width="100vw"
        height={height}
        href={href}
        attributes={filter(element.attributes)}
      />
    );
  },
};
