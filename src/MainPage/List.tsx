import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface PostProps {
  title: string;
  content: string;
  imageUrl: string;
  url: string;
  src: string;
  team: string;
}

const PostWrap = styled.div`
  position: relative;
  width: 40rem;
  margin: 4rem auto;
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  justify-content: center;
  background-color: #484747;
  overflow: hidden;
  float: left;
  @media (max-width: 600px) {
    width: 20rem;
    margin-left: -2rem;
    margin-top: -6rem;
  }
`;

const TitleWrap = styled.div`
  width: 40rem;
  display: flex;
`;

const WrapTitle = styled.h2`
  font-size: 22px;
  height: 0.5rem;
  width: 75%;
  color: #eae9e9;
  justify-content: center;
  padding: 0.5rem;
  margin-left: 1.5rem;
  font-family: 'ESAM';
  margin-top: 1.5rem;
`;

const ShowAll = styled.div`
  font-size: 17px;
  border-radius: 1rem;
  padding: 0.8rem 1rem;
  margin-top: 1.2rem;
  font-family: 'ESAM';
  color: #d3d3d3;
  width: 4rem;
  height: 1.2rem;
  cursor: pointer;
  display: flex;
  background-color: #515151;
  z-index: 999;

  &:hover {
    background-color: #353535;
  }
`;

const PostContainer = styled.div`
  position: relative;
  width: 90%;
  max-width: 1000px;
  margin: 2.5rem 2rem 2rem auto;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  justify-content: center;
  overflow: hidden;
  font-family: 'ESAM';

  // 마우스 호버 시 Team 배경색 변경
  &:hover {
    .team {
      background-color: #3b9883;
      color: #343434;
    }
  }

  @media (max-width: 600px) {
    width: 80%;
  }
`;

const Team = styled.div`
  font-size: 17px;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  margin-left: 1rem;
  color: #4dbca2;
  display: flex;
  justify-content: center;
  position: absolute;
  background-color: #484747;
  z-index: 999;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const PostTitle = styled.h2`
  font-size: 22px;
  height: 2.5rem;
  margin-bottom: 10px;
  color: #eae9e9;
  justify-content: center;
  padding: 1rem;
  white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 생략 부호 (...) 표시 */

  @media (max-width: 600px) {
    font-size: 17px;
  }
`;

const PostImage = styled.img`
  margin-top: -0.1rem;
  margin-left: -0.1rem;
  width: 120%;
  max-height: 300px;
  object-fit: cover;
  height: 100rem; /* 원하는 높이로 수정 */
  background-size: cover;
  background-position: center;
  transition: transform 0.5s;
  &:hover {
    position: center;
    transform: scale(1.07); /* 이미지 확대 */
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 20rem;
  }
`;

const EmptyContainer = styled.div`
  position: relative;
  color: #c0c0c0;
  width: 57%;
  height: 7rem;
  margin: 6rem 2rem 2rem auto;
  justify-content: center;
  overflow: hidden;
  font-family: 'ESAM';
`;

const Post = () => {
  // 기사 클릭 시 이동 여부 선택
  const handlePostContainerClick = (content: string) => {
    const confirmation = window.confirm('해당 기사로 이동하시겠습니까?');
    if (confirmation) {
      window.open(content, '_blank');
    }
  };

  const navigate = useNavigate();

  const navigateHome = () => {
    navigate(`/`);
  };

  // 이적 기사 저장
  const [articleData, setArticleData] = useState<PostProps[]>([]);
  const [filterData, setFilterData] = useState<PostProps[]>([]);

  // 이적 기사 최신순 정렬
  const r_articleData = [...articleData].reverse();
  const r_filterData = [...filterData].reverse();

  // 이적 기사 GET 요청
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/article');
        setArticleData(response.data.article);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  let [query, setQuery] = useSearchParams();

  // 쿼리스트링에서 팀 이름 추출
  const teamName = query.get('team');

  // team 이름이 존재한다면 기사 데이터 중 팀 이름이 포함된 기사들만 filter
  useEffect(() => {
    if (teamName) {
      const filteredData = articleData.filter((post) =>
        post.team.replace(/ /g, '').includes(teamName),
      );
      setFilterData(filteredData);
    } else {
      setFilterData([]);
    }
  }, [teamName, articleData]);

  return (
    <PostWrap>
      <TitleWrap>
        <WrapTitle>이적정보</WrapTitle>
        <ShowAll onClick={() => navigateHome()}>전체보기</ShowAll>
      </TitleWrap>

      {teamName ? (
        r_filterData.length > 0 ? (
          r_filterData.map((post, index) => (
            <PostContainer key={index} onClick={() => handlePostContainerClick(post.content)}>
              <Team className="team">{post.team}</Team>
              <PostImage style={{ backgroundImage: `url(${post.url})` }} />
              <PostTitle>{post.title}</PostTitle>
            </PostContainer>
          ))
        ) : (
          <EmptyContainer>해당 팀의 기사가 없습니다.</EmptyContainer>
        )
      ) : r_articleData.length > 0 ? (
        r_articleData.map((post, index) => (
          <PostContainer key={index} onClick={() => handlePostContainerClick(post.content)}>
            <Team className="team">{post.team}</Team>
            <PostImage style={{ backgroundImage: `url(${post.url})` }} />
            <PostTitle>{post.title}</PostTitle>
          </PostContainer>
        ))
      ) : (
        <EmptyContainer>기사가 없습니다.</EmptyContainer>
      )}
    </PostWrap>
  );
};

export default Post;
