import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from '../App';
import MyBtn from './MyBtn';
import MyHeader from './MyHeader';
import 'styles/DiaryEditor.css';
import EmotionItem from './EmotionItem';
import { getStringDate } from 'util/date';
import { emotionList } from 'util/emotion';


function DiaryEditor({ isEdit, originData }) {
  const navigate = useNavigate()

  // console.log(getStringDate(new Date()))
  const [date, setDate] = useState(getStringDate(new Date()))
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("")

  const contentRef = useRef()

  const handleClickEmote = (emotion) => {
    setEmotion(emotion)
  }

  const { onCreate, onEdit } = useContext(DiaryDispatchContext);
  const handelSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus()
      return;
    }

    if (window.confirm(
      isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
    )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }
    navigate("/", { replace: true })
  }

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))))
      setEmotion(originData.emotion)
      setContent(originData.content)
    }
  }, [isEdit, originData])

  return (
    <div className="diaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
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
              text={isEdit ? "수정완료" : "작성완료"}
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