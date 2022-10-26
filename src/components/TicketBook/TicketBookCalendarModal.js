import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function MyVerticallyCenteredModal(props) {
  const navigate = useNavigate();
  const onClickAddTicket = (event) => {
    navigate('/ticketform', { state: { watch_datetime : `${props.mp.year}-${props.mp.month.toString().padStart(2, "0")}-${props.mp.date.toString().padStart(2, "0")}T12:00`}})
  }
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {`${props.mp.year}년 ${props.mp.month}월 ${props.mp.date}일`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.mp.tickets}
          <div className='ticket-calendar-modal__inner-block' onClick={onClickAddTicket}>
            + 티켓 추가하기 +
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  export default MyVerticallyCenteredModal;