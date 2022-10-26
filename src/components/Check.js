import React, { useEffect, useState } from "react";

function Check({ userInfo, setUserInfo }) {
  const formData = [
    { id: 1, name: "여자" },
    { id: 2, name: "남자" },
    // { id: 3, name: "기타" },
  ];

  const [isChecked, setIsChecked] = useState(false); // 체크 여부
  const [checkedItems, setCheckedItems] = useState(new Set());
  // console.log(checkedItems);
  const checkHandler = ({ target }) => {
    setIsChecked(!isChecked);
    checkedItemHandler(target.parentNode, target.value, target.checked);
  };
  const checkedItemHandler = (box, id, isChecked) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
    return checkedItems;
  };
  let array = Array.from(checkedItems);
  // console.log(array[0]);
  useEffect(() => {
    if (array) {
      if (array[0] === "여자") {
        setUserInfo({ ...userInfo, gender: "WOMAN" });
      } else if (array[0] === "남자") {
        setUserInfo({ ...userInfo, gender: "MAN" });
      }
      // else if (array[0] === "기타") {
      //   setUserInfo({ ...userInfo, gender: "ELSE" });
      // }
    }
  }, [isChecked]);

  return (
    <div>
      {formData.map((item) => (
        <label key={item.id}>
          <input
            type="checkbox"
            value={item.name}
            onChange={(e) => checkHandler(e)}
            style={{ marginLeft: "8px" }}
          />
          {item.name}
        </label>
      ))}
      {checkedItems.size > 1 ? (
        <div style={{ color: "red" }}>한가지 성별만 선택해주세요</div>
      ) : null}
    </div>
  );
}

export default React.memo(Check);
