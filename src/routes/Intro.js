import React, { useState } from "react";
import "./Intro.scss";
import { Link, useNavigate } from "react-router-dom";

function Intro() {
  const [toggle, setToggle] = useState(true);

  const body = document.body;
  body.addEventListener("mousemove", function (e) {
    body.style.setProperty("--x", e.clientX + "px");
    body.style.setProperty("--y", e.clientY + "px");
  });
  body.addEventListener("touchmove", function (e) {
    //e.preventDefault();
    body.style.setProperty("--x", e.touches[0].clientX + "px");
    body.style.setProperty("--y", e.touches[0].clientY + "px");
  });
  window.addEventListener("load", function () {
    body.style.setProperty("--x", 0);
    body.style.setProperty("--y", 0);
  });

  return (
    <div className="intro">
      {toggle ? (
        <div>
          <div className="box-off">
            <button>ON/OFF</button>
            <h1 className="title">PostMission</h1>
            <h3 className="signUp">회원가입</h3>
            <h3 className="signIn">로그인</h3>
          </div>
          <div className="box-off">
            <button onClick={() => setToggle(!toggle)}>ON/OFF</button>
            <h1 className="title">PostMission</h1>

            <Link className="signUp" to="/signup">
              회원가입
            </Link>

            <Link
              className="signIn"
              to="/signin"
              style={{
                textDecoration: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              로그인
            </Link>
          </div>
          <div className="circle"></div>
        </div>
      ) : (
        <div>
          <div>
            <div className="box-on">
              <button>ON/OFF</button>
              <h1 className="title">PostMission</h1>
              <h3 className="signUp">회원가입</h3>
              <h3 className="signIn">로그인</h3>
            </div>
            <div className="box-on">
              <button onClick={() => setToggle(!toggle)}>ON/OFF</button>
              <h1 className="title">PostMission</h1>

              <Link className="signUp" to="/signup">
                회원가입
              </Link>

              <Link
                className="signIn"
                to="/signin"
                style={{
                  textDecoration: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                로그인
              </Link>
            </div>
            {/* <div className="circle"></div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Intro;
