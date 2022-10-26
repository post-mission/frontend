import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdMailOutline, MdManageSearch } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import "./Profile.scss";
import axios from "axios";
import character_result from "../components/Character/contents/res";

function Profile() {
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 유저 정보 가져오기
    const tmp = localStorage.getItem("token");

    if (tmp) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }

    axios
      .get(`http://i6a302.p.ssafy.io:8080/auth/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        const data = res.data.data;
        setUserInfo(data);
        setFollowings(data.followings);
        setFollowers(data.follows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <div className="wrapper">
      {isAuthorized ? (
        <div>
          <header>
            <h1>{'[ '}내 프로필{' ]'}</h1>
          </header>

          <section className="user-info-basic">
            <div className="user-info-basic__top">
              {userInfo.profile_image ? 
              <img  className="profile-image"
                src={userInfo.profile_image}
                alt="My Character"
              />
              : <div className="profile-image" style={{ backgroundColor : "white" }}></div>
              }
              <p>{userInfo ? userInfo.username : "username"}</p>
            </div>
            <div className="user-info-basic__follow">
              <div>
                <span>{followers.length}</span>
                <p>팔로워</p>
              </div>
              <div>
                <span>{followings.length}</span>
                <p>팔로잉</p>
              </div>
            </div>
          </section>

          {/* first line */}

          <div className="first-line">
            <button className="my-btn" onClick={() => navigate("/editinfo")}>
                회원정보 수정
            </button>
            <button onClick={() => navigate("/messagelist")} className="icon-btn" >
                <MdMailOutline />
            </button>
          </div>


          {/* first shelf */}

          <section className="first-shelf shelf">
            {
              userInfo.second_character >= 0 ?
              <img
                src={`../../assets/test/${userInfo.second_character}.svg`}
                alt="Character"
                className="my-character"
              />
              : <div className="my-character"></div>
            }
            <div className="character-info-wrapper">
              <h3>나의 부캐</h3>
              <p>
                {userInfo.second_character >= 0 ? character_result.character[`${userInfo.second_character}`].character : "(로딩중...)"}
              </p>
            </div>
            <div className="to-button">
              <Link to="/character" className="arrow-icon">
                <IoIosArrowForward />
              </Link>
            </div>
          </section>
          <hr />


          {/* second fhelf */}

          <section className="second-shelf shelf">
            <div className="trophies">
              {
                userInfo.trophies && userInfo.trophies.length > 0 ? (
                  userInfo.trophies.length > 2 
                  ? userInfo.trophies.slice(0, 3).map((trophy, i) => (
                    <img src={`../../assets/trophies/trophy_${trophy}.svg`} alt="trophy" className="trophy" key={`trophy_${i}`} />))
                  : userInfo.trophies.fill(0, userInfo.trophies.length, 3).map((trophy, i) => {
                    return trophy > 0 ?
                            <img src={`../../assets/trophies/trophy_${trophy}.svg`} alt="trophy" className="trophy" key={`trophy_${i}`} />
                            : <div></div>
                  }
                )) : <div>열심히 활동해서 트로피를 모아보세요!</div>
              }
              {/* <img src="../../assets/t03.png" alt="trophy" className="trophy" />
              <img src="../../assets/t04.png" alt="trophy" className="trophy" /> */}
            </div>
            <div className="to-button">
              <button className="arrow-icon" 
                onClick={() => navigate("/trophies", {
                  state : {
                    trophies : userInfo.trophies
                  }
              })}>
                <IoIosArrowForward />
              </button>
            </div>
          </section>
          <hr />


          {/* third fhelf */}

          <section className="third-shelf shelf">
            <Link to="/ticketbook/list">
              <img
                src="./../assets/ticketbookList.svg"
                alt="ticketbook"
                className="ticketbook"
              />
            </Link>

            <Link to="/ticketbook/calendar">
              <img
                src="./../assets/ticketbookCalendar.svg"
                alt="calender"
                className="calender"
              />
            </Link>
          </section>
        </div>
      ) : (
        navigate("/home")
      )}
    </div>
  );
}

export default Profile;
