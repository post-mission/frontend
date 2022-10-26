import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import "../../Community.scss";
import axios from "axios";

function CommunityArticleListItem() {
  
  const selectCategory = ["제목", "제목+내용", "말머리"];
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("제목");
  const navigate = useNavigate();
  
  const getSearchData = (sentData) => {
    setData(sentData);
  }

  const handleSelect = (e) => {
    setSelectedCategory(e.target.value);
  }

  useEffect(() => {
    axios 
      .get(`http://i6a302.p.ssafy.io:8080/posts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {

        //페이지네이션 - 카테고리랑 쿼리 빈 문자열로 처리해주기
        //{{EIP}}/posts?page=${pageNo}&category=${category}&query=${query}
        console.log('전체데이터', res);
        setData(res.data.data);
      })
  }, []);
  
    
  const onClicktoCollection = () => {
    navigate(`/tickets/collections`)
  };

  return (
    <div className="community-article-row" style={{paddingBottom: "70px"}}>
      <div className="board-header" 
        style={{ marginTop: "50px", display: "flex", justifyContent: "space-between"}}>
        <h1>자유 게시판</h1>
        <button onClick={onClicktoCollection}
          style={{
          fontSize: "14px",
          height: "36px",
          width: "100px",
          backgroundColor: "brown",
          border: "none",
          borderRadius: "5%",
          color: "rgb(245, 240, 220)"}}>
            작품 모음집   
        </button>
      </div>
      <div className="community-card">
      <table className="table table-striped table-bordered">
        <thead>
          <tr> 
            <th className="community-article-category">제목</th>
            <th className="community-article-category">글쓴이</th>
          </tr>   
        </thead>
        <tbody>
        {data.map(posting => (
          <tr key={posting.post_id}>
            <td>
            <Link to={`/posts/${posting.post_id}`} className="community-article-content">
              <div className="title-and-header">
                <p className="header-info">{posting.header}</p>
                <p>{posting.title}</p>
              </div>
            </Link>    
            </td>
            <td className="community-article-content">{posting.writer}</td>
          </tr>
        ))}
        </tbody>
      </table>  
      <div className="btn-form">
        <button className="btn">
        <Link to='/createpost'>
          글쓰기
        </Link>
        </button> 
      </div>
      <div className="community-article-search-section" style={{ marginTop: "90px" }}>
        <select className="community-article-search-category" onChange={handleSelect} value={selectedCategory}>
          {selectCategory.map((item, i) => (
          <option value={item} key={`article-${item}-${i}`}>
            {item}
          </option>
          ))}
        </select>
        <SearchBar selectedCategory={selectedCategory} getSearchData={getSearchData}/>
      </div>
    </div>
  </div>
  );
}

export default CommunityArticleListItem;