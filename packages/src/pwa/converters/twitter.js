import React from 'react';
import LazyTweet from '../components/LazyTweet';
import { getTweetId } from '../utils';

export default {
  test: ({ tagName, attributes, ignore }) =>
    tagName === 'blockquote' &&
    attributes.className &&
    attributes.className.includes('twitter-tweet') &&
    !ignore,
  converter: element => {
    const { ...rest } = element;
    const height = 'auto';
    const width = '100%';

    // Sets current element as its child
    element.children = [{ ...rest, ignore: true }];
    const tweetId = getTweetId(element.children);

    return children => (
      <LazyTweet
        key={`tweet${tweetId}`}
        width={width}
        height={height}
        throttle={50}
        tweetId={tweetId}
      >
        {children}
      </LazyTweet>
    );
  },
};
