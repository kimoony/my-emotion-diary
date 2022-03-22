import React from 'react';
import '../styles/DiaryItem.css';
import MyBtn from './MyBtn';
import { useNavigate } from 'react-router-dom';

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

function DiaryItem({ id, emotion, content, date }) {
  const navigate = useNavigate();

  const strdate = new Date(parseInt(date)).toLocaleDateString()

  const goDetail = () => {
    navigate(`/diary/${id}`)
  }

  const goEdit = () => {
    navigate(`/edit/${id}`)
  }
  return (
    <div className="diary_item">
      <div className={[
        "emotion_img_wrapper",
        `emotion_img_wrapper_${emotion}`
      ].join(" ")}
        onClick={goDetail}
      >
        <img src={process.env.PUBLIC_URL + `/assets/emotion${emotion}.png`} />
      </div>
      <div className="info_wraaper" onClick={goDetail}>
        <div className="diary_date">
          {strdate}
        </div>
        <div className="diary_content">
          {content.slice(0, 25)}
        </div>
      </div>
      <div className="btn_wrapper">
        <MyBtn text={"수정하기"} onClick={goEdit} />
      </div>
    </div>
  )
}

export default DiaryItem