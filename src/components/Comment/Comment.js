import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentListItem from "./CommentListItem";
import style from "./Comment.scss";


function Comment({ comments, setComments, ticket_id, post_id, setData }) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const convertFormat = s => {
    if (s) {
      const date = new Date(s);
      const [y, mon, d] = [date.getFullYear(), date.getMonth()+1, date.getDate()];
      const tmp = `${y.toString().slice(2, 4)}.${mon}.${d}/${s.slice(11,16)}`;
      return tmp
    }
    return s
  }

  const onSubmitComment = (event) => {
    event.preventDefault();
    const commentText = event.target.firstChild.value;
    if (commentText.length === 0) return;

    
    if (ticket_id) {
      console.log("ticket comment")
      const formData = new FormData();
      formData.append('comment', commentText);
      formData.append('ticketId', ticket_id);
  
      axios.post(`${SERVER_URL}/ticketcomment`,
      formData,
      {
        headers: {
          'Authorization' :  `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        const newComment = {
          ticket_comments_id: res.data.data,
          user_id: parseInt(localStorage.getItem('userId')),
          ticket_id: ticket_id,
          description: commentText,
          create_at: new Date().toDateString()
        }
        setComments(prev => [...prev, newComment])
        
        event.target.firstChild.value = ""
      })
      .catch(err => console.error(err))
    } else if (post_id) {
      console.log("post comment")
      const data = {
        post_id : post_id,
        user_id : parseInt(localStorage.getItem('userId')),
        description : commentText
      }
  
      axios.post(`${SERVER_URL}/posts/comments`,
      data,
      )
      .then((res) => {

        axios.get(`http://i6a302.p.ssafy.io:8080/posts/${post_id}`,{
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
        
        event.target.firstChild.value = ""
      })
      .catch(err => console.error(err))
    }

  }

  const onDeleteComment = (commentId, idx) => {
    if (ticket_id) {
      axios({
        method: 'DELETE',
        url: `${SERVER_URL}/ticketcomment/${commentId}`,
        headers: { Authorization : `Bearer ${localStorage.getItem('token')}`} })
      .then(() => {
        setComments(prev => prev.filter((comment, i) => i !== idx ))
      })
      .catch(err => console.error(err))
    } else if (post_id) {
      axios({
        method: 'DELETE',
        url: `${SERVER_URL}/posts/comments/${commentId}`,
        headers: { Authorization : `Bearer ${localStorage.getItem('token')}`} })
      .then(() => {
        setComments(prev => prev.filter((comment, i) => i !== idx ))
      })
      .catch(err => console.error(err))
    }
  }

  return (
    <div className="comment-wrapper">
      <ul className="comment-list">
        {
          comments && comments.map((commentInfo, i) => 
            <li className="comment-list-item" key={`${ticket_id}-comment-${i}`}>
              <span className="comment-description">
                {commentInfo.description} 
                <span className="comment-date">{convertFormat(ticket_id ? commentInfo.create_at : commentInfo.created_at)}</span>
              </span>
              {commentInfo.user_id === parseInt(localStorage.getItem('userId'))
                && <button onClick={() => onDeleteComment(ticket_id ? commentInfo.ticket_comments_id : commentInfo.post_comments_id, i)}
                      className="my-btn delete-btn">X</button> 
              }
              
            </li>
          )
        }
      </ul>

      <form className="comment-textarea-form" onSubmit={onSubmitComment}>
        <textarea className="comment-textarea" placeholder="댓글을 작성해주세요:)" />
        <button className="my-btn comment-create-button">작성</button>
      </form>

    </div>
  );
}

export default Comment;
