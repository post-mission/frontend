import React, { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Community.scss";

function MusicalReviewListItem() {
  const [ticketBook, setTicketBook] = useState([]);
  const [musicalTitle, setMusicalTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const musicalId = window.location.pathname;
    axios
      .get(`http://i6a302.p.ssafy.io:8080${musicalId}`,{
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`,
        }
      })
      .then((res) => {
        setTicketBook(res.data.data);
        setMusicalTitle(res.data.data[0].name);
        console.log('티켓북',ticketBook);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`http://i6a302.p.ssafy.io:8080/users`, {
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`,
        }
      })
    .then(res => {
      const user_list = ticketBook.map(ticket => ticket.user_id); 
      console.log(user_list);
    });
  }, [ticketBook]);
  
  const onClicktoCommunity = () => {
    navigate(`/posts`)
  };
 
  const onClicktoList = () => {
    navigate(`/tickets/collections`)
  };

  
  return (
    <div className="community-article-row" style={{ paddingBottom: "30px" }}>
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
      <h3 style={{ marginBottom: "40px" }}> {musicalTitle} 후기를 둘러보세요! </h3>
      {ticketBook.map(ticket => (
      <div>
        <div className="musical-review-list-item">
        <button className="user-review" onClick={() => navigate(`/ticketDetail/${ticket.id}`)}>
          <div className="user-profile">
            <img className="img-box" src="../../img/user.png" alt="프로필사진" />
          </div>
          <div className="ticket-user-review-detail">
            <p>아이디 : {ticket.user_id}</p> 
            <p>관람일시 : {ticket.watched_date}</p>
            <p>한줄평 : {ticket.summary}</p>  
          </div>
        </button>
        </div>
      </div>
      ))}
      <hr className="article-line"></hr>
      <button className="btn" onClick={onClicktoList}>목록으로 돌아가기</button>
      </div>
  )
}

export default MusicalReviewListItem;