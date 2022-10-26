import React, { useEffect, useState } from "react";
import { Route, useNavigate, useParams } from "react-router-dom";
import TicketBookList from "../components/TicketBook/TicketBookList";
import TicketBookCalendar from "../components/TicketBook/TicketBookCalendar";
import { MdCalendarToday, MdList } from "react-icons/md";
import axios from "axios";

function TicketBook() {
  const { route } = useParams();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState({});
  const [monthKeys, setMonthKeys] = useState([]);

  const isCalendar = route === "calendar" ? true : false;
  const SERVER_URL = process.env.REACT_APP_SERVER_URL
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${SERVER_URL}/tickets/list`,
      headers: { Authorization : `Bearer ${localStorage.getItem('token')}`} })
    .then(res => {
      const data = res.data.data;
      if (data === null || data === undefined) return;
      const keys = Object.keys(data);
      const sorted_tickets = {};
      for (const key of keys) {
        const sorted = [...data[key]].sort((a, b) => new Date(b.watched_date) - new Date(a.watched_date) || b.id - a.id);
        sorted_tickets[key] = sorted;
      }
      setTickets(sorted_tickets)
    })
    .catch(err => console.error(err))
  }, [])


  useEffect(() => {
    const keys = Object.keys(tickets);
    keys.sort((a, b) => new Date(b) - new Date(a))
    setMonthKeys(keys);
    
  }, [tickets])
  
  const onClick = () => {
    navigate(`/ticketbook/${isCalendar ? "list" : "calendar"}`)
  };
  
  return (
    <div className="wrapper">
      <header className="ticketBook-header">
        <h1>
          {"[ "} {isCalendar ? "나의 티켓 달력" : "나의 티켓 리스트"} {" ]"}
        </h1>
        <button className="my-btn" onClick={onClick}>
          {isCalendar ? <MdList /> : <MdCalendarToday />}
        </button>
      </header>
      {
      isCalendar ? (
        <TicketBookCalendar
          tickets={tickets}
          monthKeys={monthKeys}
        />
      ) : (
        <TicketBookList tickets={tickets} monthKeys={monthKeys} />
      )}
    </div>
  );
}

export default TicketBook;
