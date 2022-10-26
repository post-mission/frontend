import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Character.scss";
import Result from "./Result";
import contents from "./contents/questions";
// 16가지 다 적용한 버전
// import results from "./contents/results";
// 8가지만 적용한 버전
import results from "./contents/res";
// import contents from "./contents/questions";
import axios from "axios";

function Test() {
  // Toggle
  const [isShow, setIsShow] = useState(true);
  const [character, setCharacter] = useState("");

  // MBTI
  const [EI, setEI] = useState(0);
  const [SN, setSN] = useState(0);
  const [TF, setTF] = useState(0);
  const [JP, setJP] = useState(0);

  // Questions
  const [optA, setOptA] = useState("옵션 A");
  const [optB, setOptB] = useState("옵션 B");
  const [question, setQuestion] = useState("문제");
  const [value, setValue] = useState("");
  const [cnt, setCnt] = useState(1);

  // result
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    toNext();
  }, []);

  const toNext = () => {
    setQuestion(contents[cnt]["title"]);
    setValue(contents[cnt]["type"]);
    setOptA(contents[cnt]["A"]);
    setOptB(contents[cnt]["B"]);
    setCnt((prev) => prev + 1);
  };

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  console.log(`${SERVER_URL}/auth/second`);
  // 결과 보기
  const showRes = () => {
    setIsShow(!isShow);
    let mbti = "";
    {
      EI < 2 ? (mbti += "I") : (mbti += "E");
    }
    {
      SN < 2 ? (mbti += "N") : (mbti += "S");
    }
    {
      TF < 2 ? (mbti += "F") : (mbti += "T");
    }
    {
      JP < 2 ? (mbti += "P") : (mbti += "J");
    }
    // result 페이지로 넘겨주기 위해
    // 다른 방법 있으면 생각...
    // localStorage.setItem("character", results[mbti]["character"]);
    // localStorage.setItem("title1", results[mbti]["title1"]);
    // localStorage.setItem("title2", results[mbti]["title2"]);
    // localStorage.setItem("explain1", results[mbti]["explain1"]);
    // localStorage.setItem("explain2", results[mbti]["explain2"]);
    // localStorage.setItem("explain3", results[mbti]["explain3"]);
    // localStorage.setItem("imgSrc", results[mbti]["img"]);

    // console.log(results["type"][mbti])
    const character_type = results["type"][mbti];
    localStorage.setItem("character_type", character_type);

    axios
      .post(
        `${SERVER_URL}/auth/second`,
        { type: character_type },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": `application/json`,
          },
        },
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  // 다음 문제로 넘어가기
  const nextQuestion = () => {
    setQuestion(contents[cnt]["title"]);
    setValue(contents[cnt]["type"]);
    setOptA(contents[cnt]["A"]);
    setOptB(contents[cnt]["B"]);
    setCnt((prev) => prev + 1);
  };
  // MBTI 점수 더하기
  const checkMBTI = () => {
    if (inputRef.current.value === "EI") {
      setEI((prev) => prev + 1);
    } else if (inputRef.current.value === "SN") {
      setSN((prev) => prev + 1);
    } else if (inputRef.current.value === "TF") {
      setTF((prev) => prev + 1);
    } else if (inputRef.current.value === "JP") {
      setJP((prev) => prev + 1);
    }
  };

  // A 클릭 시
  const clickA = () => {
    if (cnt === 13) {
      showRes();
    } else {
      nextQuestion();
    }
    checkMBTI();
  };
  // B 클릭 시
  const clickB = () => {
    if (cnt === 13) {
      showRes();
    } else {
      nextQuestion();
    }
  };

  // progressbar
  const widthStyle = {
    height: "100%",
    width: `${(100 / 12) * (cnt - 1)}%`,
    background: " #004611",
    borderRadius: "10px",
    transition: "1s ease 0.005s",
  };

  return (
    <div className="character-test">
      {isShow && (
        <>
          <div className="question">
            <div className="mt-5" style={{ textAlign: "end" }}>
              {`${cnt - 1} / 12`}
            </div>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={widthStyle}
              ></div>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "calc(100/12*{cnt}%)" }}
              ></div>
            </div>
            <div id="title" className="text-center mt-5">
              {question}
            </div>
            <input type="hidden" id="type" value={value} ref={inputRef} />
            <button id="A" type="button" className="btn mt-5" onClick={clickA}>
              {optA}
            </button>
            <button id="B" type="button" className="btn mt-4" onClick={clickB}>
              {optB}
            </button>
          </div>

          <input type="hidden" id="EI" value={EI} />
          <input type="hidden" id="SN" value={SN} />
          <input type="hidden" id="TF" value={TF} />
          <input type="hidden" id="JP" value={JP} />
        </>
      )}
      <div>
        {!isShow && (
          <div className="to-result">
            <div className="test-done mt-5">테스트 완료</div>
            <button
              type="button"
              className="btn mt-4"
              onClick={() => {
                setCharacter();
                setTimeout(() => {
                  navigate("/character/result");
                }, 1000);
              }}
            >
              결과보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Test;
