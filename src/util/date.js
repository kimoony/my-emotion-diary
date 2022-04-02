// 일기를 쓸 때 항상 오늘 날짜를 보여주기 위한 getStringDate
export const getStringDate = (date) => {
  // toISOString 메소드는 ISO 형식의 문자열을 반환한다.
  // YYYY-MM-DDTHH:mm:ss.sssZ 또는 ±YYYYYY-MM-DDTHH:mm:ss.sssZ 이런형식으로 보여짐
  // 필요한건 YYYY-MM-DD 이기 때문에 slice를 사용해 짤라준다.
  return date.toISOString().slice(0, 10);
}