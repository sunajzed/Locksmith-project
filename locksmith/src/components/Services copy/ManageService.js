import React, { useState } from "react";
import { Button, Table, Modal, Form, Card } from "react-bootstrap";
import "./ManageService.css"; // Custom CSS for styling

const adminPolicies = [
  "All services must have a minimum price of $50.",
  "Key duplication services are only allowed for authorized vehicles.",
  "Home lock repair services must include a warranty of at least 3 months.",
  "Smart lock installation requires an additional security assessment.",
];

const initialServices = [
  {
    id: 1,
    service: "Car Key Replacement",
    price: 100,
    manufacturer: "Toyota",
    model: "Camry",
    year: "2015-2022",
    keyFeatures: "Remote, Transponder",
  },
  {
    id: 2,
    service: "Home Lock Repair",
    price: 80,
    manufacturer: "N/A",
    model: "N/A",
    year: "N/A",
    keyFeatures: "Deadbolt, Smart Lock",
  },
  {
    id: 3,
    service: "Door Lock Installation",
    price: 120,
    manufacturer: "N/A",
    model: "N/A",
    year: "N/A",
    keyFeatures: "Electronic, Smart Keypad",
  },
];

const ManageService = () => {
  const [services, setServices] = useState(initialServices);
  const [showModal, setShowModal] = useState(false);
  const [editService, setEditService] = useState(null);
  const [formData, setFormData] = useState({
    service: "",
    price: "",
    manufacturer: "",
    model: "",
    year: "",
    keyFeatures: "",
  });

  const openModal = (service = null) => {
    setEditService(service);
    setFormData(
      service || { service: "", price: "", manufacturer: "", model: "", year: "", keyFeatures: "" }
    );
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.service || !formData.price) {
      alert("Service name and price are required.");
      return;
    }

    if (formData.price < 50) {
      alert("Price must be at least $50 as per policy.");
      return;
    }

    if (editService) {
      setServices((prev) =>
        prev.map((s) => (s.id === editService.id ? { ...s, ...formData } : s))
      );
    } else {
      setServices([...services, { id: services.length + 1, ...formData }]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    setServices(services.filter((s) => s.id !== id));
  };

  return (
    <div className="table-container">
      <h2 className="text-center mb-4">Locksmith Service Management</h2>

      {/* Rules & Policies Section */}
      <Card className="mb-3 policy-card">
        <Card.Header className="bg-dark text-white">Service Rules & Policies</Card.Header>
        <Card.Body>
          <ul>
            {adminPolicies.map((policy, index) => (
              <li key={index}>{policy}</li>
            ))}
          </ul>
        </Card.Body>
      </Card>

      <Button variant="primary" onClick={() => openModal()} className="mb-3">
        Add Service
      </Button>

      <div className="table-responsive">
        <Table bordered hover className="services-table">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Service</th>
              <th>Price ($)</th>
              <th>Manufacturer</th>
              <th>Model</th>
              <th>Year</th>
              <th>Key Features</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.service}</td>
                <td>${s.price}</td>
                <td>{s.manufacturer}</td>
                <td>{s.model}</td>
                <td>{s.year}</td>
                <td>{s.keyFeatures}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => openModal(s)}>
                    Edit
                  </Button>{" "}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(s.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal for adding/editing service */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editService ? "Edit Service" : "Add Service"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Service</Form.Label>
              <Form.Control
                type="text"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Manufacturer</Form.Label>
              <Form.Control
                type="text"
                value={formData.manufacturer}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                placeholder="Leave blank if not applicable"
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                placeholder="Leave blank if not applicable"
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="e.g., 2010-2022"
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Key Features</Form.Label>
              <Form.Control
                type="text"
                value={formData.keyFeatures}
                onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value })}
                placeholder="e.g., Remote, Smart Key"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSave}>
            {editService ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageService;
