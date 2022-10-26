import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";

const TicketCreateBtn = React.forwardRef((props, ref) => {
    
  // 라우팅 위한 코드
  const navigate = useNavigate();
  const goToTicketForm = () => navigate("/ticketform");

//   const moveToThis = useRef();

//   useEffect(() => {
//     let isComponentMounted = true;
//     const pos = moveToThis.current.getBoundingClientRect();
//     console.log(pos)
//     if (isComponentMounted) {
//         setTargetHeight(pos.top)
//     }

//     // listWrapper.current.scrollTo(0, -pos.top);
//     // console.log(divToFocus)
//     return () => isComponentMounted = false;
//   }, []);

  return (
    <>
        <div className="col col1" 
        ref={ref}
        >
            <svg
            className="month-marker"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -0.5 10 50"
            shapeRendering="crispEdges"
            >
            <path
            stroke="#1b5e20"
            d="M4 0h2M4 1h2M4 2h2M4 3h2M4 4h2M4 5h2M4 6h2M4 7h2M4 8h2M4 9h2M4 10h2M4 11h2M4 12h2M4 13h2M4 14h2M4 15h2M4 16h2M4 17h2M4 18h2M4 19h2M4 20h2M4 21h2M3 22h4M2 23h6M2 24h6M2 25h6M2 26h6M3 27h4M4 28h2M4 29h2M4 30h2M4 31h2M4 32h2M4 33h2M4 34h2M4 35h2M4 36h2M4 37h2M4 38h2M4 39h2M4 40h2M4 41h2M4 42h2M4 43h2M4 44h2M4 45h2M4 46h2M4 47h2M4 48h2M4 49h2"
            />
            </svg>
        </div>
        <div className="col col2 ticket-wrapper">
        <button
            id="ticketCreateBtn"
            className="ticket"
            onClick={goToTicketForm}
        >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -0.5 100 43"
            shapeRendering="crispEdges"
            >
            <path
                stroke="#000000"
                d="M6 0h92M5 1h1M98 1h1M5 2h1M98 2h1M5 3h1M98 3h1M5 4h1M98 4h1M2 5h4M94 5h4M1 6h1M94 6h1M1 7h1M94 7h1M1 8h1M94 8h4M1 9h1M98 9h1M2 10h4M98 10h1M5 11h1M98 11h1M5 12h1M50 12h1M98 12h1M2 13h4M50 13h1M94 13h5M1 14h1M50 14h1M94 14h1M1 15h1M50 15h1M94 15h1M1 16h1M50 16h1M94 16h1M1 17h1M50 17h1M94 17h4M2 18h4M50 18h1M98 18h1M5 19h1M50 19h1M98 19h1M5 20h1M42 20h17M98 20h1M2 21h4M50 21h1M98 21h1M1 22h1M50 22h1M94 22h4M1 23h1M50 23h1M94 23h1M1 24h1M50 24h1M94 24h1M1 25h1M50 25h1M94 25h4M2 26h4M50 26h1M98 26h1M5 27h1M50 27h1M98 27h1M5 28h1M50 28h1M98 28h1M2 29h4M98 29h1M1 30h1M94 30h4M1 31h1M94 31h1M1 32h1M94 32h1M1 33h1M94 33h4M2 34h4M98 34h1M5 35h1M98 35h1M5 36h1M98 36h1M2 37h4M98 37h1M1 38h1M94 38h4M1 39h1M94 39h1M1 40h1M94 40h1M1 41h1M94 41h1M2 42h92"
            />
            </svg>
        </button>
        </div>
    </>
  )
});


export default TicketCreateBtn;