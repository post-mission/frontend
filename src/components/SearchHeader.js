import React, { useState, useEffect } from "react";
import "../style.scss";
import axios from "axios";
import AutoComplete from "../routes/AutoComplete";

function SearchHeader() {

  const [allData,setAllData] = useState([]);

  const getHeader = (title) => {
    // axios('https://jsonplaceholder.typicode.com/albums/1/photos')
    axios.get(`http://i6a302.p.ssafy.io:8080/musical/title?title=${title}`, {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYUBuYXZlci5jb20iLCJleHAiOjE2NDUzMjA3MDQsInVzZXJJZCI6MSwidXNlcm5hbWUiOiJhYUBuYXZlci5jb20ifQ.MInlKdYkfe4AP3J5iASZYsWdor70cFb4QI7Qi9P_-iMknuZopq051CbhJNpw3FNP2ZusFo3ID_OQeyI5Tkt1dQ`,
      }
    })
    .then(response => {
      const names = response.data.map(data => data.name);
      console.log('ddd', names);
      setAllData(names);
    });
  }
  
  return (
    <form>
      <input 
        type="text"
        name="title"
        onChange={(e) => getHeader(e.target.value)}
      />
      <div className="auto-complete">
        <label htmlFor="titles">검색결과: {allData}</label>
      </div>
    </form>

    );
}

export default SearchHeader;


// import React, { useState, useEffect } from "react";
// import "../style.scss";
// import axios from "axios";

// // 키워드, 결과값들, 업데이트필드를 전달받는다
// const SearchHeader = ({ keyword, results, updateField }) => {

//   // 
//     const updateText = text => {
//         //console.log('update text', text);
//         updateField("keyword", text, false);
//         updateField("results", []);
//     };
    
//     var renderResults;
//     const arr = results['results'];
//     if(arr) {
//     // arr 에 검색어에 대한 결과가 담기면, SearchView 호출 
//     renderResults = arr.map((item => {
//             return (
//                 <SearchView
//                     updateText={updateText}
//                     name={item.name}
//                     code={item.code}
//                     key={item.code}
//                 />
//             );
//         }));
//     }
//     // onChange를 사용하여 글자를 입력할때마다 updateField호출하고 renderResults를 그린다.
//     return (
//         <div className="auto">
//             <input
//                 className="search-bar"
//                 placeholder="Search"
//                 value={keyword || ''}
//                 onChange={e => updateField("keyword", e.target.value)}
//             />
//             <div className="search-results">{renderResults}</div>
//         </div>
//     );
// };

// // 검색된 아이템 "naem" "code" 출력
// // 결과값을 클릭하면 updateText를 호출하여 input에 name을 표시
// const SearchView = ({ name, code, index, updateText }) => {
//     //console.log('search view:', name);

//     return (
//       <div
//         onClick={() => updateText(name)}
//         className={`search-preview ${index === 0 ? "start" : ""}`}
//       >
//         <div className="first">
//           <p className="name">{name}</p>
//           <p className="code">{code}</p>
//         </div>
//       </div>
//     );
//   };

// export default SearchHeader;

