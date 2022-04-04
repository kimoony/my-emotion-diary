import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyBtn from './MyBtn';
import "../styles/DiaryList.css";
import DiaryItem from './DiaryItem';

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "과거순" },
];

const filterOptionList = [
  { value: "all", name: "모든 감정" },
  { value: "good", name: "좋은 감정" },
  { value: "bad", name: "나쁜 감정" },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <div className="control-menu">
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {optionList.map((it, idx) => (
          <option key={idx} value={it.value}>
            {it.name}
          </option>
        ))}
      </select>
    </div>
  );
});


const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState('latest');
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {

    const filterCallback = (item) => {
      if (filter === 'good') {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    }

    const compare = (a, b) => {
      if (sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      };
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList = filter === 'all' ? (
      copyList
    ) : (
      copyList.filter((it) =>
        filterCallback(it)
      )
    );

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="list-container">
      <div className="control-wrapper">
        <div className="left_menu">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_menu">
          <MyBtn
            type={'POSITIVE'}
            text={'새 일기쓰기'}
            onClick={() => navigate('/new')}
          />
        </div>
      </div>
      <>
        {
          getProcessedDiaryList().map((it) => (
            <DiaryItem key={it.id} {...it} />
          ))
        }
      </>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;