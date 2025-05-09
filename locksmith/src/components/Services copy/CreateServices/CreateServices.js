// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import api from '../../../api/api';
// import { Form, Button, Container, Alert, Tooltip, OverlayTrigger, Row, Col, Modal } from "react-bootstrap";
// import { InfoCircle } from 'react-bootstrap-icons';
// import "./CreateServices.css";

// const CreateService = () => {
//   const [services, setServices] = useState([]);
//   const [selectedService, setSelectedService] = useState("");
//   const [selectedServiceId, setSelectedServiceId] = useState("");
//   const [customPrice, setCustomPrice] = useState("");
//   const [details, setDetails] = useState("");
//   const [serviceType, setServiceType] = useState("");
//   const [carKeyDetails, setCarKeyDetails] = useState({
//     manufacturer: "",
//     model: "",
//     year: "",
//     number_of_buttons: ""
//   });
//   const [message, setMessage] = useState(null);
//   const [showModal, setShowModal] = useState(false); // Modal state
//   const [isConfirmed, setIsConfirmed] = useState(false); // Confirmation state

//   const serviceTypes = ["smart_lock", "emergency", "automotive", "commercial", "residential"];

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const accessToken = localStorage.getItem("accessToken");
//         if (!accessToken) {
//           setMessage({ type: "danger", text: "Unauthorized. Please log in." });
//           return;
//         }

//         const response = await api.get("/api/admin/services/available_services/", {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });

//         setServices(response.data);
//       } catch (error) {
//         setMessage({ type: "danger", text: "Failed to fetch services." });
//         console.error("Error fetching services:", error.response?.data || error.message);
//       }
//     };

//     fetchServices();
//   }, []);

//   const handleServiceChange = (e) => {
//     const selectedId = e.target.value;
//     const service = services.find((s) => s.id.toString() === selectedId);
//     setSelectedServiceId(selectedId);
//     setSelectedService(service ? service.name : "");
//   };

//   const handleCarKeyDetailsChange = (e) => {
//     setCarKeyDetails({ ...carKeyDetails, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedServiceId || !customPrice || !details || !serviceType) {
//       setMessage({ type: "warning", text: "Please fill in all fields." });
//       return;
//     }

//     const price = parseFloat(customPrice);
//     if (isNaN(price) || price <= 0) {
//       setMessage({ type: "warning", text: "Invalid price. Enter a valid number." });
//       return;
//     }

//     // Trigger the modal confirmation instead of window.confirm
//     setShowModal(true);
//   };

//   const handleConfirm = () => {
//     setIsConfirmed(true);
//     setShowModal(false); // Close modal
//   };

//   const handleClose = () => {
//     setShowModal(false); // Close modal
//   };

//   useEffect(() => {
//     if (isConfirmed) {
//       submitServiceData();
//     }
//   }, [isConfirmed]);

//   const submitServiceData = async () => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         setMessage({ type: "danger", text: "Unauthorized. Please log in." });
//         return;
//       }

//       const newService = {
//         admin_service_id: Number(selectedServiceId),
//         service_name: selectedService,
//         custom_price: parseFloat(customPrice),
//         details,
//         service_type: serviceType,
//         ...(serviceType === "automotive" && { car_key_details: carKeyDetails })
//       };

//       console.log("Sending Data:", newService);

//       const response = await api.post("/api/services/", newService, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       console.log("Response:", response.data);

//       setMessage({ type: "success", text: "Service added successfully!" });
//       setSelectedService("");
//       setSelectedServiceId("");
//       setCustomPrice("");
//       setDetails("");
//       setServiceType("");
//       setCarKeyDetails({ manufacturer: "", model: "", year: "", number_of_buttons: "" });
//     } catch (error) {
//       console.error("Error adding service:", error.response?.data || error.message);
//       setMessage({ type: "danger", text: error.response?.data?.message || "Failed to add service." });
//     }
//   };

//   return (
//     <Container className="create-service-container">
//       <h2 className="text-center">Create a New Service</h2>
//       {message && <Alert variant={message.type}>{message.text}</Alert>}

//       <Form onSubmit={handleSubmit}>
//         <Row>
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Select Service</Form.Label>
//               <Form.Control as="select" value={selectedServiceId} onChange={handleServiceChange}>
//                 <option value="">-- Choose a Service --</option>
//                 {services.map((service) => (
//                   <option key={service.id} value={service.id}>
//                     {service.name}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//           </Col>

