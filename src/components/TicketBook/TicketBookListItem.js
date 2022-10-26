import React from "react";
import { useNavigate } from "react-router-dom";

function TicketBookListItem({ ticketInfo }) {
  const navigate = useNavigate();
  // console.log(ticketInfo)
  const date = new Date(ticketInfo.watched_date);
  const [y, mon, d] = [date.getFullYear(), date.getMonth()+1, date.getDate()];
  const dateString = `${y}년 ${mon}월 ${d}일 ${ticketInfo.watched_date.slice(11,16)}`;

  return (
    <>
      <div className="col col1">
        <svg className="month-marker"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 10 50" shapeRendering="crispEdges">
          <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
          <path stroke="#1b5e20" d="M4 0h2M4 1h2M4 2h2M4 3h2M4 4h2M4 5h2M4 6h2M4 7h2M4 8h2M4 9h2M4 10h2M4 11h2M4 12h2M4 13h2M4 14h2M4 15h2M4 16h2M4 17h2M4 18h2M4 19h2M4 20h2M4 21h2M3 22h4M2 23h6M2 24h6M2 25h6M2 26h6M3 27h4M4 28h2M4 29h2M4 30h2M4 31h2M4 32h2M4 33h2M4 34h2M4 35h2M4 36h2M4 37h2M4 38h2M4 39h2M4 40h2M4 41h2M4 42h2M4 43h2M4 44h2M4 45h2M4 46h2M4 47h2M4 48h2M4 49h2" />
        </svg>
      </div>
      <div className="col col2 ticket-wrapper">
        <div className="ticket"
          onClick={() => navigate(`/ticketDetail/${ticketInfo.id}`)}>
          <svg className="ticket__ticket-shape"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 100 43" shapeRendering="crispEdges">
            <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
            <path 
            stroke={ticketInfo.make_color}
            d="M6 1h92M6 2h92M6 3h92M6 4h92M6 5h88M2 6h92M2 7h92M2 8h92M2 9h96M6 10h92M6 11h92M6 12h92M6 13h92M2 14h92M2 15h92M2 16h92M2 17h92M6 18h92M6 19h92M6 20h92M6 21h92M2 22h92M2 23h92M2 24h92M2 25h92M6 26h92M6 27h92M6 28h92M6 29h92M2 30h92M2 31h92M2 32h92M2 33h92M6 34h92M6 35h92M6 36h92M6 37h92M2 38h92M2 39h92M2 40h92M2 41h92" />
          </svg>
            <div className="ticket__inner-wrapper">
              <h2><span className="ticket__ticket-info">{ ticketInfo.name }</span></h2>
              <p><span className="ticket__ticket-info">{ dateString }</span></p>
              <p><span className="ticket__ticket-info">{"["}{ ticketInfo.place }{"]"}</span></p>
              <p><span className="ticket__ticket-info">{ ticketInfo.actors }</span></p>
            </div>
        </div>
      </div>
    </>
    
  );
}

export default TicketBookListItem;
