import { useNavigate } from "react-router-dom";
import { getEmotionImage } from "../util/get-emotion-image";
import Button from "./Button";
import "./DiaryItem.css";
import { useEffect, useState } from "react";

const DiaryItem = ({ id, emotionId, createdDate, content,star,check }) => {
  /*추가*/
  const [isChecked, setIsChecked] = useState(check);
  const nav = useNavigate();
  /*추가*/
  // 컴포넌트가 마운트될 때 로컬 스토리지에서 체크박스 상태를 불러오기
  useEffect(() => {
    try {
      const savedCheckStatus = localStorage.getItem(`diary-check-${id}`);
      const parsedStatus = JSON.parse(savedCheckStatus);
  
      if (typeof parsedStatus === "boolean") {
        setIsChecked(parsedStatus);
      } else {
        throw new Error(`Invalid value in localStorage for id ${id}`);
      }
    } catch (error) {
      console.error(error.message);
      setIsChecked(false);
      localStorage.setItem(`diary-check-${id}`, JSON.stringify(false));
    }
  }, [id]);
  
  useEffect(() => {
    localStorage.setItem(`diary-check-${id}`, JSON.stringify(isChecked));
  }, [id, isChecked]);

  // 체크박스 상태 변경 처리 함수
  const handleCheckboxChange = () => {
    setIsChecked((prevCheck) => !prevCheck);
  };
  /*추가*/

  const goDiaryPage = () => {
    nav(`/diary/${id}`);
  };

  const goEditPage = () => {
    nav(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <input 
        type="checkbox" 
        checked={isChecked} 
        onChange={handleCheckboxChange}
      />

      <div
        onClick={goDiaryPage}
        className={`img_section img_section_${emotionId}`}
      >
        <img src={getEmotionImage(emotionId)} />
      </div>
      <div onClick={goDiaryPage} className="info_section">
        <div className="star">{star}</div>
        <div className="content">{content}</div>
        <div className="created_date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        
      </div>
      <div className="button_section">
        <Button onClick={goEditPage} text={"수정하기"} />
      </div>
    </div>
  );
};

export default DiaryItem;