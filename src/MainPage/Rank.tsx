import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'; // axios import 추가
import { useQuery } from 'react-query';
import { fetchRanks, fetchSeriaRanks, fetchLaRanks, fetchL1Ranks } from './Api';

interface PostProps {
  name: string;
  team: string;
  points: string;
  won: string;
  draw: string;
  lost: string;
  data: {};
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 135%;
  margin-top: 1.7rem;
  margin-left: -1.5rem;
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
    width: 90%;
    border-radius: 1rem 1rem 0rem 0rem;
    height: ${({ isActive }) => (isActive ? '0px' : '0px')};
    position: absolute;
    top: 0.15rem;
    margin-left: 0.2rem;
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
    width: 3rem;
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
  z-index: -3;
  position: relative;
  opacity: 1;
  overflow: hidden;
  transition: all 1s ease;
  padding: 2.5rem 1rem;
  top: 0;
  border-radius: 0rem 0rem 1rem 1rem;
  font-family: 'ESAM';
`;

const TeamWrap = styled.div`
  width: 100%;
  height: 1rem;
  display: flex;
  margin-left: 1rem;
`;

const TeamImage = styled.img`
  margin-left: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  background-size: 2.5rem 2.5rem;
  transition: transform 0.5s;
  background-color: #bebebe;
  background-repeat: no-repeat;
  cursor: pointer;
  border-radius: 0.6rem;

