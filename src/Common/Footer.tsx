import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  width: 100.5%;
  margin-left: -4px;
  height: 15rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  position: relative;
  background-color: #363636;
`;

const Footer: React.FC = () => {
  return <Background></Background>;
};

export default Footer;
