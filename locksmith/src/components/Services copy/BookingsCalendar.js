import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, parseISO } from 'date-fns';
import api from '../../api/api';

const BookingsCalendar = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    end: format(endOfMonth(new Date()), 'yyyy-MM-dd')
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem('accessToken');
        
        if (!accessToken) {
          throw new Error('No access token found. Please log in.');
        }

        console.log('Fetching bookings with params:', {
          start: dateRange.start,
          end: dateRange.end
        });

        const response = await api.get('/api/calendar/bookings/', {
          params: {
            start_date: dateRange.start,  // Changed from 'start' to 'start_date'
            end_date: dateRange.end       // Changed from 'end' to 'end_date'
          },
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        console.log('Bookings API response:', response.data);
        setBookings(Array.isArray(response.data) ? response.data : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching bookings:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          statusText: err.response?.statusText,
          config: err.config,
        });
        
        let errorMessage = 'Failed to load bookings. Please try again later.';
        if (err.response?.data) {
          errorMessage = err.response.data.detail || JSON.stringify(err.response.data);
        } else if (err.message) {
          errorMessage = err.message;
        }
        
        setError(errorMessage);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [dateRange]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    try {
      const date = parseISO(dateTimeString);
      return format(date, 'MMM d, yyyy h:mm a');
    } catch {
      return dateTimeString;
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'Scheduled': 'primary',
      'Completed': 'success',
      'Pending': 'warning',
      'Cancelled': 'danger'
    };
    return statusMap[status] || 'secondary';
  };

  const getLocksmithStatusBadge = (status) => {
    const statusMap = {
      'APPROVED': 'success',
      'PENDING': 'warning',
      'REJECTED': 'danger'
    };
    return statusMap[status] || 'secondary';
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Bookings</h2>
        <div className="d-flex gap-2">
          <input
            type="date"
            name="start"
            value={dateRange.start}
            onChange={handleDateChange}
            className="form-control"
          />
          <span>to</span>
          <input
            type="date"
            name="end"
            value={dateRange.end}
            onChange={handleDateChange}
            className="form-control"
          />
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="table-responsive">
        {loading ? (
          <div className="text-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading bookings...</p>
          </div>
        ) : bookings.length > 0 ? (
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Booking ID</th>
                <th>Scheduled Date</th>
                <th>Status</th>
                <th>Payment Status</th>
                <th>Locksmith Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => {
                // Extract booking ID from title if it's in format "Booking ID: 123"
                const bookingId = booking.title ? booking.title.replace('Booking ID: ', '') : `#${index + 1}`;
                
                return (
                  <tr key={index} style={{ 
                    borderLeft: `4px solid ${booking.color || '#6c757d'}`,
                    verticalAlign: 'middle' 
                  }}>
                    <td>{bookingId}</td>
                    <td>{formatDateTime(booking.scheduled_date)}</td>
                    <td>
                      <span className={`badge bg-${getStatusBadge(booking.status)}`}>
                        {booking.status || 'N/A'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge bg-${booking.payment_status === 'paid' ? 'success' : 'warning'}`}>
                        {booking.payment_status === 'paid' ? 'Paid' : 'Pending'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge bg-${getLocksmithStatusBadge(booking.locksmith_status)}`}>
                        {booking.locksmith_status || 'N/A'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-info">
            No bookings found for the selected date range.
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsCalendar;