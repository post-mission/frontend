import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "../components/Calendar";
import Check from "../components/Check";
import axios from "axios";
import "../Auth.scss";

function EditInfo() {
  const navigate = useNavigate();

  // 사용자 정보
  const [userInfo, setUserInfo] = useState({});

  // 사용자 정보 가져오기
  useEffect(() => {
    axios
      .get(`http://i6a302.p.ssafy.io:8080/auth/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        setUserInfo({
          email: res.data.data.email,
          username: "",
          password: "",
          gender: res.data.data.gender,
          age: res.data.data.age,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // toggle 정보
  const [toggle, setToggle] = useState({
    nameIsValid: true,
    passwordIsValid: true,
    passwordCheckIsValid: true,
  });

  // validation
  const nameRegex = /^[A-Za-z0-9+]{3,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // 사용자 정보 입력
  const handleUserChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    // 이메일 중복 에러 해결용
    setToggle({
      nameIsValid: true,
      passwordIsValid: true,
      passwordCheckIsValid: true,
    });
  };
  // console.log(userInfo);
  // 회원정보 수정 버튼 클릭
  const handleSubmit = () => {
    // validation Check
    if (!nameRegex.test(userInfo.name)) {
      setToggle({
        ...toggle,
        nameIsValid: false,
      });
      return;
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

    // 전달할 데이터 정리
    const formData = new FormData();
    formData.append("profile_image", files[0]);
    formData.append("username", userInfo.username);
    formData.append("password", userInfo.password);
    formData.append("gender", userInfo.gender);
    formData.append("age", userInfo.age);
    // 서버로 전송
    axios
      .put(`http://i6a302.p.ssafy.io:8080/auth/profile`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res);
        if (res.data.code === 200) {
          navigate("/profile");
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.status);
      });
  };

  // 파일 추가
  const [files, setFiles] = useState("");

  // 파일 불러오기
  const onLoadFile = (e) => {
    e.preventDefault();
    const file = e.target.files;
    setFiles(file);
  };

  // 프로필 이미지 등록하기
  const handleClick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile_image", files[0]);
    axios
      .post(`http://i6a302.p.ssafy.io:8080/auth/profile`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    preview();
    return () => preview();
  });
  const preview = () => {
    if (!files) return false;
    const imgEl = document.querySelector(".img-box");
    const reader = new FileReader();
    reader.onload = () => {
      imgEl.style.backgroundImage = `url(${reader.result})`;
    };
    reader.readAsDataURL(files[0]);
  };
  // const imgSrc = `../assets/${userInfo.profile_image}`;

  return (
    <div className="sign-up-form">
      <div>
        <h1>Edit Info</h1>
        <div>
          <div>
            <div className="img-box">
              {/* {imgSrc ? (
                <img src={imgSrc} alt="img" />
              ) : (
                <div
                  style={{
                    backgroundColor: "#f1edd8",
                    height: "120px",
                    width: "120px",
                  }}
                ></div>
              )} */}
            </div>
            <strong>업로드된 이미지</strong>
          </div>
          <form>
            <input
              id="profileImageInput"
              type="file"
              accept="img/*"
              onChange={onLoadFile}
            />
            <div>
              <button
                onClick={handleClick}
                className="my-btn profile-image-submit-btn"
              >
                프로필 사진 등록
              </button>
            </div>
          </form>
        </div>
        <form>
          <div className="d-grid">
            <input
              name="email"
              value={userInfo.email}
              onChange={handleUserChange}
              type="email"
              placeholder="이메일"
              disabled={true}
            />
          </div>
          <div className="d-grid">
            <input
              name="username"
              value={userInfo.username}
              onChange={handleUserChange}
              type="text"
              placeholder="닉네임"
            />
            {toggle.nameIsValid ? null : (
              <div className="invalid-input">
                닉네임은 세글자 이상이여야 합니다.
              </div>
            )}
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
                이상이어야 합니다.
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
          <div className="d-grid gap-2" style={{ marginTop: "1rem" }}>
            <button className="btn" type="button" onClick={handleSubmit}>
              회원정보 수정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditInfo;
