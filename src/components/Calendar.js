import React, { useEffect, useState } from "react";
import { getYear, getMonth } from "date-fns"; // getYear, getMonth
import DatePicker, { registerLocale } from "react-datepicker"; // 한국어적용
import ko from "date-fns/locale/ko"; // 한국어적용
registerLocale("ko", ko); // 한국어적용
const _ = require("lodash");

const Calendar = ({ userInfo, setUserInfo }) => {
  const [birthDate, setBirthDate] = useState(new Date());
  const years = _.range(1980, getYear(new Date()) + 1, 1); // 수정
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const getAge = (birthday) => {
    let today = new Date();
    let thisYear = today.getFullYear();
    let birthYear = birthday.getFullYear();
    let yearAge = thisYear - birthYear;
    let thisBirth = birthday.setFullYear(thisYear); //올해의 생일 timestamp로 반환
    if (today.getTime() > thisBirth) {
      yearAge--;
    }
    return yearAge + 1;
  };

  let birthday = new Date(birthDate);
  let age = getAge(birthday);
  // console.log(age);

  useEffect(() => {
    setUserInfo({ ...userInfo, age: age });
  }, [birthDate]);

  return (
    <DatePicker
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
      selected={birthDate}
      dateFormat={"yyyy-MM-dd"}
      locale={ko}
      onChange={(date) => setBirthDate(date)}
    />
  );
};

export default React.memo(Calendar);
