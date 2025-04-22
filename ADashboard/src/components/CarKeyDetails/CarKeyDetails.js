import React, { useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import "./CarKeyDetails.css"; // Custom CSS

const initialKeys = [
  { id: 1, manufacturer: "Toyota", model: "Corolla", buttons: 3, years: "2015-2022" },
  { id: 2, manufacturer: "Honda", model: "Civic", buttons: 4, years: "2018-2023" },
  { id: 3, manufacturer: "Ford", model: "Focus", buttons: 2, years: "2014-2021" },
];

const CarKeyDetails = () => {
  const [keys, setKeys] = useState(initialKeys);
  const [editKey, setEditKey] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (key) => {
    setEditKey(key);
    setShowModal(true);
  };

  const handleUpdate = () => {
    setKeys(keys.map((k) => (k.id === editKey.id ? editKey : k)));
    setShowModal(false);
  };

  return (
    <div className="car-key-container">
      <h2 className="text-center mb-4">Car Key Details</h2>
      <div className="table-responsive">
        <Table bordered hover className="car-key-table">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Manufacturer</th>
              <th>Model</th>
              <th>Buttons</th>
              <th>Years</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((key) => (
              <tr key={key.id}>
                <td>{key.id}</td>
                <td>{key.manufacturer}</td>
                <td>{key.model}</td>
                <td>{key.buttons}</td>
                <td>{key.years}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(key)}>
                    Update
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Update Form in Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Car Key</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Manufacturer</Form.Label>
              <Form.Control
                type="text"
                value={editKey?.manufacturer || ""}
                onChange={(e) => setEditKey({ ...editKey, manufacturer: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                value={editKey?.model || ""}
                onChange={(e) => setEditKey({ ...editKey, model: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Number of Buttons</Form.Label>
              <Form.Control
                type="number"
                value={editKey?.buttons || ""}
                onChange={(e) => setEditKey({ ...editKey, buttons: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Years</Form.Label>
              <Form.Control
                type="text"
                value={editKey?.years || ""}
                onChange={(e) => setEditKey({ ...editKey, years: e.target.value })}
              />
            </Form.Group>
            <Button variant="success" onClick={handleUpdate}>
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CarKeyDetails;
