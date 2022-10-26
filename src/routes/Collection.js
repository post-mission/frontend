import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../Community.scss";
import CollectionSearchBar from "./Collection/CollectionSearchBar";
import axios from "axios";

function Collection() {

  const [musicalReview, setMusicalReview] = useState([]);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios
      .get(`http://i6a302.p.ssafy.io:8080/tickets/collections`,{
          headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
          }
        })
      .then((res) => {  
        setMusicalReview(res.data.data);
        console.log(musicalReview);
    });
  }, []);

  const handleInputChange = (e) => {
    console.log(e);
    setSearchValue(e.target.value);
    console.log(searchValue);
  }

  const onClicktoCommunity = () => {
    navigate(`/posts`)
  };
 
  return (    
    <div className="community-article-row" style={{ paddingBottom: "50px" }}>
         <div className="board-header" 
        style={{ marginTop: "50px", display: "flex", justifyContent: "space-between"}}>
        <h1>작품 모음집</h1>
        <button onClick={onClicktoCommunity}
          style={{
          fontSize: "14px",
          height: "36px",
          width: "100px",
          backgroundColor: "brown",
          border: "none",
          borderRadius: "5%",
          color: "rgb(245, 240, 220)"}}>
            자유 게시판   
        </button>
      </div>
      <div className="search-title">
        {/* <CollectionSearchBar placeholder="작품 제목을 검색해보세요..!" data={musicalReview} /> */}
        {/* <input 
        type="text"
        className="search-title-input" 
        onChange={handleInputChange}
        placeholder="제목을 검색하세요" />
        <button className="btn"
        >검색하기</button> */}
      </div>
      <div className="review-wrapper-container">
        {musicalReview.map(poster => (
          <button 
          className="collection-item-wrapper"
          key={poster.musical_id}>
          <Link to={{
            pathname: `/tickets/collections/${poster.musical_id}`,
      
            }}
          > 
            <img className="collection-musical-poster" src={poster.poster_path} alt="작품포스터" />
            <p className="collection-musical-poster-name">{poster.musical_name}</p>
          </Link>
          </button>
        ))}
      </div>
    </div>
   
  );
}

export default Collection;