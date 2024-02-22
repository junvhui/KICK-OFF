import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios'; // axios import 추가
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import lin from '../Assets/img/Lin.png';

interface PostProps {
  name: string;
  team: string;
  current: string;
  pre: string;
  preImg: string;
  currentImg: string;
  playerImg: string;
  league: string;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 135%;
  margin-top: 1.7rem;
  margin-left: -1.5rem;
  @media (max-width: 600px) {
    display: none;
  }
`;

const Content = styled.div`
  max-width: 600px;
  width: 110%;
  min-width: 260px;
  margin: 0 5%;
  margin-top: 10%;
  transition: 0.3s ease;

  @media screen and (max-width: 512px) {
    margin: 0 4%;
    margin-top: 5%;
  }
`;

// 기본 탭 상태
const Tabs = styled.div`
  background-image: linear-gradient(135deg, #4f5052 0%, #4f5052 100%);
  display: flex;
  width: 100%;
  align-items: center;
  height: 75px;
  border-radius: 1rem 1rem 0px 0px;
  color: white;
`;

const TabButton = styled.button<{ isActive: boolean }>`
  background: ${({ isActive }) =>
    isActive ? 'linear-gradient(135deg, #3c8e73 0%, #165241 100%)' : 'transparent'};
  color: ${({ isActive }) => (isActive ? 'white' : 'inherit')};
  border: none;
  outline: none;
  cursor: pointer;
  width: 100%;
  height: ${({ isActive }) => (isActive ? '78px' : '75px')};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  transition: 0.3s ease;
  font-family: 'ESAM';
  border-radius: 1rem 1rem 0px 0px;

  //버튼 hover 초록 효과
  &:before {
    background-image: linear-gradient(135deg, #3c8e73 0%, #165241 100%);
    content: '';
    width: 95%;
    border-radius: 1rem 1rem 0rem 0rem;
    height: ${({ isActive }) => (isActive ? '0px' : '0px')};
    position: absolute;
    top: 0.1rem;
    margin-left: 0.06rem;
    transition: 0.3s ease-in-out;
    z-index: 2;
  }

  &:hover::before {
    height: ${({ isActive }) => (isActive ? '90%' : '0')};
    z-index: 2;
    bottom: 0;
    border-radius: 1rem 1rem 0rem 0rem;
  }

  // Title
  p {
    opacity: ${({ isActive }) => (isActive ? '1' : '1')};
    display: flex;
    width: 4rem;
    height: 1rem;
    align-items: center;
    justify-content: center;
    z-index: 2;
    transition: 0.5s ease;
    padding: 0;
    margin: 0;
    color: ${({ isActive }) => (isActive ? 'white' : '#757575')};

    backface-visibility: hidden;
    font-weight: 400;
    font-family: 'ESAM';
  }

  &:hover p {
    color: white;
    opacity: 1;

    @media screen and (max-width: 512px) {
      color: #686868;
      opacity: 0.6;
    }
  }
`;

const TabContent = styled.div<{ isActive: boolean }>`
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
`;

const WrapperTabContent = styled.div`
  background-color: #484747;
  justify-content: center;

  display: flex;

  z-index: -3;
  position: relative;
  opacity: 1;
  padding: 20px 40px;
  overflow: hidden;
  transition: all 1s ease;
  top: 0;
  border-radius: 0rem 0rem 1rem 1rem;
  font-family: 'ESAM';
`;

const Container = styled.div`
  justify-content: center;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  margin-left: -5rem;
`;

const PlayerWrap = styled.div`
  width: 6rem;
  justify-content: center;
  margin-top: 1.05rem;
  margin-left: 2rem;
  margin-right: -1rem;
`;

const PlayerImage = styled.img`
  margin-left: 1rem;
  width: 3.5rem;
  height: 3.5rem;
  background-image: url(${lin});
  background-size: 100% 110%;
  border: 2px solid #757575;
  background-color: #bebebe;
  background-repeat: no-repeat;
  cursor: pointer;
  border-radius: 3rem;

  &:hover {
    background-color: #e5e5e5;
  }
`;

const PlayerName = styled.h2`
  font-size: 14px;
  width: 100%;
  height: 12%;
  margin-top: -0.1px;
  margin-left: -0.2rem;
  justify-content: center;
  display: flex;
  color: #4dbca2;
  justify-content: center;
  display: flex;
`;

const TeamWrap = styled.div`
  width: 6rem;
  justify-content: center;
  margin-top: 1rem;
  margin-left: 1.5rem;
`;

const TeamImage = styled.img`
  margin-left: 1rem;
  width: 3.5rem;
  height: 3.5rem;
  background-size: 100% 100%;
  background-color: #bebebe;
  background-repeat: no-repeat;
  border: 2px solid #757575;
  cursor: pointer;
  border-radius: 2rem;

  &:hover {
    background-color: #e5e5e5;
  }
`;

const TeamName = styled.h2`
  font-size: 14px;
  width: 105%;
  height: 12%;
  margin-top: -0.1px;
  color: #e2e2e2;
  justify-content: center;
  display: flex;
  margin-left: -0.3rem;
`;

const TabsComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('tab1');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // 순위 저장
  const [transferData, setTransferData] = useState<PostProps[]>([]);

  // 순위 정보 GET 요청
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/transfer');
        setTransferData(response.data.transfer);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  // overseas 데이터 필터링
  const overseasData = [];
  const koreaData = [];
  for (let i = 0; i < transferData.length; i++) {
    if (transferData[i].league === 'overseas') {
      overseasData.push(transferData[i]);
    } else {
      koreaData.push(transferData[i]);
    }
  }

  return (
    <Wrapper>
      <Content>
        <Tabs>
          <TabButton onClick={() => handleTabClick('tab1')} isActive={activeTab === 'tab1'}>
            <p data-title="Tab 1">해외리그 오피셜</p>
          </TabButton>
          <TabButton onClick={() => handleTabClick('tab2')} isActive={activeTab === 'tab2'}>
            <p data-title="Tab 2">국내리그 오피셜</p>
          </TabButton>
        </Tabs>
        <WrapperTabContent>
          <Container>
            {activeTab === 'tab1' &&
              overseasData.reverse().map((data, index) => (
                <Wrap key={index}>
                  <PlayerWrap>
                    <PlayerImage style={{ backgroundImage: `url(${data.playerImg})` }} />
                    <PlayerName>{data.name}</PlayerName>
                  </PlayerWrap>
                  <TeamWrap>
                    <TeamImage style={{ backgroundImage: `url(${data.preImg})` }} />
                    <TeamName>{data.pre}</TeamName>
                  </TeamWrap>
                  <ArrowForwardIosIcon
                    style={{
                      marginTop: '2.2rem',
                      marginRight: '-1.5rem',
                      marginLeft: '-.2rem',
                      color: '#4dbca2',
                    }}
                  />
                  <TeamWrap
                    style={{
                      marginRight: '-4rem',
                    }}
                  >
                    <TeamImage style={{ backgroundImage: `url(${data.currentImg})` }} />
                    <TeamName>{data.current}</TeamName>
                  </TeamWrap>
                </Wrap>
              ))}
            {/* 탭2(국내선수) */}
            {activeTab === 'tab2' && (
              <>
                {koreaData.reverse().map((data, index) => (
                  <Wrap key={index}>
                    <PlayerWrap>
                      <PlayerImage style={{ backgroundImage: `url(${data.playerImg})` }} />
                      <PlayerName>{data.name}</PlayerName>
                    </PlayerWrap>
                    <TeamWrap>
                      <TeamImage style={{ backgroundImage: `url(${data.preImg})` }} />
                      <TeamName>{data.pre}</TeamName>
                    </TeamWrap>
                    <ArrowForwardIosIcon
                      style={{
                        marginTop: '2.2rem',
                        marginRight: '-1.5rem',
                        marginLeft: '-.2rem',
                        color: '#4dbca2',
                      }}
                    />
                    <TeamWrap
                      style={{
                        marginRight: '-4rem',
                      }}
                    >
                      <TeamImage style={{ backgroundImage: `url(${data.currentImg})` }} />
                      <TeamName>{data.current}</TeamName>
                    </TeamWrap>
                  </Wrap>
                ))}
              </>
            )}
          </Container>
        </WrapperTabContent>
      </Content>
    </Wrapper>
  );
};

export default TabsComponent;
