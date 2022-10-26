import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Auth.scss";

function ChangePW() {
  const [newPW, setNewPW] = useState("");
  const userId = localStorage.getItem("user_id");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handlePWChange = (e) => {
    e.preventDefault();
    if (!passwordRegex.test(newPW)) {
      setToggle(true);
      return;
    }
    setToggle(false);
    axios
      .put(`http://i6a302.p.ssafy.io:8080/auth/profile/password`, {
        user_id: userId,
        password: newPW,
      })
      .then((res) => {
        console.log(res.data.data);
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="change-pw-form">
      <div>
        <h1>비밀번호 재설정</h1>
        <form className="d-grid">
          <p style={{ marginBottom: 0 }}>변경할 비밀번호를 입력해 주세요.</p>
          <div className="input-form d-grid">
            <input
              type="password"
              placeholder="비밀번호"
              value={newPW}
              onChange={(e) => setNewPW(e.target.value)}
            />
          </div>
          {toggle && (
            <div style={{ color: "red" }}>올바른 비밀번호를 입력해 주세요</div>
          )}
          <button className="btn" onClick={handlePWChange}>
            비밀번호 변경
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePW;
