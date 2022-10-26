import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TicketDetailReview from "../components/TicketBook/TicketDetailReview";
import Comment from "../components/Comment/Comment";
import axios from "axios";
import TicketDeleteCheckModal from "../components/TicketBook/TicketDetailDeleteModal";
import { useNavigate } from 'react-router-dom';


function TicketDetail() {
  const { ticket_id } = useParams();
  const [ticketInfo, setTicketInfo] = useState(null);
  const [dateString, setDateString] = useState("");
  const [comments, setComments] = useState([]);

  const [modalShow, setModalShow] = useState(false);

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const getComments = () => {
    axios({
      method: 'GET',
      url: `${SERVER_URL}/ticketcomment/list/${ticket_id}`,
      headers: { Authorization : `Bearer ${localStorage.getItem('token')}`} })
    .then(res => {
      const data = res.data.data;
      setComments(data);
      console.log(data)
    })
    .catch(err => console.error(err))
  }

  const getTicketInfo = () => {
    axios({
      method: 'GET',
      url: `${SERVER_URL}/tickets/${ticket_id}`,
      headers: { Authorization : `Bearer ${localStorage.getItem('token')}`} })
    .then(res => {
      const data = res.data.data;
      if (data.user_image) {
        data.user_image = data.user_image.split("||")
      }
      setTicketInfo(data);
      console.log(data)
    })
    .catch(err => console.error(err))
  }

  useEffect(() => {
    //axios
    getTicketInfo();
    getComments();
  }, [])

  useEffect(()=> {
    if (ticketInfo && ticketInfo.watched_date) {
      const date = new Date(ticketInfo.watched_date);
      const [y, mon, d] = [date.getFullYear(), date.getMonth()+1, date.getDate()];
      const tmp = `${y}년 ${mon}월 ${d}일 ${ticketInfo.watched_date.slice(11,16)}`;
      setDateString(tmp);
    }
  }, [ticketInfo])
  
  const navigate = useNavigate();

  const onClickEdit = (event) => {
    navigate('/ticketform', { 
      state: {
        ...ticketInfo,
        is_edit: true,
      }
     })
  }

  const onClickDelete = (event) => {
    setModalShow(true)
  }


  const onDeleteTicket = () => {
    console.log("delete!!")
    axios({
      method: 'DELETE',
      url: `${SERVER_URL}/tickets/${ticket_id}`,
      headers: { Authorization : `Bearer ${localStorage.getItem('token')}`},
    })
    .then(res => {
      navigate("/ticketBook/list")
    })
    .catch(err => console.error(err))
  }

  return (
    <div className="wrapper">
      {
        ticketInfo ?
        <>
          <article id="ticketDetailInfo" className="ticket-detail-info">
            <section className="ticket-detail-info__poster-wrapper">
                {
                  ticketInfo.poster_path ? 
                  <img src={ticketInfo.poster_path} className="musical-poster" alt="musical-poster" />
                  : <div className="musical-poster"></div>
                }
            </section>

            <section className="ticket-detail-info__info-wrapper">

              <p className="ticket-detail-info__name-wrapper">
                <label>{'> '}제목:</label>
                <span>{ticketInfo.name}</span>
              </p>

              <p className="ticket-detail-info__watch-date-wrapper">
                <label>{'> '}관람 일시:</label>
                <span>{dateString}</span>
              </p>

              <p className="ticket-detail-info__actors-wrapper">
                <label>{'> '}캐스팅:</label>
                <span>{ticketInfo.actors}</span>
              </p>

              <p className="ticket-detail-info__theater-wrapper">
                <label>{'> '}공연장:</label>
                <span>{ticketInfo.place}</span>
              </p>

              <p className="ticket-detail-info__theater-wrapper">
                <label>{'> '}좌석 위치:</label>
                <span>{ticketInfo.seat}</span>
              </p>

              {
                !ticketInfo.watched && ticketInfo.kakao_alert ?
                  <label className="kakao-noti-label">{'[ '}카카오톡 알림을 받기로 했어요!{' ]'}</label> : ""
              }
            </section>

          </article>

          {
            ticketInfo.watched ?
            <TicketDetailReview
              summary={ticketInfo.summary}
              rating={ticketInfo.ranking}
              description={ticketInfo.description}
              user_images={ticketInfo.user_image}
            /> : ""
          }

          {
            ticketInfo.watched && !ticketInfo.private_check ?
            <article className="ticket-detail-comment">
              <label>{'> '}댓글</label>
              <Comment 
                comments={comments}
                setComments={setComments}
                ticket_id={ticket_id} />
            </article> 
            : ""
          }

          {
            ticketInfo.user_id === parseInt(localStorage.getItem('userId')) &&
            <footer className="ticket-detail-btn-group">
              <button className="my-btn" onClick={onClickEdit}>수정</button>
              <button className="my-btn" onClick={onClickDelete}>삭제</button>
            </footer>
          }

          <TicketDeleteCheckModal
            show={modalShow} 
            onHide={() => setModalShow(false)}
            onDelete={() => onDeleteTicket()} />
          
        </> : ""
      }
    </div>
      
  );
}

export default TicketDetail;
