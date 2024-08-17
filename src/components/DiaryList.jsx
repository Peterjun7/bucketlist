import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DiaryList = ({ data }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("priority");
  /*추가*/const [search,setSearch] = useState(""); 
  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };
  /*추가*/const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  /*const getSortedData = () => {
    return data.toSorted((a, b) => {
      if (sortType === "priority"){
        return Number(b.star) - Number(a.star);
      }
      if (sortType === "oldest") {
        return Number(a.createdDate) - Number(b.createdDate);
      } 
      if (sortType === "latest") {
        return Number(b.createdDate) - Number(a.createdDate);
      }
    });
  };*/
  const getFilteredAndSortedData = () => {
    let filteredData = data;

    // 필터링
    if (search !== "") {
        filteredData = filteredData.filter((todo) =>
            todo.content.toLowerCase().includes(search.toLowerCase())
        );
    }

    // 정렬
    return filteredData.toSorted((a, b) => {
        if (sortType === "priority") {
            return Number(b.star) - Number(a.star);
        }
        if (sortType === "oldest") {
            return Number(a.createdDate) - Number(b.createdDate);
        }
        if (sortType === "latest") {
            return Number(b.createdDate) - Number(a.createdDate);
        }
    });
  };

  const sortedData = getFilteredAndSortedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select value={sortType} onChange={onChangeSortType}>
          <option value={"priority"}>우선순위</option>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          onClick={() => nav("/new")}
          text={"버킷리스트 추가하기"}
          type={"POSITIVE"}
        />
      </div>
      <div className="search_wrapper">
      <input
            value={search}
            onChange={onChangeSearch}
            placeholder="검색어를 입력하세요" />
      </div> 
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;