import styled from 'styled-components';
import Tags from './Tags';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
const SearchDiv = styled.div`
  padding: 10px;
  .searchWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 800px;
    label {
      margin: 10px;
      font-size: 20px;
      font-weight: 700;
      flex: 1 1 7%;
    }
    span {
      margin: 10px;
      font-size: 50px;
      font-weight: 700;
      cursor: pointer;
      flex: 1 1 8%;
    }
    input {
      flex: 1 1 85%;
      margin: 10px auto;
      width: 650px;
      padding: 20px;
      border-radius: 12px;
      font-size: 20px;
      border: 5px solid black;
      filter: text-shadow(0px 2px 0px red);
    }
  }
`;

const Search = () => {
  // let defaultTag = () => {};
  const [tagExample, setTagExample] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const inputVal = useRef();
  // useEffect
  const tag = {
    restaurant: [
      '맛집',
      '추천',
      '내돈내산',
      '돈쭐',
      '존맛',
      '짱맛',
      '대존맛',
      '친구',
      '남친',
      '여친',
      '가족',
      '분위기',
      '오지는',
      '가성비',
      '미쳤음',
      '미친놈',
    ],
    local_cafe: [
      '카페',
      '커피',
      '커피맛',
      '베이커리',
      '사진',
      '미쳤음',
      '사진찍기',
      '인생샷',
      '미친놈',
      '친구',
      '분위기',
      '내돈내산',
    ],
    shopping_cart: ['제품', '추천', '내돈내산', '가성비', '친구선물', '미쳤음'],
    map: [
      '여행지',
      '뷰개쩌는',
      '남친',
      '여친',
      '친구',
      '가족',
      '분위기좋은',
      '아늑한',
      '가성비',
      '사진',
      '포토스팟',
      '조용한',
      '뷰좋은',
      '내돈내산',
    ],
  };
  const randomTags = (t) => {
    let result = [];
    if (t === 'shopping_cart') {
      return [...tag[t]];
    }
    for (let i = 0; i < 10; i++) {
      let tmp = tag[t][Math.floor(Math.random() * tag[t].length)];
      if (result.includes(tmp) === false) {
        result.push(tmp);
        if (result.length === 5) {
          return result;
        }
      }
    }
  };
  const addTag = (e) => {
    setSearchValue(`${searchValue} ${e.target.textContent}`);
    setTagExample(tagExample.filter((el) => el !== e.target.textContent));
    inputVal.current.value = `${searchValue} ${e.target.textContent}`;
  };
  const handleinput = (e) => {
    if (e.key === 'Enter') {
      console.log(e.target.value);
      onSearch();
    } else {
      setSearchValue(e.target.value);
    }
  };
  const onSearch = async () => {
    if (searchValue === '') {
      return;
    }
    // let uri = encodeURI(searchValue);
    // console.log(uri);
    const result = await axios
      .get(` http://localhost:4000/search/blog?query=${searchValue}`)

      .then(({ data }) => console.log(data.items))
      .catch((err) => console.log(err));
    //process.env.REACT_APP_CLIENT_ID
    //process.env.REACT_APP_CLIENT_SECRET
    console.log(result);
    //ㅎㅎ 그럴줄알았다 cors.......gg....
  };
  return (
    <SearchDiv className='Search'>
      <div className='searchWrapper'>
        <label htmlFor='searchInput'>검색</label>
        <input
          type='text'
          id='searchInput'
          placeholder='검색할 내용을 입력해주세요'
          onKeyUp={handleinput}
          ref={inputVal}
        />
        <span className='material-icons' onClick={onSearch}>
          search
        </span>
      </div>
      <Tags
        tagExample={tagExample}
        setTagExample={setTagExample}
        randomTags={randomTags}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        addTag={addTag}
      />
    </SearchDiv>
  );
};

export default Search;
