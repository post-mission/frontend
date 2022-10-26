import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "../components/Calendar";
import Check from "../components/Check";
import axios from "axios";
import "../Auth.scss";

function SignUp() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("올바르지 않은 이메일 양식입니다.");
  // 사용자 정보
  const [userInfo, setUserInfo] = useState({
    email: "",
    name: "",
    password: "",
    passwordCheck: "",
    gender: "none",
    age: "0",
  });
  // console.log(userInfo);

  // toggle 정보
  const [toggle, setToggle] = useState({
    emailIsValid: true,
    // nameIsValid: true,
    passwordIsValid: true,
    passwordCheckIsValid: true,
  });

  // validation
  const emailRegex =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  // const nameRegex = /^[A-Za-z0-9+]{3,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // 사용자 정보 입력
  const handleUserChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    // 이메일 중복 에러 해결용
    setToggle({
      emailIsValid: true,
      // nameIsValid: true,
      passwordIsValid: true,
      passwordCheckIsValid: true,
    });
    // // validation
    // if (emailRegex.test(userInfo.email)) {
    //   setToggle({
    //     ...toggle,
    //     emailIsValid: true,
    //   });
    // }
    // if (nameRegex.test(userInfo.name)) {
    //   setToggle({
    //     ...toggle,
    //     nameIsValid: true,
    //   });
    // }
    // if (passwordRegex.test(userInfo.password)) {
    //   setToggle({
    //     ...toggle,
    //     passwordIsValid: true,
    //   });
    // }
    // if (userInfo.password === userInfo.passwordCheck) {
    //   setToggle({
    //     ...toggle,
    //     passwordCheckIsValid: true,
    //   });
    // }
  };
  console.log(toggle);

  // 회원가입 버튼 클릭
  const handleSubmit = () => {
    // validation Check
    if (!emailRegex.test(userInfo.email)) {
      setToggle({
        ...toggle,
        emailIsValid: false,
      });
      setErrMsg("올바르지 않은 이메일 양식입니다.");
      return;
      // } else if (!nameRegex.test(userInfo.name)) {
      //   setToggle({
      //     ...toggle,
      //     nameIsValid: false,
      //   });
      //   return;
    } else if (!passwordRegex.test(userInfo.password)) {
      setToggle({
        ...toggle,
        passwordIsValid: false,
      });
      return;
    } else if (userInfo.password !== userInfo.passwordCheck) {
      setToggle({
        ...toggle,
        passwordCheckIsValid: false,
      });
      return;
    }
    // validation 후 서버로 데이터 전송
    axios
      .post(`http://i6a302.p.ssafy.io:8080/auth/join`, {
        email: userInfo.email,
        name: userInfo.name,
        password: userInfo.password,
        gender: userInfo.gender,
        age: userInfo.age,
      })
      // .post(`http://i6a302.p.ssafy.io:8080/auth/join`, userInfo)
      .then((res) => {
        // console.log(res);
        if (res.data.code === 200) {
          navigate("/signin");
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        // console.log(err.response.status);
        if (err.response.status === 401) {
          setToggle({
            ...toggle,
            emailIsValid: false,
          });
          setErrMsg("이미 사용된 이메일입니다.");
        }
      });
  };

  console.log(userInfo.gender);
  return (
    <div className="sign-up-form">
      <div>
        <h1>Sign Up</h1>
        <form>
          <div className="d-grid">
            <input
              name="email"
              value={userInfo.email}
              onChange={handleUserChange}
              type="email"
              placeholder="이메일"
            />
            {toggle.emailIsValid ? null : (
              <div className="invalid-input">{errMsg}</div>
            )}
          </div>
          <div className="d-grid">
            <input
              name="name"
              value={userInfo.name}
              onChange={handleUserChange}
              type="text"
              placeholder="닉네임"
            />
            {/* {toggle.nameIsValid ? null : (
              <div className="invalid-input">
                닉네임은 세글자 이상이여야 합니다.
              </div>
            )} */}
          </div>
          <div className="d-grid">
            <input
              name="password"
              value={userInfo.password}
              onChange={handleUserChange}
              type="password"
              placeholder="비밀번호"
            />
            {toggle.passwordIsValid ? null : (
              <div className="invalid-input">
                비밀번호는 영문, 숫자 중 2개 이상을 조합하여 최소 8자리
                이상이여야 합니다.
              </div>
            )}
          </div>
          <div className="d-grid">
            <input
              name="passwordCheck"
              value={userInfo.passwordCheck}
              onChange={handleUserChange}
              type="password"
              placeholder="비밀번호 확인"
            />
            {toggle.passwordCheckIsValid ? null : (
              <div className="invalid-input">비밀번호가 일치하지 않습니다.</div>
            )}
          </div>
          <hr style={{ color: "#1b5e1f" }} />
          {/* <p style={{ marginBottom: "0.5rem" }}>
            {"[ "}선택 항목{" ]"}
          </p> */}
          <div className="d-grid" style={{ marginBottom: "0.5rem" }}>
            성별:
            <Check userInfo={userInfo} setUserInfo={setUserInfo} />
          </div>
          <div className="d-grid">
            생년월일:
            <Calendar
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              style={{ marginTop: "0" }}
            />
          </div>
          <div className="d-grid gap-2" style={{ marginTop: "1rem" }}>
            <button className="btn" type="button" onClick={handleSubmit}>
              회원가입
            </button>
          </div>
          <div style={{ marginTop: "1rem" }}>
            이미 가입하셨나요?
            <Link to="/signin" style={{ textDecoration: "none" }}>
              로그인
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
