import React, { useEffect, useState } from "react";
import "./Character.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// 8가지만 적용한 버전
import results from "./contents/res";

function Result() {
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get(`http://i6a302.p.ssafy.io:8080/auth/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const character_num = res.data.data.second_character;

        const data = results["character"][character_num];

        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="result-page">
      <div className="result">
        <div className="text-center mt-5">{data.title1}</div>
        <div className="text-center mb-4">{data.title2}</div>
        <img src={data.img} alt="img" />
        <div className="explain-box mt-5">
          <h2 id="character" className="text-center">
            {data.character}
          </h2>
          <div id="explain1" className="mt-4">
            {data.explain1}
          </div>
          <div id="explain2" className="mt-2">
            {data.explain2}
          </div>
          <div id="explain3" className="mt-2">
            {data.explain3}
          </div>
        </div>
      </div>
      <button onClick={() => navigate("/home")} className="my-btn">
        {`홈 화면에 나타난 내 캐릭터`} <br />
        {`확인하러 가기!`}
      </button>
      <div>https://soju1117.tistory.com/548</div>
    </div>
  );
}

export default Result;
