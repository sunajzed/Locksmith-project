import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import "./LocksmithAvailability.css"; // Custom CSS
import api from '../../../api/api';

const LocksmithAvailability = () => {
  const [message, setMessage] = useState(null);
  const [locksmithId, setLocksmithId] = useState(null);
  const [isAvailable, setIsAvailable] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setLocksmithId(username);
      fetchAvailability();
    }
  }, []);

  const fetchAvailability = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setMessage({ type: "danger", text: "Unauthorized. Please log in." });
        return;
      }

      const response = await api.get("/api/locksmiths/locksmithform_val/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setIsAvailable(response.data.is_available);
    } catch (error) {
      setMessage({ type: "danger", text: "Failed to fetch availability status." });
      console.error("Error fetching availability status:", error);
    }
  };

  const handleAvailability = async (endpoint, status) => {
    if (!locksmithId) {
      setMessage({ type: "warning", text: "Locksmith ID not found. Please log in." });
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setMessage({ type: "danger", text: "Unauthorized. Please log in." });
        return;
      }

      await api.post(endpoint, {}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setIsAvailable(status === "open");
      setMessage({
        type: status === "open" ? "success" : "info",
        text: status === "open" ? "You are now Open to Service!" : "You are marked as Not Available.",
      });
    } catch (error) {
      setMessage({ type: "danger", text: `Failed to update status to ${status === "open" ? "Open to Service" : "Not Available"}.` });
      console.error("Error updating availability status:", error);
    }
  };

  return (
    <Container className="availability-container">
      <h2 className="text-center">Locksmith Availability</h2>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <Card className="status-card">
        <Card.Body>
          <h4>Status:</h4>
          <div className={`status-box ${isAvailable ? "available" : "not-available"}`}>
            {isAvailable === null ? "Are You Available?" : isAvailable ? "Open to Service" : "Not Available"}
          </div>
        </Card.Body>
      </Card>
      <Form>
        <Button
          variant="success"
          className="mt-3 btn-sm custom-button"
          onClick={() => handleAvailability("/api/locksmiths/mark_open_to_work/", "open")}
        >
          Open to Service
        </Button>
        <Button
          variant="danger"
          className="mt-3 btn-sm custom-button"
          onClick={() => handleAvailability("/api/locksmiths/mark_not_available/", "closed")}
        >
          Not Available
        </Button>
      </Form>
    </Container>
  );
};

export default LocksmithAvailability;
