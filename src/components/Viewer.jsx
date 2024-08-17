import "./Viewer.css";
import {getEmotionImage} from "../util/get-emotion-image";
import { emotionList } from "../util/constants";

const Viewer = ({emotionId,content,star}) => {


    const emotionItem = emotionList.find(
        (item)=>String(item.emotionId) === String(emotionId)
    );

    return(
    <div className="Viewer">
        <section className="img_section">
            <h4>버킷리스트</h4>
            <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}>
                <img src={getEmotionImage(emotionId)} />
                <div>{emotionItem.emotionName}</div> 
            </div>
        </section>
        <section className="star_section">
            <h4>중요도</h4>
            <div className="star_wrapper">
                <p>{star}</p>
            </div>
        </section>
        <section className="content_section">
            <h4>하고싶은 일</h4>
            <div className="content_wrapper">
                <p>{content}</p>
            </div>
        </section>
    </div>
    );
};

export default Viewer;