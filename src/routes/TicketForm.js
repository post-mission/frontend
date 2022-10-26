import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TicketFormReview from "../components/TicketBook/TicketFormReview";
import "../style.scss";
import "../Ticket.scss";
import axios from "axios";

function TicketForm() {
  const location = useLocation();
  console.log(location.state)
  const state = location.state;

  const [isWatched, setIsWatched] = useState(true);
  const [musicalPoster, setMusicalPoster] = useState(null);
  const [musicalList, setMusicalList] = useState([]);
  const [musicalName, setMusicalName] = useState("");
  const [musicalDatetime, setMusicalDatetime] = useState(state && !state.is_edit ? state.watch_datetime : new Date().toJSON().slice(0, 11) + "12:00");
  const [musicalActors, setMusicalActors] = useState([]);
  const [musicalTheater, setMusicalTheater] = useState("");
  const [musicalSeat, setMusicalSeat] = useState("");
  const [ticketColor, setTicketColor] = useState("#CF4D3D");
  const [kakaoNotification, setKakaoNotification] = useState(false);

  const [ratingScore, setRatingScore] = useState(0);
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [summary, setSummary] = useState("");
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    if (state && state.is_edit) {
      setMusicalPoster(state.poster_path);
      setMusicalName(state.name);
      setMusicalDatetime(state.watched_date);
      setMusicalActors(state.actors.split(", "))
      setMusicalTheater(state.place);
      setMusicalSeat(state.seat);
      setKakaoNotification(state.kakao_alert);

      setRatingScore(state.ranking);
      setDescription(state.description);
      setSummary(state.summary);
      //userimage
      setIsSpoiler(state.spoiler);
      setIsPrivate(state.private_check);

      document.querySelector("#musicalSeat").value = state.seat;
      
    }
  }, [])

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  
  const onFormCreate = (event) => {
    const textData = {
      make_color: ticketColor,
      watched_date: musicalDatetime,
      actors: musicalActors.join(", "),
      description: description,
      ranking: ratingScore,
      spoiler: isSpoiler ? 1 : 0,
      privateCheck: isPrivate ? 1 : 0,
      user_image: null,
      summary: summary,
      kakao_alert: kakaoNotification ? 1 : 0,
      name: musicalName,
      poster_path : musicalPoster,
      place: musicalTheater,
      seat: musicalSeat,
      watched: isWatched ? 1 : 0,
    }
    console.log(textData)
    console.log(attachments)

    
    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify(textData)], { type: "application/json" }));
    
    if (attachments.length > 0) {                 // 사용자 업로드 이미지가 있을 경우
      for (const item of attachments) {
        formData.append('ticket_images', item)
      }
      
    } else {                                      // 이미지 없을 경우
      // formData.append('ticket_images', null)
    }
    
    // debugging용
    for (const pair of formData.entries()) {
      console.log(pair[0], ":", pair[1])
    }
    // console.log(formData._boundary)
    
    if(state && state.is_edit) {        // 수정인 경우
      console.log("edit..!")
      axios.put(`${SERVER_URL}/tickets/${state.id}`, 
      formData,
      {
        headers: {
          'Authorization' :  `Bearer ${localStorage.getItem('token')}`,
          'Content-Type' : `multipart/form-data`, 
        }
      })
      .then(res => {
        navigate(`/ticketDetail/${res.data.data}`)
      })
      .catch(err => console.error(err))
      return
    }

    axios.post(`${SERVER_URL}/tickets`,     // 작성인 경우
    formData,
    {
      headers: {
        'Authorization' :  `Bearer ${localStorage.getItem('token')}`,
        'Content-Type' : `multipart/form-data`,
      }
    })
    .then(res => {
      navigate(`/ticketDetail/${res.data.data}`)
    })
    .catch(err => console.error(err))
  }

  const loadMusicalList = (input) => {
    if (input.length < 2) {
      if (musicalList.length) setMusicalList([]);
      return
    }

    axios.get(`${SERVER_URL}/musical/title`, { params: { title : input } })
    .then(res => {
      if (typeof res.data !== "string") {
        setMusicalList(res.data)
      }
    })
    .catch(err => {
      console.error(err)
    })

  }

  const onClickMusicalName = (event) => {
    const musicalId = event.target.dataset.id;
    axios.get(`${SERVER_URL}/musical/info`, { params: { id : musicalId } })
    .then(res => {
      const { place, poster, name } = res.data;
      setMusicalName(name);
      setMusicalPoster(poster);
      setMusicalTheater(place);
      setMusicalList([]);
      document.querySelector("#musicalNameInput").value = "";
    })
    .catch(err => {
      console.error(err)
    })
  }

  useEffect(() => {
    if (!musicalDatetime) return
    const schedule = new Date(musicalDatetime).getTime()
    const now = new Date().getTime()
    setIsWatched(schedule < now ? true : false)
  }, [musicalDatetime])

  const onMusicalActorsChange = (event, elem, isButtonClick) => {
    const input = elem.value;
    if ((input.length > 1 && input[input.length - 1] === ",") || (input.length > 0 && isButtonClick)) {
      const name = isButtonClick ? input : input.slice(0, input.length - 1);
      setMusicalActors(prev => [...prev, name]);
      isButtonClick ? elem.value="" : event.target.value = "";
      console.log(musicalActors)
    }
  }

  const onDeleteActor = (i) => {
    console.log("delete actor::", i)
    const updated_actors = musicalActors.filter((actor, idx) => idx !== i);
    setMusicalActors(updated_actors);
  }

  const onClickTicketColor = (event) => {
    setTicketColor(event.target.dataset.colorcode)
    const colorChips = document.querySelectorAll(".color-chip")
    colorChips.forEach(chip => chip.classList.remove('selected'))
    event.target.classList.add('selected')
  }

  const debounce = (func, wait, leading = false) => {
    let inDebounce;
    return function() {
      const context = this;
      const args = arguments;
  
      // inDebounce 값이 변하기 전에 미리 저장하기 위해 사용
      let callNow = leading && !inDebounce;
  
      // leading이 아닌 경우에만 wait 이후 func가 실행되도록 함
      const later = () => {
        inDebounce = null;
        if (!leading) func.apply(context, args);
      };
  
      // setTimeout이 실행된 Timeout의 ID를 반환하고, clearTimeout()으로 이를 해제할 수 있음을 이용
      clearTimeout(inDebounce);
      inDebounce = setTimeout(later, wait);
  
      // 만약 leading=true이고 inDebounce가 없으면 func를 실행
      if (callNow) func.apply(context, args);
    };
  };
  
  return (
    <div className="wrapper ticketForm">

      <article className="ticket-form-info">
        <section className="ticket-form-info__poster-wrapper">
          {
            musicalPoster ? 
            <img src={musicalPoster} className="form-musical-poster" alt="musical-poster" />
            : <div className="form-musical-poster"></div>
          }
        </section>

        <section className="ticket-form-info__info-wrapper">
          <label htmlFor="musicalName" 
            className="ticket-form-info__musical-name-label my-label">제목:</label>
          <input id="musicalName" type="text" disabled value={musicalName} />
          <div></div>
          <div className="ticket-form-info__musical-name-input-wrapper">
            <input type="text" className="form-search-input" id="musicalNameInput" autoComplete="off"
              onInput={(event) => debounce(loadMusicalList(event.target.value), 500)} />
            <button 
              onChange={() => debounce(loadMusicalList(document.querySelector("#musicalNameInput").value), 500)}
              className="my-btn form-search-btn">입력</button>
            <ul id="musicalNamelist" className={`${musicalList.length > 0 ? 'show' : "" }`}>
              {
                musicalList.map(musical => (
                  <li key={musical.id} data-id={musical.id} onClick={onClickMusicalName} >
                    {musical.name}
                  </li> 
                ))
              }
            </ul>
          </div>


          <label htmlFor="musicalDatetime" className="my-label">관람 일시:</label>
          <input id="musicalDatetime" type="datetime-local" value={musicalDatetime}
            onChange={(event) => setMusicalDatetime(event.target.value)} />

          <label htmlFor="musicalActors" className="ticket-form-info__casting-label my-label">캐스팅:</label>
          <ul className="ticket-form-info__musical-lists">
            {
            musicalActors.map((actor, i) => (
              <li key={`actor-${i}`}>
                {actor}
                <button onClick={() => onDeleteActor(i)}>x</button>
              </li>
            ))
            }
          </ul>
          <div></div>
          <div className="ticket-form-info__musical-actors-wrapper">
            <input id="musicalActors" type="text" className="form-search-input"
              onChange={(event) => onMusicalActorsChange(event, event.target, false)} />
            <button 
              onClick={() => onMusicalActorsChange(null, document.querySelector('#musicalActors'), true)}
              className="my-btn form-search-btn">입력</button>
          </div>
          <div></div>
          <div className="ticket-form-info__tip">쉼표(,)로 이름을 구분해보세요!</div>

          <label htmlFor="musicalTheater" className="my-label">공연장:</label>
          <input id="musicalTheater" type="text" value={musicalTheater}
            onChange={(event) => setMusicalTheater(event.target.value)} />

          <label htmlFor="musicalSeat" className="my-label">좌석 위치:</label>
          <input id="musicalSeat" type="text"
            onChange={(event) => setMusicalSeat(event.target.value)} />

          <label className="my-label">티켓 색깔:</label>
          <ul className="color-palette">
            {
              ['#CF4D3D', '#EFA64A', '#7E8A58', '#69B8A2', '#69583C', '#443A6D'].map((color, i) => (
                <li data-colorcode={color} style={{ backgroundColor: color }} 
                  className={`color-chip ${
                    state && state.is_edit ? 
                      state.make_color === color
                      ? 'selected' : ""
                    : i === 0 ? 'selected' : ""}`} key={`color-${i}`}
                  onClick={onClickTicketColor}></li>
              ))
            }
          </ul>
          {
            isWatched ?
              "" :
              <div className="kakao-noti-wrapper">
                <input id="kakaoNotification" type="checkbox" checked={state &&  state.is_edit && state.kakao_alert }
                  onChange={(event) => setKakaoNotification(event.target.value)}/>
                <label className="my-label checkbox-label" htmlFor="kakaoNotification">카카오톡 알림 받기</label>
              </div>
          }
        </section>
      </article>

      

      {isWatched ? 
        <TicketFormReview 
          state={state}
          ratingScore={ratingScore}
          setRatingScore={setRatingScore}
          description={description}
          setDescription={setDescription}
          summary={summary}
          setSummary={setSummary}
          attachments={attachments}
          setAttachments={setAttachments}
          isSpoiler={isSpoiler}
          setIsSpoiler={setIsSpoiler}
          isPrivate={isPrivate}
          setIsPrivate={setIsPrivate} />
      : ""}
      
     <div className="create-form-btn-wrapper">
        <button onClick={onFormCreate} 
          id="createFormButton" 
          className="my-btn">
            {state && state.is_edit ? "수정하기" : "작성하기"}
        </button>
     </div>
    </div>
  );
}

export default TicketForm;
