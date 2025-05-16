// import React, { useState, useEffect } from "react";
// import api from "../../../api/api";
// import {
//   Form,
//   Button,
//   Container,
//   Alert,
//   Tooltip,
//   OverlayTrigger,
//   Row,
//   Col,
//   Modal,
// } from "react-bootstrap";
// import { TbInfoTriangle } from "react-icons/tb";
// import "./CreateServices.css";
// import carDetails from "../../../utils/carDetails";

// const CreateService = () => {
  
//   const [services, setServices] = useState([]);
//   const [selectedServiceId, setSelectedServiceId] = useState("");
//   const [selectedService, setSelectedService] = useState("");
//   const [customPrice, setCustomPrice] = useState("");
//   const [details, setDetails] = useState("");
//   const [serviceType, setServiceType] = useState("");
//   const [message, setMessage] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [isConfirmed, setIsConfirmed] = useState(false);
//   const [models, setModels] = useState([]);
//   const [years, setYears] = useState([]);
  
  
//   const [carKeyDetails, setCarKeyDetails] = useState({
//     manufacturer: "",
//     model: "",
//     year: "",
//     number_of_buttons: "",
//   });

//   const serviceTypes = [
//     "smart_lock ",
//     "emergency",
//     "automotive",
//     "commercial",
//     "residential",
//   ];

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const accessToken = localStorage.getItem("accessToken");
//         if (!accessToken) {
//           setMessage({ type: "danger", text: "Unauthorized. Please log in." });
//           return;
//         }

