import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../util/constants";
import { getStringedDate } from "../util/get-stringed-date";


const Editor = ({ initData,onSubmit }) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: "",
    star:5,
    check:false,
  });

  const nav = useNavigate();

  useEffect(()=>{
    if(initData){
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
        check: Boolean(initData.check),
      });
    }
  },[initData])

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    if (name === "createdDate") {
      value = new Date(value);
    }
    if(name=="star"){
      value=Number(value);
    }


    setInput({
      ...input,
      [name]: value,
    });
  };

  const onSubmitButtonClick = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="check_section">
        <h4>했는가</h4>
        <input
          name="check" 
          type="checkbox"
          checked={input.check}
          onChange={onChangeInput}
        />
      </section>
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate"
          onChange={onChangeInput}
          value={getStringedDate(input.createdDate)}
          type="date"
        />
      </section>
      <section className="star_section">
        <h4>중요도</h4>
        <input
          name="star"
          onChange={onChangeInput}
          value={Number(input.star)}
          type="number"
        />  
      </section>
      <section className="emotion_section">
        <h4>종류</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() =>
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>할 일</h4>
        <textarea
          name="content"
          onChange={onChangeInput}
          placeholder="할 일"
        />
      </section>
      <section className="button_section">
        <Button onClick={() => nav(-1)} text={"취소하기"} />
        <Button
          onClick={onSubmitButtonClick}
          text={"작성완료"}
          type={"POSITIVE"}
        />
      </section>
    </div>
  );
};

export default Editor;