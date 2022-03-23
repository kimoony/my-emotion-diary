import React from 'react'
import "../styles/EmotionItem.css";

function EmotionItem({ emotion_id, emotion_img, emotion_descript, handleClickEmote, isSelected }) {
  return (
    <div
      className={[
        "emotion-item",
        isSelected ? `emotion-item_on_${emotion_id}` : `emotion-item_off`,
      ].join(" ")}
      onClick={() => handleClickEmote(emotion_id)}
    >
      <img src={emotion_img} alt="emotion" />
      <span>{emotion_descript}</span>
    </div>
  )
}

export default EmotionItem