  &:hover {
    background-color: #e5e5e5;
  }
`;

const Team = styled.h2`
  font-size: 14px;
  width: 80%;
  height: 2%;
  margin-top: -2rem;
  margin-left: 4rem;
  border-radius: 1rem;
  color: #efefef;
`;

const Points = styled.h2`
  font-size: 14px;
  width: 40%;
  height: 2%;
  margin-top: -2rem;
  margin-left: 5rem;
  border-radius: 1rem;
  color: #dcdddd;
`;

const Rank: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('tab1');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // react-query Ranks 데이터 받아오기
  const { isLoading, data } = useQuery(['Ranks'], fetchRanks);
  if (data) {
    console.log(data);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    // 팀 별 데이터 저장
    const eplData = data[0].rank;
    console.log(eplData);
    const BL1Data = data[1].rank;
    const LaData = data[3].rank;
    const SaData = data[2].rank;
    const L1Data = data[4].rank;

    // -----------------------
    // EPL 팀 이름, 로고 추출
    // -----------------------
    const eplteamData = [];

    for (let i = 0; i < eplData.length; i++) {
      const name = eplData[i];
      const teams = {
        name: name.team.name,
        crest: name.team.crest,
      };
      eplteamData.push(teams);
    }

    // -----------------------
    // 분데스리가 팀 이름, 로고 추출
    // -----------------------
    const B1teamData = [];

    for (let i = 0; i < BL1Data.length; i++) {
      const name = BL1Data[i];
      const teams = {
        name: name.team.tla,
        crest: name.team.crest,
      };
      B1teamData.push(teams);
    }

    // -----------------------
    // 라리가 팀 이름, 로고 추출
    // -----------------------
    const LateamData = [];

    for (let i = 0; i < LaData.length; i++) {
      const name = LaData[i];
      const teams = {
        name: name.team.tla,
        crest: name.team.crest,
      };
      LateamData.push(teams);
    }
    console.log(LateamData);

    // -----------------------
    // 세리에 A 팀 이름, 로고 추출
    // -----------------------
    const SateamData = [];

    for (let i = 0; i < SaData.length; i++) {
      const name = SaData[i];
      const teams = {
        name: name.team.tla,
        crest: name.team.crest,
      };
      SateamData.push(teams);
    }
    console.log(SateamData);

    // -----------------------
    // 세리에 A 팀 이름, 로고 추출
    // -----------------------
    const L1teamData = [];

    for (let i = 0; i < L1Data.length; i++) {
      const name = L1Data[i];
      const teams = {
        name: name.team.tla,
        crest: name.team.crest,
      };
      L1teamData.push(teams);
    }
    console.log(L1teamData);

    return (
      <Wrapper>
        <Content>
          <Tabs>
            <TabButton onClick={() => handleTabClick('tab1')} isActive={activeTab === 'tab1'}>
              <p data-title="Tab 1">EPL</p>
            </TabButton>
            <TabButton onClick={() => handleTabClick('tab2')} isActive={activeTab === 'tab2'}>
              <p data-title="Tab 2">분데스리가</p>
            </TabButton>
            <TabButton onClick={() => handleTabClick('tab3')} isActive={activeTab === 'tab3'}>
              <p data-title="Tab 3">라리가</p>
            </TabButton>
            <TabButton onClick={() => handleTabClick('tab4')} isActive={activeTab === 'tab4'}>
              <p data-title="Tab 4">세리에 A</p>
            </TabButton>
            <TabButton onClick={() => handleTabClick('tab5')} isActive={activeTab === 'tab5'}>
              <p data-title="Tab 5">리그 1</p>
            </TabButton>
          </Tabs>
          <WrapperTabContent>
            <TabContent isActive={activeTab === 'tab1'}>
              <TeamWrap style={{ marginTop: '1rem', marginBottom: '-1rem' }}>
                <Team style={{ marginLeft: '0.8rem' }}>팀</Team>
                <Points style={{ color: '#4dbca2', marginLeft: '3.9rem' }}>승점</Points>
                <Points style={{ marginLeft: '0rem' }}>승</Points>
                <Points style={{ marginLeft: '-1rem' }}>무</Points>
                <Points style={{ marginLeft: '-1rem' }}>패</Points>
              </TeamWrap>

              {eplteamData.map((team, index) => (
                <div>
                  <TeamImage style={{ backgroundImage: `url(${team.crest})` }} />
                  <TeamWrap>
                    <Team key={index}>
                      {team.name === 'Liverpool FC'
                        ? '리버풀'
                        : team.name === 'Manchester City FC'
                        ? '맨시티'
                        : team.name === 'Arsenal FC'
                        ? '아스날'
                        : team.name === 'Tottenham Hotspur FC'
                        ? '토트넘'
                        : team.name === 'Aston Villa FC'
                        ? '아스톤빌라'
                        : team.name === 'Manchester United FC'
                        ? '맨유'
                        : team.name === 'Newcastle United FC'
                        ? '뉴캐슬'
                        : team.name === 'West Ham United FC'
                        ? '웨스트햄'
                        : team.name === 'Brighton & Hove Albion FC'
                        ? '브라이턴'
                        : team.name === 'Chelsea FC'
                        ? '첼시'
                        : team.name === 'Wolverhampton Wanderers FC'
                        ? '울버햄튼'
                        : team.name === 'Fulham FC'
                        ? '풀햄'
                        : team.name === 'AFC Bournemouth'
                        ? '본머스'
                        : team.name === 'Brentford FC'
                        ? '브렌트퍼드'
                        : team.name === 'Crystal Palace FC'
                        ? 'C. 팰리스'
                        : team.name === 'Nottingham Forest FC'
                        ? '노팅엄'
                        : team.name === 'Luton Town FC'
                        ? '루턴타운'
                        : team.name === 'Everton FC'
                        ? '에버턴'
                        : team.name === 'Burnley FC'
                        ? '번리'
                        : team.name === 'Sheffield United FC'
                        ? '셰필드'
                        : team.name}
                    </Team>
                    {eplData[index] && (
                      <>
                        <Points style={{ color: '#4dbca2', marginLeft: '1rem' }}>
                          {eplData[index].points}
                        </Points>
                        <Points style={{ marginLeft: '0rem' }}>{eplData[index].won}</Points>
                        <Points style={{ marginLeft: '-1rem' }}>{eplData[index].draw}</Points>
                        <Points style={{ marginLeft: '-1rem' }}>{eplData[index].lost}</Points>
                      </>
                    )}
                  </TeamWrap>
                </div>
              ))}
            </TabContent>
            <TabContent isActive={activeTab === 'tab2'}>
              <TeamWrap style={{ marginTop: '1rem', marginBottom: '-1rem' }}>
                <Team style={{ marginLeft: '0.8rem' }}>팀</Team>
                <Points style={{ color: '#4dbca2', marginLeft: '3.9rem' }}>승점</Points>
                <Points style={{ marginLeft: '0rem' }}>승</Points>
                <Points style={{ marginLeft: '-1rem' }}>무</Points>
                <Points style={{ marginLeft: '-1rem' }}>패</Points>
              </TeamWrap>

              {B1teamData.map((team, index) => (
                <div>
                  <TeamImage style={{ backgroundImage: `url(${team.crest})` }} />
                  <TeamWrap>
                    <Team key={index}>
                      {team.name === 'B04'
                        ? '레버쿠젠'
                        : team.name === 'FCB'
                        ? '바이에른 뮌헨'
                        : team.name === 'VFB'
                        ? '슈투트가르트'
                        : team.name === 'BVB'
                        ? '도르트문트'
                        : team.name === 'RBL'
                        ? '라이프치히'
                        : team.name === 'SGE'
                        ? '프랑크푸르트'
                        : team.name === 'SCF'
                        ? '프라이부르크'
                        : team.name === 'TSG'
                        ? '호펜하임'
                        : team.name === 'HEI'
                        ? '하이덴하임'
                        : team.name === 'SVW'
                        ? '베르더브레멘'
                        : team.name === 'FCA'
                        ? '아우크스부르크'
                        : team.name === 'WOB'
                        ? '볼프스부르크'
                        : team.name === 'BMG'
                        ? '묀헨글라트바흐'
                        : team.name === 'BOC'
                        ? '보훔'
                        : team.name === 'UNB'
                        ? '우니온 베를린'
                        : team.name === 'KOE'
                        ? '쾰른'
                        : team.name === 'M05'
                        ? '마인츠'
                        : team.name === 'SVD'
                        ? '다름슈타트'
                        : team.name}
                    </Team>
                    {BL1Data[index] && (
                      <>
                        <Points style={{ color: '#4dbca2', marginLeft: '1rem' }}>
                          {BL1Data[index].points}
                        </Points>
                        <Points style={{ marginLeft: '0rem' }}>{BL1Data[index].won}</Points>
                        <Points style={{ marginLeft: '-1rem' }}>{BL1Data[index].draw}</Points>
                        <Points style={{ marginLeft: '-1rem' }}>{BL1Data[index].lost}</Points>
                      </>
                    )}
                  </TeamWrap>
                </div>
              ))}
            </TabContent>
            <TabContent isActive={activeTab === 'tab3'}>
              <TeamWrap style={{ marginTop: '1rem', marginBottom: '-1rem' }}>
                <Team style={{ marginLeft: '0.8rem' }}>팀</Team>
                <Points style={{ color: '#4dbca2', marginLeft: '3.9rem' }}>승점</Points>
                <Points style={{ marginLeft: '0rem' }}>승</Points>
                <Points style={{ marginLeft: '-1rem' }}>무</Points>
                <Points style={{ marginLeft: '-1rem' }}>패</Points>
              </TeamWrap>

              {LateamData.map((team, index) => (
                <div>
                  <TeamImage style={{ backgroundImage: `url(${team.crest})` }} />
                  <TeamWrap>
                    <Team key={index}>
                      {team.name === 'RMA'
                        ? '레알 마드리드'
                        : team.name === 'GIR'
                        ? '지로나'
                        : team.name === 'FCB'
                        ? '바르셀로나'
                        : team.name === 'ATL'
                        ? 'AT 마드리드'
                        : team.name === 'ATH'
                        ? '빌바오'
                        : team.name === 'BET'
                        ? '레알 베티스'
                        : team.name === 'RSO'
                        ? '소시에다드'
                        : team.name === 'LPA'
                        ? '라스팔마스'
                        : team.name === 'VAL'
                        ? '발렌시아'
                        : team.name === 'GET'
                        ? '헤타페'
                        : team.name === 'OSA'
                        ? '오사수나'
                        : team.name === 'ALA'
                        ? '알라베스'
                        : team.name === 'VIL'
                        ? '비야레알'
                        : team.name === 'RAY'
                        ? '라요 바예카노'
                        : team.name === 'SEV'
                        ? '세비야'
                        : team.name === 'MAL'
                        ? '마요르카'
                        : team.name === 'CEL'
                        ? '셀타 비고'
                        : team.name === 'CAD'
                        ? '카디스'
                        : team.name === 'GRA'
                        ? '그라나다'
                        : team.name === 'ALM'
                        ? '알메리아'
                        : team.name}
                    </Team>
                    {LaData[index] && (
                      <>
                        <Points style={{ color: '#4dbca2', marginLeft: '1rem' }}>
                          {LaData[index].points}
                        </Points>
                        <Points style={{ marginLeft: '0rem' }}>{LaData[index].won}</Points>
                        <Points style={{ marginLeft: '-1rem' }}>{LaData[index].draw}</Points>
                        <Points style={{ marginLeft: '-1rem' }}>{LaData[index].lost}</Points>
                      </>
                    )}
                  </TeamWrap>
                </div>
              ))}
            </TabContent>
            <TabContent isActive={activeTab === 'tab4'}>
              <TeamWrap style={{ marginTop: '1rem', marginBottom: '-1rem' }}>
                <Team style={{ marginLeft: '0.8rem' }}>팀</Team>
                <Points style={{ color: '#4dbca2', marginLeft: '3.9rem' }}>승점</Points>
                <Points style={{ marginLeft: '0rem' }}>승</Points>
                <Points style={{ marginLeft: '-1rem' }}>무</Points>
                <Points style={{ marginLeft: '-1rem' }}>패</Points>
              </TeamWrap>

              {SateamData.map((team, index) => (
                <div>
                  <TeamImage style={{ backgroundImage: `url(${team.crest})` }} />
                  <TeamWrap>
                    <Team key={index}>
                      {team.name === 'INT'
                        ? '인터밀란'
                        : team.name === 'JUV'
                        ? '유벤투스'
                        : team.name === 'MIL'
                        ? 'AC 밀란'
                        : team.name === 'ATA'
                        ? '아탈란타'
                        : team.name === 'BOL'
                        ? '볼로냐'
                        : team.name === 'ROM'
                        ? 'AS 로마'
                        : team.name === 'FIO'
                        ? '피오렌티나'
                        : team.name === 'LAZ'
                        ? '라치오'
                        : team.name === 'NAP'
                        ? '나폴리'
                        : team.name === 'TOR'
                        ? '토리노'
                        : team.name === 'MON'
                        ? '몬차'
                        : team.name === 'GEN'
                        ? '제노아'
                        : team.name === 'USL'
                        ? '레체'
                        : team.name === 'FRO'
                        ? '프로시노네'
                        : team.name === 'UDI'
                        ? '우디네세'
                        : team.name === 'EMP'
                        ? '엠폴리'
                        : team.name === 'SAS'
                        ? '사수올로'
                        : team.name === 'HVE'
                        ? '베로나'
                        : team.name === 'CAG'
                        ? '칼리아리'
                        : team.name === 'SAL'
                        ? '살레르니타나'
                        : team.name}
                    </Team>
                    {SaData[index] && (
                      <>
                        <Points style={{ color: '#4dbca2', marginLeft: '1rem' }}>
                          {SaData[index].points}
                        </Points>
                        <Points style={{ marginLeft: '0rem' }}>{SaData[index].won}</Points>
                        <Points style={{ marginLeft: '-1rem' }}>{SaData[index].draw}</Points>
                        <Points style={{ marginLeft: '-1rem' }}>{SaData[index].lost}</Points>
                      </>
                    )}
                  </TeamWrap>
                </div>
              ))}
            </TabContent>
            <TabContent isActive={activeTab === 'tab5'}>
              <TeamWrap style={{ marginTop: '1rem', marginBottom: '-1rem' }}>
                <Team style={{ marginLeft: '0.8rem' }}>팀</Team>
                <Points style={{ color: '#4dbca2', marginLeft: '3.9rem' }}>승점</Points>
                <Points style={{ marginLeft: '0rem' }}>승</Points>
                <Points style={{ marginLeft: '-1rem' }}>무</Points>
                <Points style={{ marginLeft: '-1rem' }}>패</Points>
              </TeamWrap>

              {L1teamData.map((team, index) => (
                <div>
                  <TeamImage style={{ backgroundImage: `url(${team.crest})` }} />
                  <TeamWrap>
                    <Team key={index}>
                      {team.name === 'PSG'
                        ? '파리 생제르망'
                        : team.name === 'NIC'
                        ? '니스'
                        : team.name === 'ASM'
                        ? '모나코'
                        : team.name === 'BRE'
                        ? '브레스투아'
                        : team.name === 'LIL'
                        ? '릴'
                        : team.name === 'RCL'
                        ? '랑스'
                        : team.name === 'REN'
                        ? '스타드 렌'
                        : team.name === 'MAR'
                        ? '마르세유'
                        : team.name === 'SDR'
                        ? '랭스'
                        : team.name === 'RC '
                        ? '스트라스부르'
                        : team.name === 'HAC'
                        ? '르아브르 AC'
                        : team.name === 'NAN'
                        ? '낭트'
                        : team.name === 'LYO'
                        ? '리옹'
                        : team.name === 'TOU'
                        ? '툴루즈'
                        : team.name === 'MON'
                        ? '몽펠리에'
                        : team.name === 'FCL'
                        ? '로리앙'
                        : team.name === 'FCM'
                        ? 'FC 메스'
                        : team.name === 'CLF'
                        ? '클레르몽'
                        : team.name}
                    </Team>
                    {L1Data[index] && (
                      <>
                        <Points style={{ color: '#4dbca2', marginLeft: '1rem' }}>
                          {L1Data[index].points}
                        </Points>
                        <Points style={{ marginLeft: '0rem' }}>{L1Data[index].won}</Points>
                        <Points style={{ marginLeft: '-1rem' }}>{L1Data[index].draw}</Points>
                        <Points style={{ marginLeft: '-1rem' }}>{L1Data[index].lost}</Points>
                      </>
                    )}
                  </TeamWrap>
                </div>
              ))}
            </TabContent>
          </WrapperTabContent>
        </Content>
      </Wrapper>
    );
  }
};
export default Rank;
