import React, { useEffect } from 'react';
import DiaryEditor from "components/DiaryEditor"

const New = () => {
  useEffect(() => {
    const titleEl = document.querySelector('title');
    titleEl.innerText = `감정 일기장 - 새 일기`;
  }, [])

  return (
    <DiaryEditor />
  )
}

export default New