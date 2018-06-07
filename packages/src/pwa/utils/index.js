import moment from 'moment-timezone';

export const TIMEZONE = 'Europe/Belgrade';

export const formatDate = (date, formatString) =>
  moment(date.toISOString())
    .tz(TIMEZONE)
    .format(formatString);

// This function iterates the element object recursively until it finds an 'Element'
// with tagName 'a' and its 'href' attribute matches a RegExp that captures a tweet ID.
export const getTweetId = children => {
  if (!children) return '';

  const results = [];

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];

    if (child.type === 'Element' && child.tagName === 'a') {
      const match = child.attributes.href.match(/\/status\/(\d+)/);

      if (match) return match[1];
    }

    if (child.children) results.push(getTweetId(child.children));
  }

  return results.reduce((result, current) => current || result, '');
};

// This function iterates the element object recursively until it finds an 'Element'
// with tagName 'a' and its 'href' attribute matches a RegExp that captures an instagram ID.
export const getInstagramId = children => {
  if (!children) return '';

  const results = [];

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];

    if (child.type === 'Element' && child.tagName === 'a') {
      const match = child.attributes.href.match(/https:\/\/www\.instagram\.com\/p\/([\w\d]+)/);

      if (match) return match[1];
    }

    if (child.children) results.push(getInstagramId(child.children));
  }

  return results.reduce((result, current) => current || result, '');
};
