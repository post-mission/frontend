import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

function CollectionSearchBar( { placeholder, data }) {

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    console.log(event.target.value);
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      console.log('데이터', data);
      return value.musical_id.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return ( 
    <div className="search">
    <div className="searchInputs">
      <input
        type="text"
        placeholder={placeholder}
        value={wordEntered}
        onChange={handleFilter}
      />
      <div className="searchIcon">
        {filteredData.length === 0 ? (
          <FaSearch />
        ) : (
          <MdOutlineClose id="clearBtn" onClick={clearInput} />
        )}
      </div>
    </div>
    {filteredData.length != 0 && (
      <div className="dataResult">
        {filteredData.slice(0, 15).map((value, key) => {
          return (
            <a className="dataItem" href={value.link}>
              <p>{value.musical_id} </p>
            </a>
          );
        })}
      </div>
    )}
  </div>
  );
}

export default CollectionSearchBar;