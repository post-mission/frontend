import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useNavigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "../routes/Home";
import TicketBook from "../routes/TicketBook";
import TicketForm from "../routes/TicketForm";
import TicketDetail from "../routes/TicketDetail";
import Intro from "../routes/Intro";
import SignIn from "../routes/SignIn";
import SignUp from "../routes/SignUp";
import FindingPW from "../routes/FindingPW";
import Community from "../routes/Community";
import Collection from "../routes/Collection";
import CommunityArticleForm from "../routes/CommunityArticleForm";
import CommunityArticleDetail from "../routes/CommunityArticleDetail";
import CommunityArticleListItem from "./Community/CommunityArticleListItem";
import Header from "./Header";
import Profile from "../routes/Profile";
import EditInfo from "../routes/EditInfo";
import MessageList from "../routes/MessageList";
// import MyCharacter from "../routes/MyCharacter";
import ChangePW from "../routes/ChangePW";
import UserInfo from "./Auth/UserInfo";
import KakaoAuthRedirectHandler from "./Auth/KakaoAuthRedirectHandler";
import Trophies from "../routes/Trophies";
// character
import Landing from "./Character/Landing";
import Result from "./Character/Result";
import Test from "./Character/Test";
// For Test
import Tmp from "./Tmp";
import CommunityArticleUpdate from "../routes/CommunityArticleUpdate";
import MusicalReviewListItem from "../routes/Collection/MusicalReviewListItem";

function AppRouter({ props }) {
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(tmp);
    // console.log(window.location.pathname);
    if (token) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  });
  // const onLogout = () => {
  //   // localStorage.setItem("msg", "실패");
  //   localStorage.removeItem("msg");
  // };
  return (
    <Router>
      {/* {window.location.pathname !== "/" ? <Header /> : null} */}
      <Header isAuthorized={isAuthorized} />
      {/* <Tmp /> */}
      <Routes>
        <>
          {/* 테스트용 */}
          <Route path="/tmp" element={<Tmp />} />
          {/* 캐릭터 test */}
          <Route path="/character" element={<Landing />} />
          <Route path="/character/test" element={<Test />} />
          <Route path="/character/result" element={<Result />} />
          {/* 나머지 */}
          <Route path="/" element={<Intro />} />
          <Route path="/ticketbook/:route" element={<TicketBook />} />
          <Route path="/ticketform" element={<TicketForm />} />
          <Route path="/ticketdetail" element={<TicketDetail />} />
          <Route path="/ticketDetail/:ticket_id" element={<TicketDetail />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/oauth/callback" element={<KakaoAuthRedirectHandler />} />
          
          <Route
            path="/profile"
            element={<Profile isAuthorized={isAuthorized} />}
          />
          <Route path="/trophies" element={<Trophies />} />
          <Route path="/userInfo" element={<UserInfo />} />
          {/* <Route path="/characterTest" element={<MyCharacter />} /> */}
          <Route path="/messagelist" element={<MessageList />} />
          <Route path="/editinfo" element={<EditInfo />} />
          <Route path="/findingPW" element={<FindingPW />} />
          <Route path="/changePW" element={<ChangePW />} />
          {/* <Route path="/boards" element={<Community />} /> */}
          <Route path="/tickets/collections" element={<Collection />} />
          <Route
            path="/createpost"
            element={<CommunityArticleForm />}
          />
          <Route
            path="/posts/update/:no"
            element={<CommunityArticleUpdate />}
          />
          <Route
            path="/posts/:no"
            element={<CommunityArticleDetail />}
          />
          <Route
            path="/posts"
            element={<CommunityArticleListItem />}
          />
          <Route path="/tickets/collections/:musical_id"
            element={<MusicalReviewListItem />}
          />
     
        </>
      </Routes>
    </Router>
  );
}

export default AppRouter;