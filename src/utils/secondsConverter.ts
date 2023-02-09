/**
 * 입력값 3:3 | 12:12:12
 * 3자리의 string으로 된 시간을 밀리세컨드로 변환하는 함수.
 */
export default (str: string): number => {
  const splitStr = str.split(":");
  const second = 1;
  const minute = second * 60;
  const hour = minute * 60;
  let micoSecond = 0;
  if (splitStr.length === 0) return;
  // youtube 영상의 최대길이가 12시간이라 3자리 까지만 처리.
  // 이전의 12시간을 넘는 영상은 처리 x
  if (splitStr.length === 3) {
    micoSecond += parseInt(splitStr[0]) * hour;
    micoSecond += parseInt(splitStr[1]) * minute;
    micoSecond += parseInt(splitStr[2]);
  }

  if (splitStr.length === 2) {
    micoSecond += parseInt(splitStr[0]) * minute;
    micoSecond += parseInt(splitStr[1]);
  }

  if (splitStr.length === 1) {
    micoSecond += parseInt(splitStr[0]);
  }

  return micoSecond;
};
