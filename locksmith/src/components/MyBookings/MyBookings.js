// import React, { useEffect, useState } from 'react';
// import api from '../../api/api';
// import './MyBookings.css';

// export default function MyBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [error, setError] = useState('');
//   const [filter, setFilter] = useState('all'); // 'all', 'paid', 'unpaid'
//   const userRole = localStorage.getItem('userRole');
//   const accessToken = localStorage.getItem('accessToken');

//   useEffect(() => {
//     if (userRole !== 'customer') {
//       setError('Unauthorized access. Only customers can view bookings.');
//       return;
//     }

//     const fetchBookings = async () => {
//       try {
//         let url = '/api/bookings/';
//         if (filter === 'paid') {
//           url += '?payment_status=paid';
//         } else if (filter === 'unpaid') {
//           // Show pending payments as unpaid
//           url += '?payment_status=pending';
//         }
//         const response = await api.get(url, {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });
//         setBookings(response.data);
//         setError('');
//       } catch (err) {
//         setError('Failed to fetch bookings. Please try again.');
//         console.error(err);
//       }
//     };

//     fetchBookings();
//   }, [accessToken, userRole, filter]);

//   return (
//     <div className="bookings-container">
//       <h2>My Bookings</h2>

//       <div className="filter-container" style={{ marginBottom: '1rem' }}>
//         <label htmlFor="paymentFilter" style={{ marginRight: '0.5rem' }}>
//           Filter by Payment Status:
//         </label>
//         <select
//           id="paymentFilter"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         >
//           <option value="all">All</option>
//           <option value="paid">Paid</option>
//           <option value="unpaid">Unpaid (Pending)</option>
//         </select>
//       </div>

//       {error ? (
//         <p className="error-message">{error}</p>
//       ) : bookings.length === 0 ? (
//         <p className="no-bookings">No bookings found.</p>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-bordered table-striped bookings-table">
//             <thead className="thead-dark">
//               <tr>
//                 <th>Service Type</th>
//                 <th>Service ID</th>
//                 <th>Scheduled Date</th>
//                 <th>Status</th>
//                 <th>Payment ID</th>
//                 <th>Payment Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking) => (
//                 <tr key={booking.id}>
//                   <td>{booking.locksmith_service_type}</td>
//                   <td>{booking.locksmith_service}</td>
//                   <td>{new Date(booking.scheduled_date).toLocaleString()}</td>
//                   <td>{booking.status}</td>
//                   <td>{booking.payment_intent_id || 'N/A'}</td>
//                   <td>{booking.payment_status ? booking.payment_status.toUpperCase() : 'N/A'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import './MyBookings.css';
import { FiFilter, FiCalendar, FiDollarSign, FiCheckCircle, FiClock, FiAlertCircle, FiLoader } from 'react-icons/fi';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const userRole = localStorage.getItem('userRole');
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (userRole !== 'customer') {
      setError('Unauthorized access. Only customers can view bookings.');
      setIsLoading(false);
      return;
    }

    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        let url = '/api/bookings/';
        if (filter === 'paid') {
          url += '?payment_status=paid';
        } else if (filter === 'unpaid') {
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [accessToken, userRole, filter]);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getPaymentStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return <FiCheckCircle className="status-icon paid" />;
      case 'pending':
        return <FiClock className="status-icon pending" />;
      default:
        return <FiDollarSign className="status-icon" />;
    }
  };

  return (
    <div className="bookings-container">
      <div className="bookings-header">
        <h2>My Bookings</h2>
        <p className="bookings-subtitle">View and manage your service appointments</p>
      </div>

      <div className="bookings-controls">
        <div className="filter-control">
          <FiFilter className="filter-icon" />
          <select
            id="paymentFilter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Bookings</option>
            <option value="paid">Paid Bookings</option>
            <option value="unpaid">Pending Payment</option>
          </select>
        </div>
      </div>

      {error ? (
        <div className="error-state">
          <FiAlertCircle className="error-icon" />
          <p className="error-message">{error}</p>
        </div>
      ) : isLoading ? (
        <div className="loading-state">
          <FiLoader className="loading-icon spin" />
          <p>Loading your bookings...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="empty-state">
          <FiCalendar className="empty-icon" />
          <h3>No bookings found</h3>
          <p>You don't have any {filter !== 'all' ? filter : ''} bookings yet.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Service Type</th>
                <th>Service ID</th>
                <th>
                  <FiCalendar className="header-icon" />
                  Scheduled Date
                </th>
                <th>Status</th>
                <th>Payment ID</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td data-label="Service Type">
                    <span className="service-type">{booking.locksmith_service_type}</span>
                  </td>
                  <td data-label="Service ID">{booking.locksmith_service}</td>
                  <td data-label="Scheduled Date">{formatDate(booking.scheduled_date)}</td>
                  <td data-label="Status">
                    <span className={`status-badge ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td data-label="Payment ID">{booking.payment_intent_id || 'N/A'}</td>
                  <td data-label="Payment Status">
                    <div className="payment-status">
                      {getPaymentStatusIcon(booking.payment_status)}
                      <span>{booking.payment_status ? booking.payment_status.toUpperCase() : 'N/A'}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}