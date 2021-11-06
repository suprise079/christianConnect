import React from 'react';

const SearchBar = ({keyword,setKeyword}) => {

  const styling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};

  return (
    <input 
     style={styling}
     key="random1"
     value={keyword}
     placeholder={"search fellowship"}
     onChange={(e) => setKeyword(e.target.value)}
    />
  );
}

export default SearchBar