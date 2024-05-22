import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MdDelete } from "react-icons/md";

const DeleteModel = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
       <button
        className="btn btn-sm shadow-none border-none"
        onClick={handleShow}
      >
        <MdDelete />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm  p-3 btn-secondary text-danger-hover linkPadding"
            onClick={handleClose}>
            Close
          </Button>
          <Button
            className="btn btn-sm p-3 btn-danger text-danger-hover linkPadding"
            onClick={handleClose}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModel;
