import React from "react";
import { Link } from "react-router-dom";
import CommunityArticleListItem from "../components/Community/CommunityArticleListItem";
import CommunityToggle from "./CommunityToggle";

function Community() {
  return (
    <div style={{ paddingTop: "56px" }}>
      <CommunityToggle />
      <CommunityArticleListItem />
    </div>
  );
}

export default Community;