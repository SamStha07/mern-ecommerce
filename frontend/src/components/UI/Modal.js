import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalForm = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant={props.variant} onClick={props.submitButton}>
            {props.button}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalForm;
