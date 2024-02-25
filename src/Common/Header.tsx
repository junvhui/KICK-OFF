import React from 'react';
import styled from 'styled-components';

import logo from '../Assets/img/ground.png';
import { useNavigate } from 'react-router-dom';

const TitleWrap = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: visible;
  position: relative;
`;

const PostImage = styled.img`
  width: 11rem;
  max-height: 200px;
  object-fit: cover;
  transition: transform 0.5s;
  justify-content: center;
  cursor: pointer;

  &:hover {
    position: center;
    transform: scale(1.1); /* 이미지 확대 */
  }
`;
const Title = styled.div`
  width: 100%;
  height: 3rem;
  position: relative;
  color: #3ea88f;
  justify-content: center;
  line-height: 2rem;
  font-weight: 2000;
  font-size: 2.7rem;
  text-align: center;
  overflow: visible;
  font-family: 'ESAM';
`;

const Header = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate(`/`);
    location.reload();
  };

  return (
    <div>
      <TitleWrap>
        <PostImage src={logo} alt="Post Image" onClick={() => navigateHome()} />
        <Title>킥오프</Title>
      </TitleWrap>
    </div>
  );
};

export default Header;
