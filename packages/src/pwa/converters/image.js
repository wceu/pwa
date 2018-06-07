import React from 'react';
import he from 'he';
import Image from '../components/Image';

export default {
  test: element => {
    const { tagName, ignore } = element;
    // Returns false if it's already a lazy component.
    if (ignore) return false;

    // Returns true if element is an <img>.
    if (tagName === 'img') return true;

    // Filters comments out of children.
    return false;
  },
  converter: element => {
    const { attributes } = element;
    const { alt, srcset, width, height } = attributes;

    // Return an Image component with id if image has attachedId.
    if (attributes.dataset && attributes.dataset.attachmentId) {
      const attachmentId = parseInt(attributes.dataset.attachmentId, 10);

      return (
        <Image
          key={attachmentId}
          id={attachmentId}
          width={width ? `${width}px` : null}
          height={height ? `${height}px` : null}
        />
      );
    }

    let src;

    // Get src attribute from different cases or assign an empty string.
    if (attributes.src && typeof attributes.src === 'string') {
      ({ src } = attributes);
    } else if (
      attributes.dataset &&
      attributes.dataset.original &&
      typeof attributes.dataset.original === 'string'
    ) {
      src = attributes.dataset.original;
    } else {
      src = '';
    }

    return (
      <Image
        key={src}
        alt={alt}
        src={he.decode(src)}
        srcSet={srcset ? he.decode(srcset) : null}
        width={width ? `${width}px` : null}
        height={height ? `${height}px` : null}
      />
    );
  },
};
