import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import { getStringDate } from 'util/date';
import MyBtn from 'components/MyBtn';
import MyHeader from 'components/MyHeader';
import { emotionList } from 'util/emotion';
import 'styles/Diary.css';

const Diary = () => {
  const [data, setDate] = useState();

  const { id } = useParams()
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id))
      // console.log(targetDiary);
      if (targetDiary) {
        setDate(targetDiary);
      } else {
        navigate('/', { replace: true })
        alert("없는 일기 입니다.")
      }
    }
  }, [id, diaryList])


  if (!data) {
    return <div className="DiaryPage">로딩중...</div>
  } else {
    const currentEmotionData = emotionList.find((it) =>
      parseInt(it.emotion_id) === parseInt(data.emotion)
    )
    // console.log(currentEmotionData)

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 일기`}
          leftChild={<MyBtn
            text={"< 뒤로"}
            onClick={() => navigate(-1)}
          />}
          rightChild={<MyBtn
            text={"수정하기"}
            onClick={() => navigate(`/edit/${data.id}`)} />}
        />
        <article className="current-emotion">
          <section>
            <h4>오늘의 감정</h4>
            <div className={[
              "img_wrapper",
              `img_wrapper_${data.emotion}`
            ].join(" ")}>
              <img src={currentEmotionData.emotion_img} alt="" />
              <div className="emotion_descript">
                {currentEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    )
  }


}

export default Diary