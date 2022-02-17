import React from 'react'

const MyBtn = ({ text, type, onClick }) => {

  const btnType = ["POSITIVE", "NEGATIVE"].includes(type) ? type : "dafault"

  return (
    <button className={["MyBtn", `MyBtn_${btnType}`].join(" ")} onClick={onClick}>
      {text}
    </button>
  )
}

MyBtn.defaultProps = {
  type: "default",
}

export default MyBtn