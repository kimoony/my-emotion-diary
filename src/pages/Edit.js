import React from 'react'
import { useSearchParams } from 'react-router-dom';

const Edit = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const id = searchParams.get('id');
  console.log("id :", id)

  return (
    <div>
      <h2>Edit</h2>
      <p>이곳은 일기 편집페이지 입니다.</p>
    </div>
  )
}

export default Edit