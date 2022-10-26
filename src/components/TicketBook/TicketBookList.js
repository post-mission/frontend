import React, { useEffect, useState, useRef } from "react";
import TicketBookListItem from "./TicketBookListItem";
import TicketCreateBtn from "./TicketCreateBtn";
import TicketBookListMonthMarker from "./TicketBookListMonthMarker";

function TicketBookList({ tickets, monthKeys }) {
  const monthKeyToday = `${new Date().getFullYear()}-${(new Date().getMonth()+1).toString().padStart(2, '0')}`;

  const listWrapper = useRef();
  const moveToThis = useRef();

  useEffect(() => {
    setTimeout(() => {
      function getAbsoluteTop(element) {
        return window.pageYOffset + element.getBoundingClientRect().top;
      }

      const parentElem = listWrapper.current;
      const parentAbsoluteTop = getAbsoluteTop(parentElem);
      const absoulteTop = getAbsoluteTop(moveToThis.current);

      const relativeTop = absoulteTop - parentAbsoluteTop;
      listWrapper.current.scrollTo(0, relativeTop - 120);
    }, 100)
  }, []);
  
  return (
    <div className="ticket-list-item-wrapper" ref={listWrapper}>
      {
        !monthKeys.includes(monthKeyToday) 
        && 
        <>
          <TicketBookListMonthMarker monthKey={monthKeyToday} />
          <TicketCreateBtn />
        </>
      }
      
      {monthKeys.length ? 
        monthKeys.map((monthKey, i) => {
          return (
            <React.Fragment key={`monthKey-${monthKey}`}>
              <TicketBookListMonthMarker monthKey={monthKey} />
              {
                monthKey === monthKeyToday
                &&
                <TicketCreateBtn ref={moveToThis} />
              }

              {
                tickets[monthKey].map((ticketInfo, idx) => <TicketBookListItem key={`ticket-${monthKey}-${idx}`} ticketInfo={ticketInfo} />)
              }
            </React.Fragment>
          )
        })
      : ""}
    </div>
  );
}

export default TicketBookList;
