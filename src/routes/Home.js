import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.scss";

function Home() {
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [chaType, setChaType] = useState(0);
  const navigate = useNavigate();
  // console.log(isAuthorized);

  useEffect(() => {
    const tmp = localStorage.getItem("token");
    // console.log(tmp);
    if (tmp) {
      setIsAuthorized(true);
      axios
        .get(`http://i6a302.p.ssafy.io:8080/auth/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          const character_type = res.data.data.second_character;
          setChaType(character_type);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsAuthorized(false);
    }
  }, []);

  useEffect(() => {
    console.log(chaType);
  }, [chaType]);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("character_type");
    setIsAuthorized(false);
    navigate("/home");
  };

  return (
    <div>
      {isAuthorized ? (
        <div>
          <div
            className="home"
            // style={{ backgroundImage : isAuthorized ?
            //           'url("../../assets/stage_long_lighten.svg")'
            //           : 'url("../../assets/stage_long.svg")',
            //           backgroundColor: "red"
            //           }}>
          >
            {/* <h1 style={{ color: "white" }}>PostMission</h1> */}
            <img
              src="../../assets/board.png"
              alt="board"
              className="to-board"
              onClick={() => navigate("/posts")}
              style={{ cursor: "pointer" }}
            />
            {/* <div className="to-board">
              <Link
                to="/community"
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "black",
                }}
              >
                게시판
              </Link>
            </div> */}
            <div className="Character">
              <Link to="/profile">
                {/* <img src="../../assets/elphaba.svg"  alt="Character" /> */}
                {chaType > 0 ? (
                  <img
                    src={`../../assets/test/${chaType}.svg`}
                    alt="Character"
                  />
                ) : (
                  <img
                    src="../../assets/test/0.svg"
                    alt="no-character"
                    style={{ height: "25vh" }}
                  />
                )}
              </Link>
            </div>

            <div className="SignOut" onClick={onLogout}>
              <div
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "white",
                }}
              >
                로그아웃
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="home">
          <h1 style={{ color: "white" }}>PostMission</h1>

          <div className="SignIn">
            <Link
              to="/signin"
              style={{
                textDecoration: "none",
                cursor: "pointer",
                color: "white",
              }}
            >
              로그인
            </Link>
          </div>

          <div className="SignUp">
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                cursor: "pointer",
                color: "white",
              }}
            >
              회원가입
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
