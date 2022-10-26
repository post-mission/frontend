import React, { useEffect, useState } from "react";
import { Route, useNavigate, useParams } from "react-router-dom";
import { MdAllInbox, MdReorder } from "react-icons/md";

function CommunityToggle() {

  const { route } = useParams();
  const navigate = useNavigate();

  const isCommunity = route === "posts" ? true : false;

  const onClick = () => {
    navigate(`${isCommunity ? "/posts" : "/tickets/collections"}`)
  };
  
  return (
    <div className="wrapper">
      <header className="board-header">
        <h1>
          {isCommunity ? "자유 게시판" : "작품 모음집"} 
        </h1>
        <button className="community-swtich-btn" onClick={onClick}>
          {isCommunity ? <MdReorder /> : <MdAllInbox />}
        </button>
      </header>
 
    </div>
  );
}

export default CommunityToggle;