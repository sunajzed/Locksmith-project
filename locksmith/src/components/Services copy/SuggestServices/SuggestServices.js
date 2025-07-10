import { useState } from "react";
import api from "../../../api/api";
import "./SuggestServices.css";

const SuggestServices = () => {
  const [formData, setFormData] = useState({
    name: "",
    service_type: "smart_lock",
    price: "",
    additional_key_price: "",
    supported_vehicles: "",
  });
  const [carKeyDetails, setCarKeyDetails] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const serviceTypes = [
    "smart_lock",
    "automotive",
    "commercial",
    "residential",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "service_type" && value !== "automotive") {
      setCarKeyDetails([]);
    }
  };

  const addCarKeyDetail = () => {
    setCarKeyDetails([
      ...carKeyDetails,
      {
        manufacturer: "",
        model: "",
        year_from: "",
        year_to: "",
        number_of_buttons: "",
      },
    ]);
  };

  const updateCarKeyDetail = (index, field, value) => {
    const updatedDetails = [...carKeyDetails];
    updatedDetails[index][field] = value;
    setCarKeyDetails(updatedDetails);
  };

  const removeCarKeyDetail = (index) => {
    setCarKeyDetails(carKeyDetails.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.service_type === "automotive" && carKeyDetails.length === 0) {
      setError("Car key details are required for automotive services.");
      return;
    }

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        additional_key_price: parseFloat(formData.additional_key_price),
        ...(formData.service_type === "automotive" && {
          car_key_details: carKeyDetails,
        }),
      };

      const response = await api.post("/api/suggested-services/", payload);
      setSuccess("Service suggestion submitted successfully!");
      setFormData({
        name: "",
        service_type: "smart_lock",
        price: "",
        additional_key_price: "",
        supported_vehicles: "",
      });
      setCarKeyDetails([]);
    } catch (error) {
      setError(
        error.response?.data?.non_field_errors?.[0] ||
          error.response?.data?.service_type?.[0] ||
          "Failed to submit service suggestion."
      );
    }
  };

  return (
    <div className="suggest-services">
      <h2>Suggest a New Service</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Service Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="service_type">Service Type</label>
          <select
            className="form-control"
            id="service_type"
            name="service_type"
            value={formData.service_type}
            onChange={handleInputChange}
          >
            {serviceTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="additional_key_price">Additional Key Price ($)</label>
          <input
            type="number"
            className="form-control"
            id="additional_key_price"
            name="additional_key_price"
            value={formData.additional_key_price}
            onChange={handleInputChange}
            step="0.01"
            required
          />
        </div>
        {formData.service_type === "automotive" && (
          <>
            <div className="form-group">
              <label htmlFor="supported_vehicles">Supported Vehicles</label>
              <input
                type="text"
                className="form-control"
                id="supported_vehicles"
                name="supported_vehicles"
                value={formData.supported_vehicles}
                onChange={handleInputChange}
                placeholder="e.g., Toyota, Honda, Ford"
              />
            </div>
            <h3>Car Key Details</h3>
            {carKeyDetails.map((detail, index) => (
              <div key={index} className="car-key-detail">
                <div className="form-group">
                  <label htmlFor={`manufacturer-${index}`}>Manufacturer</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`manufacturer-${index}`}
                    value={detail.manufacturer}
                    onChange={(e) =>
                      updateCarKeyDetail(index, "manufacturer", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`model-${index}`}>Model</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`model-${index}`}
                    value={detail.model}
                    onChange={(e) =>
                      updateCarKeyDetail(index, "model", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`year_from-${index}`}>Year From</label>
                  <input
                    type="number"
                    className="form-control"
                    id={`year_from-${index}`}
                    value={detail.year_from}
                    onChange={(e) =>
                      updateCarKeyDetail(index, "year_from", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`year_to-${index}`}>Year To</label>
                  <input
                    type="number"
                    className="form-control"
                    id={`year_to-${index}`}
                    value={detail.year_to}
                    onChange={(e) =>
                      updateCarKeyDetail(index, "year_to", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`number_of_buttons-${index}`}>
                    Number of Buttons
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id={`number_of_buttons-${index}`}
                    value={ detail.number_of_buttons}
                    onChange={(e) =>
                      updateCarKeyDetail(index, "number_of_buttons", e.target.value)
                    }
                    required
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeCarKeyDetail(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={addCarKeyDetail}
            >
              Add Car Key Detail
            </button>
          </>
        )}
        <button type="submit" className="btn btn-primary">
          Submit Suggestion
        </button>
      </form>
    </div>
  );
};

export default SuggestServices;