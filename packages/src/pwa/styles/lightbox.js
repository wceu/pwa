import { injectGlobal } from 'react-emotion';

export default injectGlobal`
  .lightbox {

    .ril-toolbar {
      height: 54px;

      .ril-toolbar-right,
      .ril-toolbar-right > li {
        padding: 0;
        height: 54px;
        width: 54px;

        .ril-close {
          box-sizing: border-box;
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 50;
          color: inherit;
          opacity: 1;
        }
      }
    }
  }
`;
