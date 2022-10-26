import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import * as auth from "./auth";
import { MdOutlineClear } from "react-icons/md";
import "../Auth.scss";
import axios from "axios";
import { KAKAO_AUTH_URL } from "../components/Auth/OAuth";

function SignIn() {
  const navigate = useNavigate();
  const [state, setState] = useState({ email: "", password: "" });

  // email, password 입력
  const handleStateChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // 로그인 버튼 클릭 시
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    let token;
    let userId;
    axios
      .post(`http://i6a302.p.ssafy.io:8080/login`, {
        email: state.email,
        password: state.password,
      })
      .then((res) => {
        // console.log(res);
        userId = res.data.data.user_id;
        localStorage.setItem("userId", userId);
        token = res.headers.authorization.split(" ");
        localStorage.setItem("token", token[1]);
        navigate("/home");
      })
      // .then(() => {
      //   // 부캐 캐릭터 가져오기
      //   axios
      //   .get(`http://i6a302.p.ssafy.io:8080/auth/user`, {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //   })
      //   .then((res) => {
      //     console.log(res.data.data);
      //     localStorage.setItem("second_character", res.data.data.second_character)
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // })
      .catch((err) => {
        // console.log(err.response.status);
        // if (err.response.status === 401) {
        //   alert("로그인 정보를 다시 확인해주세요.");
        // }
        alert("로그인 정보를 다시 확인해주세요.");
      });
  };

  return (
    <div className="sign-in-form">
      <div>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmitLogin}>
          <div className="input-form">
            <input
              name="email"
              type="text"
              placeholder="이메일"
              value={state.email}
              onChange={handleStateChange}
            />
            <MdOutlineClear
              onClick={() => setState({ ...state, email: "" })}
              style={{ marginRight: "1rem" }}
            />
          </div>
          <div className="input-form">
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              value={state.password}
              onChange={handleStateChange}
              autoComplete="on"
            />
            <MdOutlineClear
              onClick={() => setState({ ...state, password: "" })}
              style={{ marginRight: "1rem" }}
            />
          </div>
          <div className="d-grid">
            <button className="my-btn">로그인</button>
          </div>
        </form>

        <div style={{ marginTop: "2rem" }}>
          <Link
            to="/findingpw"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            비밀번호를 잊어버리셨나요?
          </Link>
        </div>
        <div>
          계정이 없으신가요?
          <Link
            to="/signup"
            style={{ textDecoration: "none", color: "tomato" }}
          >
            회원가입
          </Link>
        </div>
        <hr style={{ color: "#1b5e1f" }} />
        <div className="social-kakao-btn-wrapper">
          <button
            id="socialKakaoBtn"
            onClick={() => {
              window.location.href = KAKAO_AUTH_URL;
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
