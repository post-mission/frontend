import Modal from 'react-bootstrap/Modal';

function TicketDeleteCheckModal(props) {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className='ticket-delete-modal-header'>
            <p>이 티켓을 정말 삭제할까요?</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='ticket-delete-modal'>
            <button className='ticket-delete-modal__delete-button my-btn'
                onClick={props.onDelete}>
              삭제
            </button>
            <button className='ticket-delete-modal__cancel-button my-btn'
                onClick={props.onHide}>
              취소
            </button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  export default TicketDeleteCheckModal;