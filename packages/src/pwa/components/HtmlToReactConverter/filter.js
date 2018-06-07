import htmlMap from './htmlMap';
import svgMap from './svgMap';

const allMap = { ...htmlMap, ...svgMap };

const camelCaseToDash = str => str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);

export const replaceDataAttrs = dataset => {
  const toReturn = {};
  if (dataset) {
    Object.entries(dataset).forEach(([key, value]) => {
      toReturn[`data-${camelCaseToDash(key)}`] = value;
    });
  }
  return toReturn;
};

export const replaceAttrs = attributes => {
  const toReturn = {};
  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      if (!(/^on/.test(key) && typeof value === 'string')) {
        // ignores 'onEvent' attributes
        const newKey = allMap[key.toLowerCase()];
        toReturn[newKey && newKey !== key ? newKey : key] =
          value instanceof Array ? value.join(' ') : value;
      }
    });
  }
  return toReturn;
};

export const filterAllow = allow => {
  if (allow) {
    return allow
      .split(';')
      .map(i => i.trim())
      .filter(i => i !== 'autoplay')
      .join('; ');
  }

  return allow;
};

export const filter = (attributes = {}) => {
  const { dataset, allow, controls, ...others } = attributes;
  return { ...replaceDataAttrs(dataset), ...replaceAttrs(others) };
};
