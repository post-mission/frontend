import { useState, useEffect } from "react";
import "./Collection.scss";
import axios from "axios";
import { set } from "react-hook-form";

const AutoComplete = ( {headerName, setHeaderName, headerinfoid, setHeaderinfoid} ) => {

  const [filteredSuggestions, setFilteredSuggestions] = useState({});
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");
  const [title, setTitle] = useState("");

  
  const [allData,setAllData] = useState({});
  const [headerinfo, setHeaderinfo] = useState({});

  const getHeader = headerId => {{
    console.log('말머리',headerName); //말머리

  }}

  useEffect (() => {
    if (getHeader != null){
      setInput(getHeader);
    }
  },[])
  const onChange = (e) => {
    setTitle(e.target.value);
    console.log(title);
    axios.get(`http://i6a302.p.ssafy.io:8080/musical/title?title=${title}`, {
      headers: {
        Authorization : `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => {
      const table = {};
      response.data.forEach(data => {{
        table[data.name] = data.id;

      }});
      setAllData(table);
      setHeaderinfo(table);
    });
  
    const userInput = e.target.value;
  
    // 유저의 입력값을 포함하지 않는 suggestions 을 필터한다
    // const unLinked = allData.filter(
    //   (allData) =>
    //     allData.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    // );
 
    setInput(e.target.value);
    setFilteredSuggestions(allData);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);

  };

  const onClick = (e) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
    setHeaderinfoid(e.target.id);
    getHeader(e.target.innerText);


  };

  const SuggestionsListComponent = () => {
    var keyList = [];
    var valueList = [];
    for(const key in filteredSuggestions) {
	    keyList.push(key);
	    valueList.push(filteredSuggestions[key]);
    }

    return keyList.length ? (
      <ul class="suggestions">
        
        {keyList.slice(0,5).map((suggestion, index) => {
          let className;
       
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }
          return (
            <li id={valueList[index]} className={className} key={suggestion} onClick={onClick}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <div class="no-suggestions">
        <em></em>
      </div>
    );
  }

  const debounce = (func, wait, leading = false) => {
    let inDebounce;
    return function() {
      const context = this;
      const args = arguments;
  
      // inDebounce 값이 변하기 전에 미리 저장하기 위해 사용
      let callNow = leading && !inDebounce;
  
      // leading이 아닌 경우에만 wait 이후 func가 실행되도록 함
      const later = () => {
        inDebounce = null;
        if (!leading) func.apply(context, args);
      };
  
      // setTimeout이 실행된 Timeout의 ID를 반환하고, clearTimeout()으로 이를 해제할 수 있음을 이용
      clearTimeout(inDebounce);
      inDebounce = setTimeout(later, wait);
  
      // 만약 leading=true이고 inDebounce가 없으면 func를 실행
      if (callNow) func.apply(context, args);
    };
  };
  return (
    <>
      <input
        id="header"
        type="text"
        onChange={onChange}
        onInput={(event) => debounce(setInput(event.target.value), 500)}
        value={input}
      />
      {showSuggestions && input && <SuggestionsListComponent />}
    </>
  );
};
export default AutoComplete;