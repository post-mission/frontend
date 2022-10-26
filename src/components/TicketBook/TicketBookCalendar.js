import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Toolbar from "./TicketBookCalendarToolbar";
import { useNavigate } from 'react-router-dom';
import MyTicketBookCalendarModal from './TicketBookCalendarModal';

function TicketBookCalendar({ tickets }) {
  const localizer = momentLocalizer(moment)
  const [calendarTickets, setCalendarTickets] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalProps, setModalProps] = useState({});

  useEffect(()=> {
    if (Object.keys(tickets).length) {
      const updated_tickets = [];
      for (const monthKey in tickets) {
        const events = tickets[monthKey].map(ticket => {
          const start_time = new Date(ticket.watched_date)
          // const [t, m] = ticket.running_time.split(":")    // 추가
          const [t, m] = ["04", "00"]     
          const end_time = new Date(start_time);
          end_time.setHours(end_time.getHours() + parseInt(t))
          end_time.setMinutes(end_time.getMinutes() + parseInt(m))
          return {
            title: ticket.name,
            start: start_time,
            end: end_time,
            // allDay: true,
            resource: {
              ticket_id: ticket.id,
              poster_src: ticket.poster_path
            }
          }
        })
        updated_tickets.push(...events)
      }
      setCalendarTickets(updated_tickets)
    }
  }, [tickets])

  // poster 이미지
  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundImage : `url(${event.resource.poster_src})`,
        backgroundSize: "cover",
        overflow: "hidden",
      }
    }
  }

  const navigate = useNavigate();
  const onClickEvent = (event) => {
    onDateSelect(event)
  }

  const onTicketSelect = (event) => {
    let target = event.target
    while (!target.dataset.ticketid) {
      target = target.parentNode
    }
    const targetTicketId = target.dataset.ticketid
    navigate(`/ticketDetail/${targetTicketId}`)
  }

  const onDateSelect = (event) => {
    const selected_date = new Date(event.start)
    const [year, month, date] = [selected_date.getFullYear(), selected_date.getMonth()+1, selected_date.getDate()];
    const filterdTickets = tickets[`${year}-${month.toString().padStart(2, '0')}`].filter(ticket => {
      const targetDate = new Date(ticket.watched_date)
      return (
        targetDate.getFullYear() === year 
      && targetDate.getMonth() + 1 === month
      && targetDate.getDate() === date
    )})
    const ticketElems = filterdTickets.map((ticket, i) => {
      return (
      <div className='ticket-calendar-modal__inner-block' key={`ticket-${i}`} data-ticketId={`${ticket.id}`} onClick={onTicketSelect}>
        <h4>{ticket.name}</h4>
        <p>{`[${ticket.place}]`}</p>
        <p>{ticket.actors}</p>
      </div>
    )})
    const obj = {
      year: year,
      month: month,
      date: date,
      tickets: ticketElems,
    }
    setModalProps(obj);
  }

  useEffect(()=> {
    if (modalProps.year && modalProps.month && modalProps.date) {
      setModalShow(true);
    }
  }, [modalProps])

  return (
    <div>
      <MyTicketBookCalendarModal 
        show={modalShow} 
        onHide={() => setModalShow(false)}
        mp={modalProps} />

      <Calendar
        localizer={localizer}
        events={calendarTickets}
        style={{ height: window.screen.width > 400 ? "40rem" : "30rem" }}
        // allDayAccessor="allDay"
        components={{
          toolbar: Toolbar,
        }}
        // popup={true}
        // popupOffset={30}
        onSelectEvent={onClickEvent}
        views={{
          month: true,
          week: false,
        }}
        selectable
        onSelectSlot={onDateSelect}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
}

export default TicketBookCalendar;
