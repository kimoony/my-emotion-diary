import React, { useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { DiaryDispatchContext } from '../App';
import MyBtn from './MyBtn'
import MyHeader from './MyHeader'
import '../styles/DiaryEditor.css'
import EmotionItem from './EmotionItem'


const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || ""

// 감정 선택을 위한 emotionList
const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: "완전 좋음"
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: "좋음"
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: "그럴저럭"
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: "나쁨"
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: "끔찍함"
  },
]

// 일기를 쓸 때 항상 오늘 날짜를 보여주기 위한 getStringDate
const getStringDate = (date) => {
  // toISOString 메소드는 ISO 형식의 문자열을 반환한다.
  // YYYY-MM-DDTHH:mm:ss.sssZ 또는 ±YYYYYY-MM-DDTHH:mm:ss.sssZ 이런형식으로 보여짐
  // 필요한건 YYYY-MM-DD 이기 때문에 slice를 사용해 짤라준다.
  return date.toISOString().slice(0, 10);
}

function DiaryEditor() {
  const navigate = useNavigate()

  // console.log(getStringDate(new Date()))
  const [date, setDate] = useState(getStringDate(new Date()))
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("")

  const contentRef = useRef()

  const handleClickEmote = (emotion) => {
    setEmotion(emotion)
  }

  const { onCreate } = useContext(DiaryDispatchContext);
  const handelSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus()
      return;
    }
    onCreate(date, content, emotion);
    navigate("/", { replace: true })
  }

  return (
    <div className="diaryEditor">
      <MyHeader
        headText={"새 일기쓰기"}
        leftChild={<MyBtn
          text={"< 뒤로"}
          onClick={() => navigate(-1)}
        />}
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input-box">
            <input
              className="input-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="emotion-list-wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                handleClickEmote={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="text_wrapper">
            <textarea
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="오늘 하루 어떠셨나요?"
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyBtn
              text={"취소"}
              onClick={() => navigate(-1)}
            />
            <MyBtn
              text={"작성완료"}
              type={'POSITIVE'}
              onClick={handelSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

export default DiaryEditor