//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Service Type</Form.Label>
//               <Form.Control as="select" value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
//                 <option value="">-- Choose a Service Type --</option>
//                 {serviceTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//           </Col>
//         </Row>

//         {serviceType === "automotive" && (
//           <div className="automotive-section">
//             <h4 className="mt-4">Automotive Key Details</h4>
//             <Row>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Manufacturer</Form.Label>
//                   <Form.Control type="text" name="manufacturer" value={carKeyDetails.manufacturer} onChange={handleCarKeyDetailsChange} required />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Model</Form.Label>
//                   <Form.Control type="text" name="model" value={carKeyDetails.model} onChange={handleCarKeyDetailsChange} required />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Row>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Year</Form.Label>
//                   <Form.Control type="number" name="year" value={carKeyDetails.year} onChange={handleCarKeyDetailsChange} required />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Number of Buttons</Form.Label>
//                   <Form.Control type="number" name="number_of_buttons" value={carKeyDetails.number_of_buttons} onChange={handleCarKeyDetailsChange} required />
//                 </Form.Group>
//               </Col>
//             </Row>
//           </div>
//         )}

//         <Form.Group className="d-flex align-items-center mt-4">
//           <Form.Label className="mb-0">Custom Price ($)</Form.Label>
//           <OverlayTrigger
//             placement="top"
//             overlay={<Tooltip id="info-tooltip">The final displayed price will include: <br />- Locksmith’s price (Includes 10% GST) <br />- 10% service fee <br />- $40 platform fee</Tooltip>}
//           >
//             <InfoCircle
//               className="info-icon ms-2"
//               style={{
//                 color: '#007bff',
//                 fontSize: '1.3em',
//                 cursor: 'pointer',
//               }}
//             />
//           </OverlayTrigger>
//         </Form.Group>
//         <Form.Group>
//           <Form.Control type="number" value={customPrice} onChange={(e) => setCustomPrice(e.target.value)} min="1" required />
//         </Form.Group>

//         <Form.Group>
//           <Form.Label>Details</Form.Label>
//           <Form.Control as="textarea" rows={3} value={details} onChange={(e) => setDetails(e.target.value)} required />
//         </Form.Group>

//         <Button variant="dark" type="submit" className="mt-3 custom-button">
//           Add Service
//         </Button>
//       </Form>

//       {/* Confirmation Modal */}
//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Price Confirmation</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>
//             The price you entered is the base amount before the service fee and platform fee are added.
//             Are you sure you want to proceed with this price?
//           </p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleConfirm}>
//             Confirm
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default CreateService;

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
import { InfoCircle } from "react-bootstrap-icons";
import "./CreateServices.css";
import carDetails from "../../../utils/carDetails";

