import React, { useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import "./ServiceRules.css"; // Custom CSS for styling

const initialRules = [
  {
    id: 1,
    type: "Pricing",
    name: "Weekend Surcharge",
    description: "Extra 20% charge on weekends",
    value: "20%",
  },
  {
    id: 2,
    type: "Availability",
    name: "Operating Hours",
    description: "Service available from 9 AM - 9 PM",
    value: "9 AM - 9 PM",
  },
  {
    id: 3,
    type: "Pricing",
    name: "Distance Fee",
    description: "Additional $10 for distances over 10 miles",
    value: "$10",
  },
];

const ServiceRules = () => {
  const [rules, setRules] = useState(initialRules);
  const [showModal, setShowModal] = useState(false);
  const [editRule, setEditRule] = useState(null);
  const [formData, setFormData] = useState({
    type: "Pricing",
    name: "",
    description: "",
    value: "",
  });

  const openModal = (rule = null) => {
    setEditRule(rule);
    setFormData(rule || { type: "Pricing", name: "", description: "", value: "" });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.description || !formData.value) {
      alert("All fields are required.");
      return;
    }

    if (editRule) {
      setRules((prevRules) =>
        prevRules.map((rule) =>
          rule.id === editRule.id ? { ...rule, ...formData } : rule
        )
      );
    } else {
      setRules([...rules, { id: rules.length + 1, ...formData }]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  return (
    <div className="table-container">
      <h2 className="text-center mb-4">Service Pricing & Availability Rules</h2>
      <Button variant="primary" onClick={() => openModal()} className="mb-3">
        Add Rule
      </Button>
      <div className="table-responsive">
        <Table bordered hover className="rules-table">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Name</th>
              <th>Description</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => (
              <tr key={rule.id}>
                <td>{rule.id}</td>
                <td>{rule.type}</td>
                <td>{rule.name}</td>
                <td>{rule.description}</td>
                <td>{rule.value}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => openModal(rule)}>
                    Edit
                  </Button>{" "}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(rule.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal for adding/editing rules */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editRule ? "Edit Rule" : "Add Rule"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="Pricing">Pricing</option>
                <option value="Availability">Availability</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Rule Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Value (e.g., $10, 20%)</Form.Label>
              <Form.Control
                type="text"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSave}>
            {editRule ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ServiceRules;
