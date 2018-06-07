import { css } from 'react-emotion';

export default {
  test: ({ tagName }) => tagName === 'a',
  process: (element, { state, theme }) => {
    let linkClass;

    if (state && state.settings.collection.theme.linkStyles) {
      const { linkStyles } = state.settings.collection.theme;

      linkClass = css`
        color: ${linkStyles.color};
        font-weight: ${linkStyles.bold ? 'bold' : 'normal'};
        text-decoration: ${linkStyles.underline ? 'underline' : 'none'};
      `;
    } else {
      linkClass = css`
        color: ${theme.colors.link};
        font-weight: normal;
        text-decoration: underline;
      `;
    }

    if (element.attributes.className) {
      element.attributes.className.push(linkClass);
    } else {
      element.attributes.className = [linkClass];
    }

    return element;
  },
};
