import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Auth.scss";

function FindingPW() {
  const [findEmail, setFindEmail] = useState("");
  const [cerNum, setCerNum] = useState("");
  const [toggleEmailBtn, setToggleEmailBtn] = useState(false);
  const [toggleCerBtn, setToggleCerBtn] = useState(false);
  const [toggleErr, setToggleErr] = useState(false);
  const navigate = useNavigate();
  const [tmp, setTmp] = useState(false);

  // 이메일 여부 확인 + 인증번호 받기
  const duplicateEmail = (e) => {
    e.preventDefault();
    axios
      .post(`http://i6a302.p.ssafy.io:8080/auth/duplicate-email`, {
        email: findEmail,
      })
      .then((res) => {
        console.log(res);
        if (res.data.code === 400) {
          // setToggleEmailBtn(true);
          getCerNum();
          setTmp(false);
        } else if (res.data.code === 200) {
          console.log(res);
          setTmp(true);
        }
      })
      .catch((err) => console.log(err));
  };

  // 인증번호 받기
  const getCerNum = () => {
    // e.preventDefault();
    // console.log(findEmail);
    axios
      .post(`http://i6a302.p.ssafy.io:8080/auth/send-email`, {
        email: findEmail,
      })
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          setToggleEmailBtn(!toggleEmailBtn);
        }
        // navigate("/changePW");
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post(`http://i6a302.p.ssafy.io:8080/auth/useremail`, {
        email: findEmail,
      })
      .then((res) => {
        // console.log(res);
        localStorage.setItem("user_id", res.data.data.user_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 인증번호 확인
  const handleCerNum = (e) => {
    e.preventDefault();
    // console.log(findEmail);
    axios.defaults.headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`http://i6a302.p.ssafy.io:8080/auth/verify-email`, {
        email: findEmail,
        token: cerNum,
      })
      .then((res) => {
        // console.log(res);
        if (res.data.code === 200) {
          setToggleCerBtn(true);
          setToggleErr(false);
          navigate("/changePW");
        }
        // navigate("/changePW");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setToggleErr(true);
        }
      });
  };

  return (
    <div className="find-pw-form">
      <div>
        <h1>비밀번호 재설정</h1>
        <div>
          <p style={{ marginBottom: 0 }}>비밀번호를 잊으셨나요?</p>
          <p>가입했던 이메일을 적어주세요</p>
        </div>

        <form>
          <input
            type="email"
            placeholder="email"
            value={findEmail}
            onChange={(e) => setFindEmail(e.target.value)}
            style={{ marginTop: "0", flex: 1 }}
          />
          <button
            className="btn"
            style={{ marginTop: "0", marginLeft: "1rem" }}
            // onClick={getCerNum}
            onClick={duplicateEmail}
            disabled={toggleEmailBtn}
          >
            인증번호 받기
          </button>
        </form>
        <div>
          {tmp && (
            <div style={{ color: "red" }}>올바른 이메일을 입력해 주세요.</div>
          )}
        </div>
        {/* <div className="d-grid">
          <button
            className="btn"
            style={{ marginTop: "0.5rem" }}
            onClick={getCerNum}
            disabled={!toggleEmailBtn}
          >
            인증번호 받기
          </button>
        </div> */}
        <form>
          <input
            type="text"
            placeholder="인증번호"
            value={cerNum}
            onChange={(e) => setCerNum(e.target.value)}
            style={{ marginTop: "0", flex: 1 }}
          />
          <button
            className="btn"
            style={{ marginTop: "0", marginLeft: "1rem" }}
            onClick={handleCerNum}
            disabled={toggleCerBtn}
          >
            인증번호 확인
          </button>
        </form>
        {toggleErr ? (
          <p style={{ color: "red" }}>인증번호가 올바르지 않습니다.</p>
        ) : null}
        {/* <div className="d-grid">
          <button className="btn" disabled={!toggleCerBtn} onClick={goChangePw}>
            비밀번호 재설정하기
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default FindingPW;
