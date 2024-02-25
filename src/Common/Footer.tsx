import React from 'react';
import styled from 'styled-components';

import logo from '../Assets/img/ground.png';

const Background = styled.div`
  width: 100.5%;
  margin-left: -4px;
  height: 15rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  margin-top: 5rem;
  position: relative;
  background-color: #363636;
`;

const FooterWrap = styled.div`
  width: 70%;
  height: 6rem;
  display: flex;
  justify-content: left;
  margin-left: 2rem;
  flex-wrap: wrap;
  overflow: visible;
  position: relative;
  margin-top: 5rem;
`;

const FooterTitle = styled.div`
  width: 100%;
  height: 2rem;
  position: relative;
  color: #3ea88f;
  line-height: 1rem;
  font-weight: 2000;
  font-size: 2.4rem;
  text-align: left;
  overflow: visible;
  font-family: 'ESAM';
`;

const FooterText = styled.div`
  width: 100%;
  position: relative;
  color: #6a6a6a;
  font-weight: 2000;
  font-size: 1rem;
  text-align: left;
  overflow: visible;
`;

const Footer: React.FC = () => {
  return (
    <Background>
      <FooterWrap>
        <FooterTitle>킥오프</FooterTitle>
        <FooterText>Copyright © 2024. KICK OFF All Rights Reserved.</FooterText>
        <FooterText>dev.junhui@gmail.com</FooterText>
      </FooterWrap>
    </Background>
  );
};

export default Footer;
