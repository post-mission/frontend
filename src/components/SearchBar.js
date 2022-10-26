import React, { useState } from "react";
import "../Community.scss";
import { useForm } from "react-hook-form";
import axios from "axios";

function SearchBar( {selectedCategory, getSearchData}) {

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => getSearch(data.name);
  const [searchResult, setSearchResult]  = useState([]);

  if ('제목'===selectedCategory) {
     var category = 'title'
  } else if ('제목+내용' === selectedCategory) {
    category = 'both'
  } else if ('말머리' === selectedCategory) {
    category ='header'
  } 

  const getSearch = (query) => {
    axios
      .get(`http://i6a302.p.ssafy.io:8080/posts/search?category=${category}&query=${query}`, {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYUBuYXZlci5jb20iLCJleHAiOjE2NDUzMjA3MDQsInVzZXJJZCI6MSwidXNlcm5hbWUiOiJhYUBuYXZlci5jb20ifQ.MInlKdYkfe4AP3J5iASZYsWdor70cFb4QI7Qi9P_-iMknuZopq051CbhJNpw3FNP2ZusFo3ID_OQeyI5Tkt1dQ`,
        },
      })
      .then((res) => {
        setSearchResult(res.data.data);
        getSearchData(res.data.data);
      })
  }

  return (
    <div className="searchbar-table">
      <form className="searchbar-input-form" onSubmit={handleSubmit(onSubmit)}>
        <input 
          type="text"
          {...register("name")}
        />
        <input className="searchbar-button" type="submit" value="검색"/>
      </form>
    </div>
  );
}

export default SearchBar;