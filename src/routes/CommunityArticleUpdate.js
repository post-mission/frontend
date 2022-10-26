import React, { useState, useEffect, Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Community.scss";
import AutoComplete from "./AutoComplete";

function CommunityArticleUpdate() {
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [headerName, setHeaderName] = useState("");
  const [headerinfoid, setHeaderinfoid] = useState("");

  useEffect(() => {
    const postNo = window.location.pathname;
    var regex = /[^0-9]/g; 
    var result = postNo.replace(regex, "");
   
    axios
      .get(`http://i6a302.p.ssafy.io:8080/posts/${result}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => {
      const data = response.data.data;
      document.querySelector("#article-title").value = data.title;
      document.querySelector("#header").value = data.header;
      document.querySelector("#description").value = data.description;

      setTitle(data.title);
      setHeaderinfoid(data.headerinfoid);
      setDescription(data.description);
    });
  }, []);

  const updatePost = (e) => {
    e.preventDefault();
    const postNo = window.location.pathname;
    var regex = /[^0-9]/g; 
    var result = postNo.replace(regex, "");

    const data = {
      musical_info_id: headerinfoid,
      title : title,
      description: description
    }
    console.log(data);
    console.log(result);

    axios.put(`http://i6a302.p.ssafy.io:8080/posts/${result}`, data, {
      headers: {
        Authorization : `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        alert('게시글이 수정되었습니다.');
        navigate('/posts');
      }
    })
    .catch(e => console.log(e));
  }
  
  return (
    <div className="community-container" align="center" style={{paddingBottom: "70px"}}>
      <h1 className="text-center" style={{ marginBottom: "20px" }}>게시글 작성</h1>
      <div className="create-article-form">
        <p className="create-article-info">말머리</p>
        <AutoComplete headerName={headerName} setHeaderName={setHeaderName} headerinfoid={headerinfoid} setHeaderinfoid={setHeaderinfoid} />
      </div>
      <form>
        <div className="create-article-form">
          <input 
            className="create-article-input"
            type="hidden"
            name="musical_info_id"
          />
          <p className="create-article-info">제목</p>
          <input
            type="text"
            name="title"
            id="article-title"
            className="create-article-title"
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom:"3px" }}
          />
        </div>
        <div className="create-article-form">
          <p className="create-article-info">내용</p>
          <textarea 
            cols="50" 
            rows="8" 
            name="description"
            id="description"
            className="form-control"
            style={{ 
              marginBottom: "13px",
              paddingTop: "18px",
              paddingLeft: "20px"
              }}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button 
          className="btn"
          type="submit"
          value="수정하기"
          onClick={updatePost}>
            수정하기
        </button>
        <button 
          value="취소" 
          className="btn"
          style={{ marginLeft: "13px" }}
        >
        <Link to='/posts' className="cancel-btn">
          취소하기
        </Link>
        </button>  
      </form>
  </div>
  );
}

export default CommunityArticleUpdate;