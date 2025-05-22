import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import './MyBookings.css';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'paid', 'unpaid'
  const userRole = localStorage.getItem('userRole');
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (userRole !== 'customer') {
      setError('Unauthorized access. Only customers can view bookings.');
      return;
    }

    const fetchBookings = async () => {
      try {
        let url = '/api/bookings/';
        if (filter === 'paid') {
          url += '?payment_status=paid';
        } else if (filter === 'unpaid') {
          // Show pending payments as unpaid
          url += '?payment_status=pending';
        }
        const response = await api.get(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setBookings(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch bookings. Please try again.');
        console.error(err);
      }
    };

    fetchBookings();
  }, [accessToken, userRole, filter]);

  return (
    <div className="bookings-container">
      <h2>My Bookings</h2>

      <div className="filter-container" style={{ marginBottom: '1rem' }}>
        <label htmlFor="paymentFilter" style={{ marginRight: '0.5rem' }}>
          Filter by Payment Status:
        </label>
        <select
          id="paymentFilter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid (Pending)</option>
        </select>
      </div>

      {error ? (
        <p className="error-message">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="no-bookings">No bookings found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped bookings-table">
            <thead className="thead-dark">
              <tr>
                <th>Service Type</th>
                <th>Service ID</th>
                <th>Scheduled Date</th>
                <th>Status</th>
                <th>Payment ID</th>
                <th>Payment Status</th>
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
                  <td>{booking.payment_status ? booking.payment_status.toUpperCase() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
