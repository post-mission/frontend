import React, { useState, useRef, useEffect } from "react";
import StarRating from "./StarRating";
import "../../style.scss";
import "../../Ticket.scss";

function TicketFormReview({ 
  state,
  ratingScore, 
  setRatingScore,
  description,
  setDescription,
  summary,
  setSummary,
  attachments,
  setAttachments,
  isSpoiler,
  setIsSpoiler,
  isPrivate,
  setIsPrivate
}) {
  const [attachmentURLs, setAttachmentURLs] = useState([]);
  
  useEffect(() => {
    if (state && state.is_edit) {
      document.querySelector("#description textarea").value = state.description;
      document.querySelector("#summaryInput").value = state.summary;
    }
  }, []);

  const onFileChange = event => {
    const { target : { files }} = event;

    // 파일 목록에 추가
    setAttachments(prev => [...prev, ...files]);

    // 미리보기 이미지 url 생성 후 저장
    const fileUrls = Array.from(files).map(file => URL.createObjectURL(file));
    setAttachmentURLs(prev => [...prev, ...fileUrls]);

    // url 해제 (메모리 누수 방지)
    Array.from(files).map(file => URL.revokeObjectURL(file));
    
  };

  const fileInput = useRef();
  const onDeleteAttachment = (i) => {
    setAttachments(prev => prev.filter((att, idx) => idx !== i));
    setAttachmentURLs(prev => prev.filter((att, idx) => idx !== i));
  };
  

  const onIsPrivateChange = (id) => {
    setIsPrivate(id === "private" ? true : false);
    const open_radio = document.querySelector('#openLabel');
    const private_radio = document.querySelector('#privateLabel');
    if (id === "private") {
      open_radio.classList.remove("selected");
      private_radio.classList.add("selected");
      setIsSpoiler(false);
    } else {
      private_radio.classList.remove("selected");
      open_radio.classList.add("selected");
    }
  }

  return (
    <article className="ticket-form-review">

      <StarRating ratingScore={ratingScore} setRatingScore={setRatingScore} clickable={true} />
      

      <section id="description">
        <label className="my-label" htmlFor="descriptionForm">{'> '}더 자세히 작성해볼래요</label> <br></br>
        <textarea rows="25" onChange={(event) => setDescription(event.target.value)}>

        </textarea>
      </section>

      <section id="summary">
        <label className="my-label" htmlFor="summaryInput">{'> '}한 줄 요약</label>  <br></br>
        <input id="summaryInput" type="text" onChange={(event) => setSummary(event.target.value)} autoComplete="off" />

      </section>

      <section id="uploadImg">
        <label className="my-label">{'> '}사진 업로드</label>
        <ul id="ImgPreview">
          {
            attachmentURLs.map((url, i) => (
              <li key={`attachment-preview-${i}`}>
                <img 
                  alt={`attachment-preview-${i}`}
                  src={url}
                  className="preview-images" />
                <button 
                  className="my-btn"
                  onClick={() => onDeleteAttachment(i)}>x</button>
              </li>
            ))
          }
        </ul>
        <button id="attachFileLabel" className="my-btn">
          <label className="my-label" htmlFor="attachFile">
              Add photos
          </label>
        </button>
        <input 
            id="attachFile"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            ref={fileInput} 
            multiple 
            style={{ display: "none"}} />
      </section>

      <section id="openOrNot">
        <div className="radio-group">
          <label className="my-label">{'> '}{isPrivate ? "이 리뷰는 나만 볼래요!" : "이 리뷰를 사람들에게 보여줄래요!"}</label><br></br>
          <input id="open" type="radio" name="isReviewPrivate" defaultChecked={!(state && state.is_edit && state.private_check)}
            onChange={event => onIsPrivateChange(event.target.id)}/>
          <label htmlFor="open" id="openLabel" className={`my-label radio-label ${ state && state.is_edit && state.private_check ? "" : "selected"}`}>공개</label>
          <input id="private" type="radio" name="isReviewPrivate" defaultChecked={state &&  state.is_edit && state.private_check}
            onChange={event => onIsPrivateChange(event.target.id)} />
          <label htmlFor="private" id="privateLabel" className={`my-label radio-label ${ state && state.is_edit && state.private_check ? "selected" : "" }`}>비공개</label>
          { !isPrivate ? 
            <div className="spoiler-label-elem">
              <input id="spoilerCheck" type="checkbox" onChange={(event) => setIsSpoiler(event.target.checked)} 
                checked={state &&  state.is_edit && state.spoiler} />
              <label className="my-label checkbox-label" htmlFor="spoilerCheck">스포일러를 포함하고 있어요</label>  <br></br>
            </div>
            : <div className="spoiler-label-elem"></div>
          }
        </div>
      </section>

    </article>
  );
}

export default TicketFormReview;
