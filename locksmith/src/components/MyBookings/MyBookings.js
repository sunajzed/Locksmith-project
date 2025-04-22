
import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import './MyBookings.css';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const userRole = localStorage.getItem('userRole');
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (userRole !== 'customer') {
      setError('Unauthorized access. Only customers can view bookings.');
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await api.get('/api/bookings/', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setBookings(response.data);
      } catch (err) {
        setError('Failed to fetch bookings. Please try again.');
        console.error(err);
      }
    };

    fetchBookings();
  }, [accessToken, userRole]);



  return (
    <div className="bookings-container">
      <h2>My Bookings</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="no-bookings">No bookings found.</p>
      ) : (
        <div className="table-responsive"> {/* Bootstrap class for scrollable table */}
          <table className="table table-bordered table-striped bookings-table">
            <thead className="thead-dark">
              <tr>
                <th>Service Type</th>
                <th>Service ID</th>
                <th>Scheduled Date</th>
                <th>Status</th>
                <th>Payment ID</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.locksmith_service_type}</td>
                  <td>{booking.locksmith_service}</td>
                  <td>{new Date(booking.scheduled_date).toLocaleString()}</td>
                  <td>{booking.status}</td>
                  <td>{booking.payment_intent_id || 'N/A'}</td>
                  {/* <td>
                    <button className="cancel-button" onClick={() => handleCancelBooking(booking.id)}>
                      Cancel Booking
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
