/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import he from 'he';
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  // EmailShareButton,
} from 'react-share';
// import EmailIcon from 'react-icons/lib/fa/envelope-o';
import FacebookIcon from 'react-icons/lib/fa/facebook-official';
import TwitterIcon from 'react-icons/lib/fa/twitter';
import WhatsappIcon from 'react-icons/lib/fa/whatsapp';
import LinkedinIcon from 'react-icons/lib/fa/linkedin-square';

const Share = ({ link, title }) => (
  <Container>
    <FacebookShareButton url={link} quote={title}>
      <ShareButton>
        <FacebookIcon size={28} />
      </ShareButton>
    </FacebookShareButton>
    <TwitterShareButton url={link} title={title}>
      <ShareButton>
        <TwitterIcon size={28} />
      </ShareButton>
    </TwitterShareButton>
    <LinkedinShareButton url={link} title={title}>
      <ShareButton>
        <LinkedinIcon size={28} />
      </ShareButton>
    </LinkedinShareButton>
    <WhatsappShareButton url={link} title={title}>
      <ShareButton>
        <WhatsappIcon size={28} />
      </ShareButton>
    </WhatsappShareButton>
    {/* <EmailShareButton url={link} subject={title} body={`${title}\n${link}`}>
      <Button>
        <EmailIcon size={28} />
      </Button>
    </EmailShareButton> */}
  </Container>
);

Share.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default inject(({ connection }) => ({
  title: he.unescape(connection.selectedItem.entity.title),
  link: connection.selectedItem.entity.link,
}))(Share);

const Container = styled.div`
  box-sizing: border-box;
  width: auto;
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.size.button};
`;

const ShareButton = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 4px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.color.grey};
  color: ${({ theme }) => theme.color.darkGrey};
  display: flex;
  justify-content: center;
  align-items: center;
`;
