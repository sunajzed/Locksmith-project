import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Commission.css";
import { Button, Form, Alert, Spinner } from "react-bootstrap";
import api from "../../api/api";

const SetCommission = () => {
  const [commissionAmount, setCommissionAmount] = useState("");
  const [percentage, setPercentage] = useState("");
  const [gstPercentage, setGstPercentage] = useState(""); // 🆕 New state
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (!accessToken || userRole !== "admin") {
      navigate("/login");
      return;
    }

    fetchCommissionSettings();
  }, [navigate]);

  const fetchCommissionSettings = async () => {
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await api.get("/api/adminsettings/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status === 200 && response.data.length > 0) {
        const settings = response.data[0];
        setCommissionAmount(settings.commission_amount);
        setPercentage(settings.percentage);
        setGstPercentage(settings.gst_percentage || ""); // 🆕 Populate gst
        setIsNew(false);
      }
    } catch (error) {
      console.error("Error fetching commission settings:", error);
      setMessage("Failed to load commission settings.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSetCommission = async () => {
    if (!commissionAmount || isNaN(commissionAmount) || commissionAmount < 0) {
      setMessage("Please enter a valid commission amount.");
      setIsError(true);
      return;
    }

    if (
      !percentage ||
      isNaN(percentage) ||
      percentage < 0 ||
      percentage > 100
    ) {
      setMessage("Please enter a valid percentage (0-100).");
      setIsError(true);
      return;
    }

    if (
      !gstPercentage ||
      isNaN(gstPercentage) ||
      gstPercentage < 0 ||
      gstPercentage > 100
    ) {
      setMessage("Please enter a valid GST percentage (0-100).");
      setIsError(true);
      return;
    }

    const accessToken = localStorage.getItem("accessToken");

    const payload = {
      commission_amount: parseFloat(commissionAmount),
      percentage: parseFloat(percentage),
      gst_percentage: parseFloat(gstPercentage),
      platform_status: "active",
    };

    try {
      if (isNew) {
        await api.post("/api/adminsettings/", payload, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        setIsNew(false);
        setMessage("Commission settings added successfully.");
      } else {
        await api.put("/api/adminsettings/1/", payload, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        setMessage("Commission settings updated successfully.");
      }
      setIsError(false);
    } catch (error) {
      console.error("Error saving commission settings:", error);
      setMessage("Failed to save commission settings. Please try again.");
      setIsError(true);
    }
  };

  return (
    <div className="commission-container">
      <h2 className="text-center mb-4">Set Commission Settings</h2>
      <div className="commission-form">
        {message && (
          <Alert
            variant={isError ? "danger" : "success"}
            onClose={() => setMessage("")}
            dismissible
          >
            {message}
          </Alert>
        )}

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="dark" />
            <p>Loading commission settings...</p>
          </div>
        ) : (
          <>
            <Form.Group className="mb-3" controlId="commissionAmount">
              <Form.Label>
                <b>Commission Amount</b>
              </Form.Label>
              <Form.Control
                type="number"
                value={commissionAmount}
                onChange={(e) => setCommissionAmount(e.target.value)}
                placeholder="Enter commission amount"
                min="0"
                step="0.01"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="percentage">
              <Form.Label>
                <b>Percentage</b>
              </Form.Label>
              <Form.Control
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                placeholder="Enter percentage"
                min="0"
                max="100"
                step="0.01"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="gstPercentage">
              <Form.Label>
                <b>GST Percentage</b>
              </Form.Label>
              <Form.Control
                type="number"
                value={gstPercentage}
                onChange={(e) => setGstPercentage(e.target.value)}
                placeholder="Enter GST percentage"
                min="0"
                max="100"
                step="0.01"
              />
            </Form.Group>

            {isNew ? (
              <Button variant="success" onClick={handleSetCommission}>
                Add
              </Button>
            ) : (
              <Button variant="dark" onClick={handleSetCommission}>
                Update
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SetCommission;
