import React from "react";
import './Trophies.scss';
import { useLocation } from "react-router-dom";

function Trophies() {
  const location = useLocation();
  const own_trophies = location.state.trophies;

  const trophies = [
    {
      url_id: "first_follower",   //2
      name: "나친구있어",
      img_id: 2,
    },
    {
      url_id: "first_following",    //1
      name: "우리친구해",
      img_id: 1,
    },
    {
      url_id: "first_5stars",     //8
      name: "인생작발견",
      img_id: 8,
    },
    {
      url_id: "first_review",   //3
      name: "뮤린이탄생",
      img_id: 3,
    },
    {
      url_id: "10th_review",    //4
      name: "뮤덕의시작",
      img_id: 4,
    },
    {
      url_id: "50th_review",    //5
      name: "뮤지컬중독",
      img_id: 5,
    },
    {
      url_id: "first_schedule",   //9
      name: "초보관극러",
      img_id: 9,
    },
    {
      url_id: "2nd_view",   //6
      name: "수동회전문",
      img_id: 6,
    },
    {
      url_id: "5th_view",   //7
      name: "자동회전문",
      img_id: 7,
    },
  ]
  
  return (
    <div className="wrapper">
      <header>
        <h1>{'[ '}나의 트로피{' ]'}</h1>
      </header>
      <div className="trophy-wrapper">
        {
          trophies.map((trophy, i) => (
            <div key={`trophy_${i}`} className={`trophy-item-wrapper ${ own_trophies.indexOf(trophy.img_id) >= 0 && "own" }`}>
              <img className="trophy-img" alt="trophy_img"
                src={`../../assets/trophies/trophy_${trophy.img_id}.svg`} />
              <label className="trophy_name">{trophy.name}</label>
            </div>
          ))
        }
      </div>
      
    </div>
  );
}

export default Trophies;