//         const response = await api.get(
//           "/api/admin/services/available_services/",
//           {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           }
//         );
//         setServices(response.data);
//       } catch (error) {
//         setMessage({ type: "danger", text: "Failed to fetch services." });
//         console.error(error);
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

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!selectedServiceId || !customPrice || !details || !serviceType) {
//       setMessage({ type: "warning", text: "Please fill in all fields." });
//       return;
//     }

//     if (
//       serviceType === "automotive" &&
//       (!carKeyDetails.manufacturer ||
//         !carKeyDetails.model ||
//         !carKeyDetails.year ||
//         !carKeyDetails.number_of_buttons)
//     ) {
//       setMessage({
//         type: "warning",
//         text: "Please complete all automotive details.",
//       });
//       return;
//     }

//     const price = parseFloat(customPrice);
//     if (isNaN(price) || price <= 0) {
//       setMessage({
//         type: "warning",
//         text: "Invalid price. Please enter a valid number.",
//       });
//       return;
//     }

//     setShowModal(true);
//   };

//   const handleConfirm = () => {
//     setIsConfirmed(true);
//     setShowModal(false);
//   };

//   const handleClose = () => {
//     setShowModal(false);
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
//       };

//       if (serviceType === "automotive") {
//         newService.car_key_details = {
//           manufacturer: carKeyDetails.manufacturer,
//           model: carKeyDetails.model,
//           year: carKeyDetails.year,
//           number_of_buttons: Number(carKeyDetails.number_of_buttons),
//         };
//       }

//       await api.post("/api/services/", newService, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       setMessage({ type: "success", text: "Service added successfully!" });

//       setSelectedService("");
//       setSelectedServiceId("");
//       setCustomPrice("");
//       setDetails("");
//       setServiceType("");
//       setCarKeyDetails({
//         manufacturer: "",
//         model: "",
//         year: "",
//         number_of_buttons: "",
//       });
//       setIsConfirmed(false);
//     } catch (error) {
//       console.error("Error:", error);
//       setMessage({
//         type: "danger",
//         text: error.response?.data?.message || "Failed to add service.",
//       });
//       setIsConfirmed(false);
//     }
//   };

//   return (
//     <Container className="create-service-container py-4">
//       <h2 className="text-center mb-4">Create a New Service</h2>

//       {message && (
//         <Alert variant={message.type} className="text-center">
//           {message.text}
//         </Alert>
//       )}

//       <Form onSubmit={handleSubmit}>
//         <Row className="mb-3">
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Service Type</Form.Label>
//               <Form.Select
//                 value={serviceType}
//                 onChange={(e) => setServiceType(e.target.value)}
//               >
//                 <option value="">-- Select Type --</option>
//                 {serviceTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Available Services</Form.Label>
//               <Form.Select
//                 value={selectedServiceId}
//                 onChange={handleServiceChange}
//               >
//                 <option value="">-- Select Service --</option>
//                 {services.map((service) => (
//                   <option key={service.id} value={service.id}>
//                     {service.name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>
//         </Row>

//         {serviceType === "automotive" && (
//           <>
//             <h5 className="mt-4 mb-3">Automotive Key Details</h5>
//             <Row className="mb-3">
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Manufacturer</Form.Label>
//                   <Form.Select
//                     name="manufacturer"
//                     value={carKeyDetails.manufacturer}
//                     onChange={(e) => {
//                       const manufacturer = e.target.value;
//                       const modelsList = Object.keys(
//                         carDetails[manufacturer] || {}
//                       );
//                       setCarKeyDetails({
//                         manufacturer,
//                         model: "",
//                         year: "",
//                         number_of_buttons: "",
//                       });
//                       setModels(modelsList);
//                       setYears([]);
//                     }}
//                   >
//                     <option value="">-- Select Manufacturer --</option>
//                     {Object.keys(carDetails).map((m) => (
//                       <option key={m} value={m}>
//                         {m}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Model</Form.Label>
//                   <Form.Select
//                     name="model"
//                     value={carKeyDetails.model}
//                     onChange={(e) => {
//                       const model = e.target.value;
//                       const yearRanges =
//                         carDetails[carKeyDetails.manufacturer]?.[model] || [];
//                       const flattenedYears = [];

//                       yearRanges.forEach((range) => {
//                         for (let y = range.yearFrom; y <= range.yearTo; y++) {
//                           flattenedYears.push({
//                             year: y,
//                             buttons: range.buttons,
//                           });
//                         }
//                       });

//                       setCarKeyDetails({
//                         ...carKeyDetails,
//                         model,
//                         year: "",
//                         number_of_buttons: "",
//                       });
//                       setYears(flattenedYears);
//                     }}
//                     disabled={!models.length}
//                   >
//                     <option value="">-- Select Model --</option>
//                     {models.map((model) => (
//                       <option key={model} value={model}>
//                         {model}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="mb-3">
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Year</Form.Label>
//                   <Form.Select
//                     value={carKeyDetails.year}
//                     onChange={(e) => {
//                       const selectedYear = e.target.value;
//                       const yearOptions = years.filter(
//                         (y) => String(y.year) === selectedYear
//                       );
//                       setCarKeyDetails({
//                         ...carKeyDetails,
//                         year: selectedYear,
//                         number_of_buttons:
//                           yearOptions.length === 1
//                             ? String(yearOptions[0].buttons)
//                             : "",
//                       });
//                     }}
//                     disabled={!years.length}
//                   >
//                     <option value="">-- Select Year --</option>
//                     {[...new Set(years.map((y) => y.year))]
//                       .sort((a, b) => a - b)
//                       .map((year) => (
//                         <option key={year} value={year}>
//                           {year}
//                         </option>
//                       ))}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Number of Buttons</Form.Label>
//                   {carKeyDetails.year ? (
//                     [...new Set(
//                       years
//                         .filter((y) => String(y.year) === carKeyDetails.year)
//                         .map((y) => y.buttons)
//                     )].length > 1 ? (
//                       <Form.Select
//                         value={carKeyDetails.number_of_buttons}
//                         onChange={(e) =>
//                           setCarKeyDetails({
//                             ...carKeyDetails,
//                             number_of_buttons: e.target.value,
//                           })
//                         }
//                         required
//                       >
//                         <option value="">-- Select Buttons --</option>
//                         {[...new Set(
//                           years
//                             .filter((y) => String(y.year) === carKeyDetails.year)
//                             .map((y) => y.buttons)
//                         )].map((buttons) => (
//                           <option key={buttons} value={buttons}>
//                             {buttons}
//                           </option>
//                         ))}
//                       </Form.Select>
//                     ) : (
//                       <Form.Control
//                         type="number"
//                         value={
//                           years.find(
//                             (y) => String(y.year) === carKeyDetails.year
//                           )?.buttons || ""
//                         }
//                         readOnly
//                       />
//                     )
//                   ) : (
//                     <Form.Control type="number" disabled value="" />
//                   )}
//                 </Form.Group>
//               </Col>
//             </Row>
//           </>
//         )}

//         <Form.Group className="mb-3 mt-3">
//           <Form.Label>
//             Custom Price ($)
//             <OverlayTrigger
//               placement="right"
//               overlay={
//                 <Tooltip>
//                   Includes: 10% GST + 10% service fee + $40 platform fee
//                 </Tooltip>
//               }
//             >
//               <TbInfoTriangle  className="ms-2 text-info" style={{ cursor: "pointer" }} />
//             </OverlayTrigger>
//           </Form.Label>
//           <Form.Control
//             type="number"
//             value={customPrice}
//             onChange={(e) => setCustomPrice(e.target.value)}
//             min="1"
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Details</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             value={details}
//             onChange={(e) => setDetails(e.target.value)}
//             required
//           />
//         </Form.Group>

//         {/* <Button variant="primary" type="submit" className="w-100">
//           Add Service
//         </Button> */}
//         <Button 
//   variant="primary" 
//   type="submit" 
//   className="w-100"
//   style={{
//     backgroundColor: '#6c5ce7', // Purple base color
//     borderColor: '#6c5ce7',
//     color: 'white',
//     transition: 'all 0.3s ease',
//     fontWeight: '500',
//     letterSpacing: '0.5px',
//     boxShadow: 'none'
//   }}
//   onMouseOver={(e) => {
//     e.currentTarget.style.backgroundColor = 'transparent';
//     e.currentTarget.style.color = '#6c5ce7';
//     e.currentTarget.style.boxShadow = '0 0 0 2px #6c5ce7';
//   }}
//   onMouseOut={(e) => {
//     e.currentTarget.style.backgroundColor = '#6c5ce7';
//     e.currentTarget.style.color = 'white';
//     e.currentTarget.style.boxShadow = 'none';
//   }}
//   onMouseDown={(e) => {
//     e.currentTarget.style.backgroundColor = '#5649c0';
//     e.currentTarget.style.borderColor = '#5649c0';
//     e.currentTarget.style.color = 'white';
//   }}
//   onMouseUp={(e) => {
//     e.currentTarget.style.backgroundColor = 'transparent';
//     e.currentTarget.style.color = '#6c5ce7';
//   }}
// >
//   Add Service
// </Button>
//       </Form>

//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Service Price</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           This is the base price before adding platform fees. Proceed?
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


// import React, { useState, useEffect } from "react";
// import api from "../../../api/api";
// import {
//   Form,
//   Button,
//   Container,
//   Alert,
//   Tooltip,
//   OverlayTrigger,
//   Row,
//   Col,
//   Modal,
// } from "react-bootstrap";
// import { TbInfoTriangle } from "react-icons/tb";
// import "./CreateServices.css";

// const CreateService = () => {
//   const [services, setServices] = useState([]);
//   const [selectedServiceId, setSelectedServiceId] = useState("");
//   const [selectedService, setSelectedService] = useState("");
//   const [customPrice, setCustomPrice] = useState("");
//   const [additionalKeyPrice, setAdditionalKeyPrice] = useState("");
//   const [details, setDetails] = useState("");
//   const [serviceType, setServiceType] = useState("");
//   const [message, setMessage] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [isConfirmed, setIsConfirmed] = useState(false);
//   // Automotive-specific states
//   const [carDetails, setCarDetails] = useState([]);
//   const [manufacturer, setManufacturer] = useState("");
//   const [model, setModel] = useState("");
//   const [yearRange, setYearRange] = useState("");
//   const [numberOfButtons, setNumberOfButtons] = useState("");

//   const serviceTypes = [
//     "smart_lock",
//     "emergency",
//     "automotive",
//     "commercial",
//     "residential",
//   ];

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const accessToken = localStorage.getItem("accessToken");
//         if (!accessToken) {
//           setMessage({ type: "danger", text: "Unauthorized. Please log in." });
//           return;
//         }

//         const response = await api.get(
//           "/api/admin/services/available_services/",
//           {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           }
//         );
//         setServices(response.data);
//       } catch (error) {
//         setMessage({ type: "danger", text: "Failed to fetch services." });
//         console.error(error);
//       }
//     };

//     fetchServices();
//   }, []);

//   useEffect(() => {
//     const fetchCarDetails = async () => {
//       if (serviceType === "automotive") {
//         try {
//           const accessToken = localStorage.getItem("accessToken");
//           const response = await api.get("/api/car-key-details/", {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           });
//           setCarDetails(response.data);
//         } catch (error) {
//           setMessage({ type: "danger", text: "Failed to fetch car details." });
//           console.error(error);
//         }
//       } else {
//         setCarDetails([]);
//         setManufacturer("");
//         setModel("");
//         setYearRange("");
//         setNumberOfButtons("");
//       }
//     };

//     fetchCarDetails();
//   }, [serviceType]);

//   const handleServiceChange = (e) => {
//     const selectedId = e.target.value;
//     const service = services.find((s) => s.id.toString() === selectedId);
//     setSelectedServiceId(selectedId);
//     setSelectedService(service ? service.name : "");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!selectedServiceId || !customPrice || !details || !serviceType) {
//       setMessage({ type: "warning", text: "Please fill in all required fields." });
//       return;
//     }

//     const price = parseFloat(customPrice);
//     if (isNaN(price) || price <= 0) {
//       setMessage({
//         type: "warning",
//         text: "Invalid price. Please enter a valid number.",
//       });
//       return;
//     }

//     if (additionalKeyPrice) {
//       const addKeyPrice = parseFloat(additionalKeyPrice);
//       if (isNaN(addKeyPrice) || addKeyPrice <= 0) {
//         setMessage({
//           type: "warning",
//           text: "Invalid additional key price. Please enter a valid number.",
//         });
//         return;
//       }
//     }

//     if (serviceType === "automotive") {
//       if (!manufacturer || !model || !yearRange || !numberOfButtons) {
//         setMessage({
//           type: "warning",
//           text: "Please fill in all automotive fields.",
//         });
//         return;
//       }
//     }

//     setShowModal(true);
//   };

//   const handleConfirm = () => {
//     setIsConfirmed(true);
//     setShowModal(false);
//   };

//   const handleClose = () => {
//     setShowModal(false);
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

//       // Parse yearRange back to year_from and year_to
//       let year_from = null;
//       let year_to = null;
//       if (yearRange && yearRange !== "N/A") {
//         const [from, to] = yearRange.split("-").map(Number);
//         year_from = from;
//         year_to = to;
//       }

//       const newService = {
//         admin_service_id: Number(selectedServiceId),
//         service_name: selectedService,
//         custom_price: parseFloat(customPrice),
//         details,
//         service_type: serviceType,
//         additional_key_price: additionalKeyPrice
//           ? parseFloat(additionalKeyPrice)
//           : null,
//         ...(serviceType === "automotive" && {
//           car_key_details: {
//             manufacturer,
//             model,
//             year_from,
//             year_to,
//             number_of_buttons: parseInt(numberOfButtons),
//           },
//         }),
//       };

//       await api.post("/api/services/", newService, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       setMessage({ type: "success", text: "Service added successfully!" });

//       // Reset form
//       setSelectedService("");
//       setSelectedServiceId("");
//       setCustomPrice("");
//       setAdditionalKeyPrice("");
//       setDetails("");
//       setServiceType("");
//       setManufacturer("");
//       setModel("");
//       setYearRange("");
//       setNumberOfButtons("");
//       setIsConfirmed(false);
//     } catch (error) {
//       console.error("Error:", error);
//       setMessage({
//         type: "danger",
//         text: error.response?.data?.message || "Failed to add service.",
//       });
//       setIsConfirmed(false);
//     }
//   };

//   // Get unique manufacturers for dropdown
//   const uniqueManufacturers = [...new Set(carDetails.map((car) => car.manufacturer))];

//   // Get models for selected manufacturer
//   const modelsForManufacturer = manufacturer
//     ? [...new Set(
//         carDetails
//           .filter((car) => car.manufacturer === manufacturer)
//           .map((car) => car.model)
//       )]
//     : [];

//   // Get year ranges and number of buttons for selected manufacturer and model
//   const yearRanges = manufacturer && model
//     ? [...new Set(
//         carDetails
//           .filter((car) => car.manufacturer === manufacturer && car.model === model)
//           .map((car) => {
//             if (car.year_from && car.year_to) {
//               return `${car.year_from}-${car.year_to}`;
//             }
//             return "N/A";
//           })
//       )]
//     : [];

//   // Auto-select number of buttons based on selected year range
//   useEffect(() => {
//     if (manufacturer && model && yearRange) {
//       const selectedCar = carDetails.find(
//         (car) =>
//           car.manufacturer === manufacturer &&
//           car.model === model &&
//           (yearRange === "N/A"
//             ? car.year_from === null && car.year_to === null
//             : `${car.year_from}-${car.year_to}` === yearRange)
//       );
//       if (selectedCar) {
//         setNumberOfButtons(selectedCar.number_of_buttons.toString());
//       } else {
//         setNumberOfButtons("");
//       }
//     } else {
//       setNumberOfButtons("");
//     }
//   }, [manufacturer, model, yearRange, carDetails]);

//   return (
//     <Container className="create-service-container py-4">
//       <h2 className="text-center mb-4">Create a New Service</h2>

//       {message && (
//         <Alert variant={message.type} className="text-center">
//           {message.text}
//         </Alert>
//       )}

//       <Form onSubmit={handleSubmit}>
//         <Row className="mb-3">
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Service Type</Form.Label>
//               <Form.Select
//                 value={serviceType}
//                 onChange={(e) => setServiceType(e.target.value)}
//               >
//                 <option value="">-- Select Type --</option>
//                 {serviceTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Available Services</Form.Label>
//               <Form.Select
//                 value={selectedServiceId}
//                 onChange={handleServiceChange}
//               >
//                 <option value="">-- Select Service --</option>
//                 {services.map((service) => (
//                   <option key={service.id} value={service.id}>
//                     {service.name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>
//         </Row>

//         <Row className="mb-3">
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>
//                 Custom Price ($)
//                 <OverlayTrigger
//                   placement="right"
//                   overlay={
//                     <Tooltip>
//                       Includes: 10% GST + 10% service fee + $40 platform fee
//                     </Tooltip>
//                   }
//                 >
//                   <TbInfoTriangle
//                     className="ms-2 text-info"
//                     style={{ cursor: "pointer" }}
//                   />
//                 </OverlayTrigger>
//               </Form.Label>
//               <Form.Control
//                 type="number"
//                 value={customPrice}
//                 onChange={(e) => setCustomPrice(e.target.value)}
//                 min="1"
//                 required
//               />
//             </Form.Group>
//           </Col>
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Additional Key Price ($)</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={additionalKeyPrice}
//                 onChange={(e) => setAdditionalKeyPrice(e.target.value)}
//                 min="0"
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         {serviceType === "automotive" && (
//           <>
//             <Row className="mb-3">
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Manufacturer</Form.Label>
//                   <Form.Select
//                     value={manufacturer}
//                     onChange={(e) => {
//                       setManufacturer(e.target.value);
//                       setModel("");
//                       setYearRange("");
//                       setNumberOfButtons("");
//                     }}
//                   >
//                     <option value="">-- Select Manufacturer --</option>
//                     {uniqueManufacturers.map((mfr) => (
//                       <option key={mfr} value={mfr}>
//                         {mfr}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Model</Form.Label>
//                   <Form.Select
//                     value={model}
//                     onChange={(e) => {
//                       setModel(e.target.value);
//                       setYearRange("");
//                       setNumberOfButtons("");
//                     }}
//                     disabled={!manufacturer}
//                   >
//                     <option value="">-- Select Model --</option>
//                     {modelsForManufacturer.map((mdl) => (
//                       <option key={mdl} value={mdl}>
//                         {mdl}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Row className="mb-3">
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Year Range</Form.Label>
//                   <Form.Select
//                     value={yearRange}
//                     onChange={(e) => setYearRange(e.target.value)}
//                     disabled={!manufacturer || !model}
//                   >
//                     <option value="">-- Select Year Range --</option>
//                     {yearRanges.map((range) => (
//                       <option key={range} value={range}>
//                         {range}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Number of Buttons</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={numberOfButtons}
//                     readOnly
//                     disabled={!manufacturer || !model || !yearRange}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//           </>
//         )}

//         <Form.Group className="mb-3">
//           <Form.Label>Details</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             value={details}
//             onChange={(e) => setDetails(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Button
//           variant="primary"
//           type="submit"
//           className="w-100"
//           style={{
//             backgroundColor: "#6c5ce7",
//             borderColor: "#6c5ce7",
//             color: "white",
//             transition: "all 0.3s ease",
//             fontWeight: "500",
//             letterSpacing: "0.5px",
//             boxShadow: "none",
//           }}
//           onMouseOver={(e) => {
//             e.currentTarget.style.backgroundColor = "transparent";
//             e.currentTarget.style.color = "#6c5ce7";
//             e.currentTarget.style.boxShadow = "0 0 0 2px #6c5ce7";
//           }}
//           onMouseOut={(e) => {
//             e.currentTarget.style.backgroundColor = "#6c5ce7";
//             e.currentTarget.style.color = "white";
//             e.currentTarget.style.boxShadow = "none";
//           }}
//           onMouseDown={(e) => {
//             e.currentTarget.style.backgroundColor = "#5649c0";
//             e.currentTarget.style.borderColor = "#5649c0";
//             e.currentTarget.style.color = "white";
//           }}
//           onMouseUp={(e) => {
//             e.currentTarget.style.backgroundColor = "transparent";
//             e.currentTarget.style.color = "#6c5ce7";
//           }}
//         >
//           Add Service
//         </Button>
//       </Form>

//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Service Price</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           This is the base price before adding platform fees. Proceed?
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

// import React, { useState, useEffect } from "react";
// import api from "../../../api/api";
// import {
//   Form,
//   Button,
//   Container,
//   Alert,
//   Tooltip,
//   OverlayTrigger,
//   Row,
//   Col,
//   Modal,
// } from "react-bootstrap";
// import { TbInfoTriangle } from "react-icons/tb";
// import "./CreateServices.css";

// const CreateService = () => {
//   const [services, setServices] = useState([]);
//   const [selectedServiceId, setSelectedServiceId] = useState("");
//   const [selectedService, setSelectedService] = useState("");
//   const [customPrice, setCustomPrice] = useState("");
//   const [additionalKeyPrice, setAdditionalKeyPrice] = useState("");
//   const [details, setDetails] = useState("");
//   const [serviceType, setServiceType] = useState("");
//   const [message, setMessage] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [isConfirmed, setIsConfirmed] = useState(false);
//   // Automotive-specific states
//   const [carDetails, setCarDetails] = useState([]);
//   const [manufacturer, setManufacturer] = useState("");
//   const [model, setModel] = useState("");
//   const [yearRangeFrom, setYearRangeFrom] = useState("");
//   const [yearRangeTo, setYearRangeTo] = useState("");
//   const [numberOfButtons, setNumberOfButtons] = useState("");

//   const serviceTypes = [
//     "smart_lock",
//     "emergency",
//     "automotive",
//     "commercial",
//     "residential",
//   ];

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const accessToken = localStorage.getItem("accessToken");
//         if (!accessToken) {
//           setMessage({ type: "danger", text: "Unauthorized. Please log in." });
//           return;
//         }

//         const response = await api.get(
//           "/api/admin/services/available_services/",
//           {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           }
//         );
//         setServices(response.data);
//       } catch (error) {
//         setMessage({ type: "danger", text: "Failed to fetch services." });
//         console.error(error);
//       }
//     };

//     fetchServices();
//   }, []);

//   useEffect(() => {
//     const fetchCarDetails = async () => {
//       if (serviceType === "automotive") {
//         try {
//           const accessToken = localStorage.getItem("accessToken");
//           const response = await api.get("/api/car-key-details/", {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           });
//           setCarDetails(response.data);
//         } catch (error) {
//           setMessage({ type: "danger", text: "Failed to fetch car details." });
//           console.error(error);
//         }
//       } else {
//         setCarDetails([]);
//         setManufacturer("");
//         setModel("");
//         setYearRangeFrom("");
//         setYearRangeTo("");
//         setNumberOfButtons("");
//       }
//     };

//     fetchCarDetails();
//   }, [serviceType]);

//   const handleServiceChange = (e) => {
//     const selectedId = e.target.value;
//     const service = services.find((s) => s.id.toString() === selectedId);
//     setSelectedServiceId(selectedId);
//     setSelectedService(service ? service.name : "");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!selectedServiceId || !customPrice || !details || !serviceType) {
//       setMessage({ type: "warning", text: "Please fill in all required fields." });
//       return;
//     }

//     const price = parseFloat(customPrice);
//     if (isNaN(price) || price <= 0) {
//       setMessage({
//         type: "warning",
//         text: "Invalid price. Please enter a valid number.",
//       });
//       return;
//     }

//     if (additionalKeyPrice) {
//       const addKeyPrice = parseFloat(additionalKeyPrice);
//       if (isNaN(addKeyPrice) || addKeyPrice <= 0) {
//         setMessage({
//           type: "warning",
//           text: "Invalid additional key price. Please enter a valid number.",
//         });
//         return;
//       }
//     }

//     if (serviceType === "automotive") {
//       if (!manufacturer || !model || !yearRangeFrom || !yearRangeTo || !numberOfButtons) {
//         setMessage({
//           type: "warning",
//           text: "Please fill in all automotive fields.",
//         });
//         return;
//       }
//     }

//     setShowModal(true);
//   };

//   const handleConfirm = () => {
//     setIsConfirmed(true);
//     setShowModal(false);
//   };

//   const handleClose = () => {
//     setShowModal(false);
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
//         additional_key_price: additionalKeyPrice
//           ? parseFloat(additionalKeyPrice)
//           : null,
//         ...(serviceType === "automotive" && {
//           car_key_details: {
//             manufacturer,
//             model,
//             year_from: parseInt(yearRangeFrom),
//             year_to: parseInt(yearRangeTo),
//             number_of_buttons: parseInt(numberOfButtons),
//           },
//         }),
//       };

//       await api.post("/api/services/", newService, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       setMessage({ type: "success", text: "Service added successfully!" });

//       // Reset form
//       setSelectedService("");
//       setSelectedServiceId("");
//       setCustomPrice("");
//       setAdditionalKeyPrice("");
//       setDetails("");
//       setServiceType("");
//       setManufacturer("");
//       setModel("");
//       setYearRangeFrom("");
//       setYearRangeTo("");
//       setNumberOfButtons("");
//       setIsConfirmed(false);
//     } catch (error) {
//       console.error("Error:", error);
//       setMessage({
//         type: "danger",
//         text: error.response?.data?.message || "Failed to add service.",
//       });
//       setIsConfirmed(false);
//     }
//   };

//   // Get unique manufacturers for dropdown
//   const uniqueManufacturers = [...new Set(carDetails.map((car) => car.manufacturer))];

//   // Get models for selected manufacturer
//   const modelsForManufacturer = manufacturer
//     ? [...new Set(
//         carDetails
//           .filter((car) => car.manufacturer === manufacturer)
//           .map((car) => car.model)
//       )]
//     : [];

//   // Get unique year_from values for selected manufacturer and model
//   const yearFromOptions = manufacturer && model
//     ? [...new Set(
//         carDetails
//           .filter((car) => car.manufacturer === manufacturer && car.model === model)
//           .map((car) => car.year_from)
//           .filter(year => year !== null)
//       )].sort((a, b) => a - b)
//     : [];

//   // Get corresponding year_to values for selected year_from
//   const yearToOptions = manufacturer && model && yearRangeFrom
//     ? carDetails
//         .filter(
//           (car) =>
//             car.manufacturer === manufacturer &&
//             car.model === model &&
//             car.year_from === parseInt(yearRangeFrom))
//         .map((car) => car.year_to)
//         .filter(year => year !== null)
//         .sort((a, b) => a - b)
//     : [];

//   // Auto-select number of buttons based on selected year range
//   useEffect(() => {
//     if (manufacturer && model && yearRangeFrom && yearRangeTo) {
//       const selectedCar = carDetails.find(
//         (car) =>
//           car.manufacturer === manufacturer &&
//           car.model === model &&
//           car.year_from === parseInt(yearRangeFrom) &&
//           car.year_to === parseInt(yearRangeTo)
//       );
//       if (selectedCar) {
//         setNumberOfButtons(selectedCar.number_of_buttons.toString());
//       } else {
//         setNumberOfButtons("");
//       }
//     } else {
//       setNumberOfButtons("");
//     }
//   }, [manufacturer, model, yearRangeFrom, yearRangeTo, carDetails]);

//   return (
//     <Container className="create-service-container py-4">
//       <h2 className="text-center mb-4">Create a New Service</h2>

//       {message && (
//         <Alert variant={message.type} className="text-center">
//           {message.text}
//         </Alert>
//       )}

//       <Form onSubmit={handleSubmit}>
//         <Row className="mb-3">
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Service Type</Form.Label>
//               <Form.Select
//                 value={serviceType}
//                 onChange={(e) => setServiceType(e.target.value)}
//               >
//                 <option value="">-- Select Type --</option>
//                 {serviceTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Available Services</Form.Label>
//               <Form.Select
//                 value={selectedServiceId}
//                 onChange={handleServiceChange}
//               >
//                 <option value="">-- Select Service --</option>
//                 {services.map((service) => (
//                   <option key={service.id} value={service.id}>
//                     {service.name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>
//         </Row>

//         <Row className="mb-3">
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>
//                 Custom Price ($)
//                 <OverlayTrigger
//                   placement="right"
//                   overlay={
//                     <Tooltip>
//                       Includes: 10% GST + 10% service fee + $40 platform fee
//                     </Tooltip>
//                   }
//                 >
//                   <TbInfoTriangle
//                     className="ms-2 text-info"
//                     style={{ cursor: "pointer" }}
//                   />
//                 </OverlayTrigger>
//               </Form.Label>
//               <Form.Control
//                 type="number"
//                 value={customPrice}
//                 onChange={(e) => setCustomPrice(e.target.value)}
//                 min="1"
//                 required
//               />
//             </Form.Group>
//           </Col>
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Additional Key Price ($)</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={additionalKeyPrice}
//                 onChange={(e) => setAdditionalKeyPrice(e.target.value)}
//                 min="0"
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         {serviceType === "automotive" && (
//           <>
//             <Row className="mb-3">
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Manufacturer</Form.Label>
//                   <Form.Select
//                     value={manufacturer}
//                     onChange={(e) => {
//                       setManufacturer(e.target.value);
//                       setModel("");
//                       setYearRangeFrom("");
//                       setYearRangeTo("");
//                       setNumberOfButtons("");
//                     }}
//                   >
//                     <option value="">-- Select Manufacturer --</option>
//                     {uniqueManufacturers.map((mfr) => (
//                       <option key={mfr} value={mfr}>
//                         {mfr}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Model</Form.Label>
//                   <Form.Select
//                     value={model}
//                     onChange={(e) => {
//                       setModel(e.target.value);
//                       setYearRangeFrom("");
//                       setYearRangeTo("");
//                       setNumberOfButtons("");
//                     }}
//                     disabled={!manufacturer}
//                   >
//                     <option value="">-- Select Model --</option>
//                     {modelsForManufacturer.map((mdl) => (
//                       <option key={mdl} value={mdl}>
//                         {mdl}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Row className="mb-3">
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Year From</Form.Label>
//                   <Form.Select
//                     value={yearRangeFrom}
//                     onChange={(e) => {
//                       setYearRangeFrom(e.target.value);
//                       setYearRangeTo("");
//                       setNumberOfButtons("");
//                     }}
//                     disabled={!manufacturer || !model}
//                   >
//                     <option value="">-- Select Year From --</option>
//                     {yearFromOptions.map((year) => (
//                       <option key={year} value={year}>
//                         {year}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Year To</Form.Label>
//                   <Form.Select
//                     value={yearRangeTo}
//                     onChange={(e) => setYearRangeTo(e.target.value)}
//                     disabled={!yearRangeFrom}
//                   >
//                     <option value="">-- Select Year To --</option>
//                     {yearToOptions.map((year) => (
//                       <option key={year} value={year}>
//                         {year}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Row className="mb-3">
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Number of Buttons</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={numberOfButtons}
//                     readOnly
//                     disabled={!manufacturer || !model || !yearRangeFrom || !yearRangeTo}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//           </>
//         )}

//         <Form.Group className="mb-3">
//           <Form.Label>Details</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             value={details}
//             onChange={(e) => setDetails(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Button
//           variant="primary"
//           type="submit"
//           className="w-100"
//           style={{
//             backgroundColor: "#6c5ce7",
//             borderColor: "#6c5ce7",
//             color: "white",
//             transition: "all 0.3s ease",
//             fontWeight: "500",
//             letterSpacing: "0.5px",
//             boxShadow: "none",
//           }}
//           onMouseOver={(e) => {
//             e.currentTarget.style.backgroundColor = "transparent";
//             e.currentTarget.style.color = "#6c5ce7";
//             e.currentTarget.style.boxShadow = "0 0 0 2px #6c5ce7";
//           }}
//           onMouseOut={(e) => {
//             e.currentTarget.style.backgroundColor = "#6c5ce7";
//             e.currentTarget.style.color = "white";
//             e.currentTarget.style.boxShadow = "none";
//           }}
//           onMouseDown={(e) => {
//             e.currentTarget.style.backgroundColor = "#5649c0";
//             e.currentTarget.style.borderColor = "#5649c0";
//             e.currentTarget.style.color = "white";
//           }}
//           onMouseUp={(e) => {
//             e.currentTarget.style.backgroundColor = "transparent";
//             e.currentTarget.style.color = "#6c5ce7";
//           }}
//         >
//           Add Service
//         </Button>
//       </Form>

//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Service Price</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           This is the base price before adding platform fees. Proceed?
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
import { TbInfoTriangle } from "react-icons/tb";
import "./CreateServices.css";

const CreateService = () => {
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [additionalKeyPrice, setAdditionalKeyPrice] = useState("");
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
      }
    };

    fetchCarDetails();
  }, [serviceType]);

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

    if (additionalKeyPrice) {
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
      // Validate year range format (e.g., "2010-2015")
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
        additional_key_price: additionalKeyPrice
          ? parseFloat(additionalKeyPrice)
          : null,
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

      // Reset form
      setSelectedService("");
      setSelectedServiceId("");
      setCustomPrice("");
      setAdditionalKeyPrice("");
      setDetails("");
      setServiceType("");
      setManufacturer("");
      setModel("");
      setYearRange("");
      setNumberOfButtons("");
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

  // Get unique manufacturers for dropdown
  const uniqueManufacturers = [...new Set(carDetails.map((car) => car.manufacturer))];

  // Get models for selected manufacturer
  const modelsForManufacturer = manufacturer
    ? [...new Set(
        carDetails
          .filter((car) => car.manufacturer === manufacturer)
          .map((car) => car.model)
      )]
    : [];

  // Get unique year ranges for selected manufacturer and model
  const yearRangeOptions = manufacturer && model
    ? [...new Set(
        carDetails
          .filter((car) => car.manufacturer === manufacturer && car.model === model)
          .map((car) => `${car.year_from}-${car.year_to}`)
          .filter(range => range !== "null-null")
      )].sort()
    : [];

  // Auto-select number of buttons based on selected year range
  useEffect(() => {
    if (manufacturer && model && yearRange) {
      const [yearFrom, yearTo] = yearRange.split("-").map(Number);
      const selectedCar = carDetails.find(
        (car) =>
          car.manufacturer === manufacturer &&
          car.model === model &&
          car.year_from === yearFrom &&
          car.year_to === yearTo
      );
      if (selectedCar) {
        setNumberOfButtons(selectedCar.number_of_buttons.toString());
      } else {
        setNumberOfButtons("");
      }
    } else {
    setNumberOfButtons("");
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
                Custom Price ($)
                <OverlayTrigger
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
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Additional Key Price ($)</Form.Label>
              <Form.Control
                type="number"
                value={additionalKeyPrice}
                onChange={(e) => setAdditionalKeyPrice(e.target.value)}
                min="0"
              />
            </Form.Group>
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
                    onChange={(e) => setYearRange(e.target.value)}
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
                  <Form.Control
                    type="number"
                    value={numberOfButtons}
                    readOnly
                    disabled={!manufacturer || !model || !yearRange}
                  />
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