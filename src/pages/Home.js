import React, { useState, useContext, useEffect } from 'react';
import MyHeader from '../components/MyHeader';
import MyBtn from '../components/MyBtn';
import DiaryList from '../components/DiaryList';
import { DiaryStateContext } from '../App';

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setDate] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    if (diaryList.length > 0) {
      const firstDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1,
      ).getTime()
      const lastDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
      ).getTime()

      setDate(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay))
    }
  }, [diaryList, currentDate]);

  useEffect(() => {
    console.log(data)
  }, [data])

  const headText = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`

  const increaseMonth = () => {
    setCurrentDate(new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate()
    ))
  }
  const decreaseMonth = () => {
    setCurrentDate(new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      currentDate.getDate()
    ))
  }

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyBtn text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyBtn text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={diaryList} />
    </div>
  )
}

export default Home