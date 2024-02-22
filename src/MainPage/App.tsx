import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import madridBtn from '../Assets/img/madrid.png';
import manchesterBtn from '../Assets/img/manchester.png';
import bayernBtn from '../Assets/img/bayern.png';
import mancityBtn from '../Assets/img/mancity.png';
import parisBtn from '../Assets/img/paris.png';
import tottenhamBtn from '../Assets/img/tottenham.png';
import List from './List';
import Rank from './Rank';
import Transfer from './Transfer';

interface ContentsImgProps {
  imageUrl: string;
}

const Background = styled.div`
  width: 100%;
  height: 100%;
  display: block;
  font-size: 16px;
  font-family: 'ESAM';
`;

const Title = styled.div`
  margin-top: 5rem;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-weight: 500;
  font-size: 1.5rem;
  font-family: 'SUITE';
  color: #e9e8e8;

  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const ContentsWrap = styled.div`
  width: 100%;
  height: 14rem;
  display: flex;
  justify-content: center;
  font-size: 16px;
  flex-wrap: wrap;
  overflow: visible;
  margin-top: 1rem;
  transition: transform 0.7s;
  position: relative;
  flex-wrap: nowrap;
  font-family: 'SUITE';

  @media (max-width: 900px) {
    overflow: visible;
    transform: scale(0.95);
    flex-wrap: wrap;
  }

  @media (max-width: 600px) {
    transform: scale(0.7);
    width: 35rem;
    margin-left: -6rem;
  }
`;

const ContentsImg = styled.div<ContentsImgProps>`
  opacity: 1;
  width: 11rem;
  margin-top: 2rem;
  height: 9rem;
  border-radius: 1rem;
  background-position: center 0;
  background-size: ${(props) => (props.imageUrl === tottenhamBtn ? '3.5rem 6rem' : '6rem 5.5rem')};
  background-image: url(${(props) => props.imageUrl});
  background-repeat: no-repeat;
  transition: transform 0.5s;
  justify-content: center;
  cursor: pointer;
  overflow: visible;

  &:hover {
    position: center;
    opacity: 0.75;
    transform: scale(1.1); /* 이미지 확대 */
  }
`;
const SearchWrap = styled.div`
  width: 100%;
  height: 6rem;
  margin-top: 1rem;
  font-size: 1rem;
  justify-content: center;
  display: flex;
`;

const SearchInput = styled.input`
  width: 40%;
  height: 2rem;
  margin-top: 1rem;
  padding: 1.3rem;
  color: white;
  border: 1.5px solid #5a5a5a;
  border-radius: 1rem;
  font-size: 1.1rem;
  font-family: 'SUITE';
  background-color: #414141;
`;

const Name = styled.div`
  margin-top: 7.5rem;
  width: 100%;
  overflow: visible;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: #ebebeb;
  font-size: 1rem;
  font-family: 'ESAM';
`;

const BottomBackground = styled.div`
  width: 67%;
  height: 100%;
  margin-left: 16%;
  margin-top: -2rem;
  position: static;
  display: flex;

  @media (max-width: 900px) {
    margin-top: 4rem;
  }
  @media (max-width: 550px) {
    margin-top: 15rem;
  }
`;

const FlexContainer = styled.div`
  display: flex;
`;

const ListWrapper = styled.div`
  flex-grow: 7;
`;

const RankWrapper = styled.div`
  flex-grow: 3;
  margin-left: 2rem;
`;

const Content = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    setSelectedTeam(searchTerm); // Set selected team as the search term
    navigate(`/?team=${encodeURIComponent(searchTerm.replace(/ /g, ''))}`); // Navigate to the search term
  };

  const navigate = useNavigate();

  const handleTeamClick = (team: string) => {
    setSelectedTeam(team);
    navigate(`/?team=${team}`);
  };

  useEffect(() => {}, [selectedTeam]);

  return (
    <div>
      <Background>
        <Title>인기 팀의 이적 정보를 한눈에 살펴보세요!</Title>
        <SearchWrap>
          <SearchInput
            type="text"
            placeholder="검색어를 입력해주세요."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </SearchWrap>

        <ContentsWrap>
          <ContentsImg imageUrl={madridBtn} onClick={() => handleTeamClick('레알마드리드')}>
            <Name>레알 마드리드</Name>
          </ContentsImg>
          <ContentsImg imageUrl={manchesterBtn} onClick={() => handleTeamClick('맨유')}>
            <Name>맨체스터 유나이티드</Name>
          </ContentsImg>
          <ContentsImg imageUrl={bayernBtn} onClick={() => handleTeamClick('바이에른뮌헨')}>
            <Name>바이에른 뮌헨</Name>
          </ContentsImg>
          <ContentsImg imageUrl={mancityBtn} onClick={() => handleTeamClick('맨시티')}>
            <Name>맨체스터 시티</Name>
          </ContentsImg>
          <ContentsImg imageUrl={tottenhamBtn} onClick={() => handleTeamClick('토트넘')}>
            <Name>토트넘 핫스퍼</Name>
          </ContentsImg>
          <ContentsImg imageUrl={parisBtn} onClick={() => handleTeamClick('파리생제르망')}>
            <Name>파리 생제르망</Name>
          </ContentsImg>
        </ContentsWrap>
      </Background>
      <BottomBackground>
        <FlexContainer>
          <ListWrapper>
            <List />
          </ListWrapper>
          <RankWrapper>
            <Transfer />
            <Rank />
          </RankWrapper>
        </FlexContainer>
      </BottomBackground>
    </div>
  );
};

export default Content;
