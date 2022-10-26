import React, { useEffect, useState} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {  MdOutlineArrowDropDown } from "react-icons/md";
import "../Community.scss";
import Comment from "../components/Comment/Comment";

function CommunityArticleDetail() {

  const navigate = useNavigate();
  const [ data, setData ] = useState({});
  const [ comments, setComments ] = useState([]);
  const { no } = useParams();
  
  useEffect(() => {
    async function fetch() {
      await axios.get(`http://i6a302.p.ssafy.io:8080/posts/${no}`,{
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setComments(res.data.data.comments);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    fetch();
}, []);

  const setUpdateData = async (data) => {
    await localStorage.setItem('header', data.header);
    await localStorage.setItem('title', data.title);
    await localStorage.setItem('description', data.description);
  }

  const deletePost = () => {
    let token;
    if (window.confirm('삭제하시겠습니까?')){
      const post_id = no;
      axios(`http://i6a302.p.ssafy.io:8080/posts/${no}`, {
        method: "DELETE",
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        if(res.status == 200){
          alert('게시물이 삭제되었습니다.');
          navigate('/posts');
        }
      });
    }
  }
  function changeDate(inputdate) {
    if (inputdate) {
      const date = new Date(inputdate);
      const [y, mon, d] = [date.getFullYear(), date.getMonth()+1, date.getDate()];
      const dateString = `${y}년 ${mon}월 ${d}일 ${inputdate.slice(11,16)}`;  
  
      return dateString;
    }
    return inputdate;
  }

  return (
    <div className="post-detail" align="center" style={{ paddingBottom: "70px" }}>
      <article className="detail-form-card">
      <h1 align="center" style={{ marginBottom: "60px" }}>
        게시글 상세정보
      </h1>
      <div className="detail-form-info">
        <p className="header-info">{data.header}</p>
        <p className="title-info" style={{ marginRight: "25px" }} >{data.title}</p>
      </div>
      <hr className="article-line"></hr>

      <div className="detail-form-info">
        <button className="user-profile" >
          <img className="img-box" src="../img/user.png" alt="프로필사진" />
          <label 
            className="article-writer"
            style={{ marginLeft: "10px", fontSize: "1.7em" }}>
            {data.writer}
          </label> 
        </button>
        <label className="article-createat" 
          style={{ marginLeft: "30px", fontSize: "1em" }}>
          {changeDate(data.create_at)}
        </label>
        {/* <ul className="detail-navigation">
          <li> */}
          {data.user_id === parseInt(localStorage.getItem('userId'))
          && <div className="edit-delete">
           <button 
            className="navigation-item"
            onClick={() => {
              setUpdateData(data)
              navigate(`/posts/update/${data.post_id}`)
            }}
            >수정하기
            </button>
            <button className="navigation-item" onClick={deletePost}>삭제하기</button>
          </div>}
          {/* </li>
        </ul> */}
      </div>     
      <hr className="article-line"></hr>

      <div className="detail-form-info-description">
        <div className="detail-form-info-description-words">
          {data.description}
        </div>
      </div>
      <hr className="article-line"></hr>
      <div style={{ margin: "3rem 30px", textAlign: "left" }}>
        <Comment
          comments={comments}
          setComments={setComments}
          post_id={data.post_id}
          setData={setData}
        />
      </div>
      <Link to='/posts'>
        <button className="btn">목록으로 돌아가기</button>
      </Link>
    </article>
  </div>
  )
}

export default CommunityArticleDetail;