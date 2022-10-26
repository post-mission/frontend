import React from "react";
import axios from "axios";

function CommentListItem({ 
  description, 
  commentWriterId, 
  createdAt, 
  articleWriterId, 
  ticketId, 
  setComments, 
  idx }) {

  const convertFormat = s => {
    const date = new Date(s);
    const [y, mon, d] = [date.getFullYear(), date.getMonth()+1, date.getDate()];
    const tmp = `${y}년 ${mon}월 ${d}일 ${s.slice(11,16)}`;
    return tmp
  }

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const onDeleteComment = () => {
    axios({
      method: 'DELETE',
      url: `${SERVER_URL}/ticketcomment/${ticketId}`,
      headers: { Authorization : `Bearer ${localStorage.getItem('token')}`} })
    .then(() => {
      setComments(prev => {
        prev.splice(idx, 1)
        return prev
      })
    })
    .catch(err => console.error(err))
  }

  return (
    <li className="comment-list-item">
      <span>{description}</span>
      <span>{convertFormat(createdAt)}</span>
      {commentWriterId === articleWriterId 
        && <button onClick={onDeleteComment}
              className="my-btn delete-btn">x</button> 
      }
    </li>
  );
}

export default CommentListItem;
