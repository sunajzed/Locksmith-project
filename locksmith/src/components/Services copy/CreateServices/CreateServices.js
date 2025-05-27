import React, { useState, useEffect } from "react";
import api from "../../../api/api";
import {
  Form,
  Button,
  Container,
  Alert,
  Tooltip,
  OverlayTrigger,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { TbInfoTriangle } from "react-icons/tb";
import "./CreateServices.css";

const CreateService = () => {
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [additionalKeyPrice, setAdditionalKeyPrice] = useState("");
  const [makeKeysAtSite, setMakeKeysAtSite] = useState(false);
  const [details, setDetails] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [message, setMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  // Automotive-specific states
  const [carDetails, setCarDetails] = useState([]);
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [yearRange, setYearRange] = useState("");
  const [numberOfButtons, setNumberOfButtons] = useState("");
  const [numberOfButtonsOptions, setNumberOfButtonsOptions] = useState([]);

  const serviceTypes = [
    "smart_lock",
    "automotive",
    "commercial",
    "residential",
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          setMessage({ type: "danger", text: "Unauthorized. Please log in." });
          return;
        }

        if (serviceType) {
          const response = await api.get(
            `/api/admin/services/available_services/?service_type=${serviceType}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          setServices(response.data);
        } else {
          setServices([]);
        }
      } catch (error) {
        setMessage({ type: "danger", text: "Failed to fetch services." });
        console.error(error);
      }
    };

    fetchServices();
    setSelectedServiceId("");
    setSelectedService("");
  }, [serviceType]);

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (serviceType === "automotive") {
        try {
          const accessToken = localStorage.getItem("accessToken");
          const response = await api.get("/api/car-key-details/", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setCarDetails(response.data);
        } catch (error) {
          setMessage({ type: "danger", text: "Failed to fetch car details." });
          console.error(error);
        }
      } else {
        setCarDetails([]);
        setManufacturer("");
        setModel("");
        setYearRange("");
        setNumberOfButtons("");
        setNumberOfButtonsOptions([]);
      }
    };

    fetchCarDetails();
  }, [serviceType]);

  useEffect(() => {
    if (selectedService.toLowerCase() === "key duplication") {
      setMakeKeysAtSite(true);
    } else {
      setMakeKeysAtSite(false);
    }
  }, [selectedService]);

  const handleServiceChange = (e) => {
    const selectedId = e.target.value;
    const service = services.find((s) => s.id.toString() === selectedId);
    setSelectedServiceId(selectedId);
    setSelectedService(service ? service.name : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedServiceId || !customPrice || !details || !serviceType) {
      setMessage({ type: "warning", text: "Please fill in all required fields." });
      return;
    }

    const price = parseFloat(customPrice);
    if (isNaN(price) || price <= 0) {
      setMessage({
        type: "warning",
        text: "Invalid price. Please enter a valid number.",
      });
      return;
    }

    if (makeKeysAtSite) {
      if (!additionalKeyPrice) {
        setMessage({
          type: "warning",
          text: "Please provide an additional key price or uncheck 'Do you make keys at site?'.",
        });
        return;
      }
      const addKeyPrice = parseFloat(additionalKeyPrice);
      if (isNaN(addKeyPrice) || addKeyPrice <= 0) {
        setMessage({
          type: "warning",
          text: "Invalid additional key price. Please enter a valid number.",
        });
        return;
      }
    }

    if (serviceType === "automotive") {
      if (!manufacturer || !model || !yearRange || !numberOfButtons) {
        setMessage({
          type: "warning",
          text: "Please fill in all automotive fields.",
        });
        return;
      }
      const yearRangeRegex = /^\d{4}-\d{4}$/;
      if (!yearRangeRegex.test(yearRange)) {
        setMessage({
          type: "warning",
          text: "Invalid year range format. Use YYYY-YYYY (e.g., 2010-2015).",
        });
        return;
      }
      const [yearFrom, yearTo] = yearRange.split("-").map(Number);
      if (yearFrom >= yearTo || isNaN(yearFrom) || isNaN(yearTo)) {
        setMessage({
          type: "warning",
          text: "Invalid year range. Start year must be less than end year.",
        });
        return;
      }
    }

    setShowModal(true);
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (isConfirmed) {
      submitServiceData();
    }
  }, [isConfirmed]);

  const submitServiceData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setMessage({ type: "danger", text: "Unauthorized. Please log in." });
        return;
      }

      const [yearFrom, yearTo] = yearRange ? yearRange.split("-").map(Number) : [null, null];

      const newService = {
        admin_service_id: Number(selectedServiceId),
        service_name: selectedService,
        custom_price: parseFloat(customPrice),
        details,
        service_type: serviceType,
        additional_key_price: makeKeysAtSite && additionalKeyPrice
          ? parseFloat(additionalKeyPrice)
          : 0,
        ...(serviceType === "automotive" && {
          car_key_details: {
            manufacturer,
            model,
            year_from: yearFrom,
            year_to: yearTo,
            number_of_buttons: parseInt(numberOfButtons),
          },
        }),
      };

      await api.post("/api/services/", newService, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setMessage({ type: "success", text: "Service added successfully!" });

      setSelectedService("");
      setSelectedServiceId("");
      setCustomPrice("");
      setAdditionalKeyPrice("");
      setMakeKeysAtSite(false);
      setDetails("");
      setServiceType("");
      setManufacturer("");
      setModel("");
      setYearRange("");
      setNumberOfButtons("");
      setNumberOfButtonsOptions([]);
      setIsConfirmed(false);
    } catch (error) {
      console.error("Error:", error);
      setMessage({
        type: "danger",
        text: error.response?.data?.message || "Failed to add service.",
      });
      setIsConfirmed(false);
    }
  };

  const uniqueManufacturers = [...new Set(carDetails.map((car) => car.manufacturer))];

  const modelsForManufacturer = manufacturer
    ? [...new Set(
        carDetails
          .filter((car) => car.manufacturer === manufacturer)
          .map((car) => car.model)
      )]
    : [];

  const yearRangeOptions = manufacturer && model
    ? [...new Set(
        carDetails
          .filter((car) => car.manufacturer === manufacturer && car.model === model)
          .map((car) => `${car.year_from}-${car.year_to}`)
          .filter(range => range !== "null-null")
      )].sort()
    : [];

  // Updated useEffect to handle multiple number of buttons without auto-filling
  useEffect(() => {
    if (manufacturer && model && yearRange) {
      const [yearFrom, yearTo] = yearRange.split("-").map(Number);
      const matchingCars = carDetails.filter(
        (car) =>
          car.manufacturer === manufacturer &&
          car.model === model &&
          car.year_from === yearFrom &&
          car.year_to === yearTo
      );

      // Collect all unique number_of_buttons values
      const buttonOptions = [
        ...new Set(matchingCars.map((car) => car.number_of_buttons.toString())),
      ].sort();

      setNumberOfButtonsOptions(buttonOptions);

      // Do not auto-fill if there are multiple options
      if (buttonOptions.length === 1) {
        setNumberOfButtons(buttonOptions[0]); // Auto-fill only if there's exactly one option
      } else {
        setNumberOfButtons(""); // Keep it empty to show the placeholder
      }
    } else {
      setNumberOfButtons("");
      setNumberOfButtonsOptions([]);
    }
  }, [manufacturer, model, yearRange, carDetails]);

  return (
    <Container className="create-service-container py-4">
      <h2 className="text-center mb-4">Create a New Service</h2>

      {message && (
        <Alert variant={message.type} className="text-center">
          {message.text}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Service Type</Form.Label>
              <Form.Select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
              >
                <option value="">-- Select Type --</option>
                {serviceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Available Services</Form.Label>
              <Form.Select
                value={selectedServiceId}
                onChange={handleServiceChange}
                disabled={!serviceType}
              >
                <option value="">-- Select Service --</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>
                Your Price (AUD)
                {/* <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip>
                      Includes: 10% GST + 10% service fee + $40 platform fee
                    </Tooltip>
                  }
                >
                  <TbInfoTriangle
                    className="ms-2 text-info"
                    style={{ cursor: "pointer" }}
                  />
                </OverlayTrigger> */}
              </Form.Label>
              <Form.Control
                type="number"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                min="1"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Do you make keys at site?"
                checked={makeKeysAtSite}
                onChange={(e) => {
                  setMakeKeysAtSite(e.target.checked);
                  if (!e.target.checked) {
                    setAdditionalKeyPrice("");
                  }
                }}
              />
            </Form.Group>
            {makeKeysAtSite && (
              <Form.Group>
                <Form.Label>Key Price ($)</Form.Label>
                <Form.Control
                  type="number"
                  value={additionalKeyPrice}
                  onChange={(e) => setAdditionalKeyPrice(e.target.value)}
                  min="1"
                  required={makeKeysAtSite}
                />
              </Form.Group>
            )}
          </Col>
        </Row>

        {serviceType === "automotive" && (
          <>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Manufacturer</Form.Label>
                  <Form.Select
                    value={manufacturer}
                    onChange={(e) => {
                      setManufacturer(e.target.value);
                      setModel("");
                      setYearRange("");
                      setNumberOfButtons("");
                      setNumberOfButtonsOptions([]);
                    }}
                  >
                    <option value="">-- Select Manufacturer --</option>
                    {uniqueManufacturers.map((mfr) => (
                      <option key={mfr} value={mfr}>
                        {mfr}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Model</Form.Label>
                  <Form.Select
                    value={model}
                    onChange={(e) => {
                      setModel(e.target.value);
                      setYearRange("");
                      setNumberOfButtons("");
                      setNumberOfButtonsOptions([]);
                    }}
                    disabled={!manufacturer}
                  >
                    <option value="">-- Select Model --</option>
                    {modelsForManufacturer.map((mdl) => (
                      <option key={mdl} value={mdl}>
                        {mdl}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Year Range</Form.Label>
                  <Form.Select
                    value={yearRange}
                    onChange={(e) => {
                      setYearRange(e.target.value);
                      setNumberOfButtons("");
                      setNumberOfButtonsOptions([]);
                    }}
                    disabled={!manufacturer || !model}
                  >
                    <option value="">-- Select Year Range --</option>
                    {yearRangeOptions.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Number of Buttons</Form.Label>
                  <Form.Select
                    value={numberOfButtons}
                    onChange={(e) => setNumberOfButtons(e.target.value)}
                    disabled={!manufacturer || !model || !yearRange || numberOfButtonsOptions.length === 0}
                  >
                    <option value="">-- Select Number of Buttons --</option>
                    {numberOfButtonsOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Details</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          style={{
            backgroundColor: "#6c5ce7",
            borderColor: "#6c5ce7",
            color: "white",
            transition: "all 0.3s ease",
            fontWeight: "500",
            letterSpacing: "0.5px",
            boxShadow: "none",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#6c5ce7";
            e.currentTarget.style.boxShadow = "0 0 0 2px #6c5ce7";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#6c5ce7";
            e.currentTarget.style.color = "white";
            e.currentTarget.style.boxShadow = "none";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.backgroundColor = "#5649c0";
            e.currentTarget.style.borderColor = "#5649c0";
            e.currentTarget.style.color = "white";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#6c5ce7";
          }}
        >
          Add Service
        </Button>
      </Form>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Service Price</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-warning" role="alert">
            ⚠️ Please ensure you have included GST if applicable.
          </div>
          This is the base price before adding platform fees. Proceed?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CreateService;