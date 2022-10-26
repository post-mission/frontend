import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Character.scss";
import Result from "./Result";

function Landing() {
  const navigate = useNavigate();
  const startTest = () => {
    console.log("start");
    navigate("/character/test");
  };
  return (
    <div className="landing">
      <div className="start">
        <h1 className="mt-5 text-center">부캐 테스트</h1>
        <button type="button" className="btn mt-5" onClick={startTest}>
          테스트 시작하기
        </button>
      </div>
    </div>
  );
}

export default Landing;