const CreateService = () => {
  
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [details, setDetails] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [message, setMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  
  
  const [carKeyDetails, setCarKeyDetails] = useState({
    manufacturer: "",
    model: "",
    year: "",
    number_of_buttons: "",
  });

  const serviceTypes = [
    "smart_lock",
    "emergency",
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

        const response = await api.get(
          "/api/admin/services/available_services/",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setServices(response.data);
      } catch (error) {
        setMessage({ type: "danger", text: "Failed to fetch services." });
        console.error(error);
      }
    };

    fetchServices();
  }, []);
  

  const handleServiceChange = (e) => {
    const selectedId = e.target.value;
    const service = services.find((s) => s.id.toString() === selectedId);
    setSelectedServiceId(selectedId);
    setSelectedService(service ? service.name : "");
  };

  const handleCarKeyDetailsChange = (e) => {
    setCarKeyDetails({ ...carKeyDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedServiceId || !customPrice || !details || !serviceType) {
      setMessage({ type: "warning", text: "Please fill in all fields." });
      return;
    }

    if (
      serviceType === "automotive" &&
      (!carKeyDetails.manufacturer ||
        !carKeyDetails.model ||
        !carKeyDetails.year ||
        !carKeyDetails.number_of_buttons)
    ) {
      setMessage({
        type: "warning",
        text: "Please complete all automotive details.",
      });
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

      const newService = {
        admin_service_id: Number(selectedServiceId),
        service_name: selectedService,
        custom_price: parseFloat(customPrice),
        details,
        service_type: serviceType,
      };

      if (serviceType === "automotive") {
        newService.car_key_details = {
          manufacturer: carKeyDetails.manufacturer,
          model: carKeyDetails.model,
          year: carKeyDetails.year,
          number_of_buttons: Number(carKeyDetails.number_of_buttons),
        };
      }

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
      setDetails("");
      setServiceType("");
      setCarKeyDetails({
        manufacturer: "",
        model: "",
        year: "",
        number_of_buttons: "",
      });
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
              <Form.Label>Available Services</Form.Label>
              <Form.Select
                value={selectedServiceId}
                onChange={handleServiceChange}
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
        </Row>

        {serviceType === "automotive" && (
          <>
            <h5 className="mt-4 mb-3">Automotive Key Details</h5>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Manufacturer</Form.Label>
                  <Form.Select
                    name="manufacturer"
                    value={carKeyDetails.manufacturer}
                    onChange={(e) => {
                      const manufacturer = e.target.value;
                      const modelsList = Object.keys(
                        carDetails[manufacturer] || {}
                      );
                      setCarKeyDetails({
                        manufacturer,
                        model: "",
                        year: "",
                        number_of_buttons: "",
                      });
                      setModels(modelsList);
                      setYears([]);
                    }}
                  >
                    <option value="">-- Select Manufacturer --</option>
                    {Object.keys(carDetails).map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Model</Form.Label>
                  <Form.Select
                    name="model"
                    value={carKeyDetails.model}
                    onChange={(e) => {
                      const model = e.target.value;
                      const yearRanges =
                        carDetails[carKeyDetails.manufacturer]?.[model] || [];
                      const flattenedYears = [];

                      yearRanges.forEach((range) => {
                        for (let y = range.yearFrom; y <= range.yearTo; y++) {
                          flattenedYears.push({
                            year: y,
                            buttons: range.buttons,
                          });
                        }
                      });

                      setCarKeyDetails({
                        ...carKeyDetails,
                        model,
                        year: "",
                        number_of_buttons: "",
                      });
                      setYears(flattenedYears);
                    }}
                    disabled={!models.length}
                  >
                    <option value="">-- Select Model --</option>
                    {models.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Year</Form.Label>
                  <Form.Select
                    value={carKeyDetails.year}
                    onChange={(e) => {
                      const selectedYear = e.target.value;
                      const yearOptions = years.filter(
                        (y) => String(y.year) === selectedYear
                      );
                      setCarKeyDetails({
                        ...carKeyDetails,
                        year: selectedYear,
                        number_of_buttons:
                          yearOptions.length === 1
                            ? String(yearOptions[0].buttons)
                            : "",
                      });
                    }}
                    disabled={!years.length}
                  >
                    <option value="">-- Select Year --</option>
                    {[...new Set(years.map((y) => y.year))]
                      .sort((a, b) => a - b)
                      .map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Number of Buttons</Form.Label>
                  {carKeyDetails.year ? (
                    [...new Set(
                      years
                        .filter((y) => String(y.year) === carKeyDetails.year)
                        .map((y) => y.buttons)
                    )].length > 1 ? (
                      <Form.Select
                        value={carKeyDetails.number_of_buttons}
                        onChange={(e) =>
                          setCarKeyDetails({
                            ...carKeyDetails,
                            number_of_buttons: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="">-- Select Buttons --</option>
                        {[...new Set(
                          years
                            .filter((y) => String(y.year) === carKeyDetails.year)
                            .map((y) => y.buttons)
                        )].map((buttons) => (
                          <option key={buttons} value={buttons}>
                            {buttons}
                          </option>
                        ))}
                      </Form.Select>
                    ) : (
                      <Form.Control
                        type="number"
                        value={
                          years.find(
                            (y) => String(y.year) === carKeyDetails.year
                          )?.buttons || ""
                        }
                        readOnly
                      />
                    )
                  ) : (
                    <Form.Control type="number" disabled value="" />
                  )}
                </Form.Group>
              </Col>
            </Row>
          </>
        )}

        <Form.Group className="mb-3 mt-3">
          <Form.Label>
            Custom Price ($)
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip>
                  Includes: 10% GST + 10% service fee + $40 platform fee
                </Tooltip>
              }
            >
              <InfoCircle className="ms-2 text-info" style={{ cursor: "pointer" }} />
            </OverlayTrigger>
          </Form.Label>
          <Form.Control
            type="number"
            value={customPrice}
            onChange={(e) => setCustomPrice(e.target.value)}
            min="1"
            required
          />
        </Form.Group>

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

        <Button variant="primary" type="submit" className="w-100">
          Add Service
        </Button>
      </Form>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Service Price</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
