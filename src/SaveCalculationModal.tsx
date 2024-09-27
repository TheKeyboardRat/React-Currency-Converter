import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SaveToLocalStorage from './SaveCalculation';

function ShowModal(props: any) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function handleSave(e:any) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form).get("txtNotes");
    var text = "";
    if(formData != null) text = formData.toString();
    SaveToLocalStorage(props, text);
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Save data
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notes</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSave}>
        <Modal.Body>
        <textarea name='txtNotes' className="form-control" id='txtNotes' rows={3}></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type='submit' variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ShowModal;