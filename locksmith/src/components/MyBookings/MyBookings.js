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


// import React, { useEffect, useState } from 'react';
// import api from '../../api/api';
// import './MyBookings.css';
// import { FiFilter, FiCalendar, FiDollarSign, FiCheckCircle, FiClock, FiAlertCircle, FiLoader } from 'react-icons/fi';
// import { Button, Modal } from 'react-bootstrap';

// export default function MyBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [error, setError] = useState('');
//   const [filter, setFilter] = useState('all');
//   const [isLoading, setIsLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [completionStatus, setCompletionStatus] = useState('');
//   const userRole = localStorage.getItem('userRole');
//   const accessToken = localStorage.getItem('accessToken');

//   useEffect(() => {
//     if (userRole !== 'customer') {
//       setError('Unauthorized access. Only customers can view bookings.');
//       setIsLoading(false);
//       return;
//     }

//     fetchBookings();
//   }, [accessToken, userRole, filter]);

//   const fetchBookings = async () => {
//     setIsLoading(true);
//     try {
//       let url = '/api/bookings/';
//       if (filter === 'paid') {
//         url += '?payment_status=paid';
//       } else if (filter === 'unpaid') {
//         url += '?payment_status=pending';
//       }
//       const response = await api.get(url, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       setBookings(response.data);
//       setError('');
//     } catch (err) {
//       setError('Failed to fetch bookings. Please try again.');
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };

//   const getPaymentStatusIcon = (status) => {
//     switch (status.toLowerCase()) {
//       case 'paid':
//         return <FiCheckCircle className="status-icon paid" />;
//       case 'pending':
//         return <FiClock className="status-icon pending" />;
//       default:
//         return <FiDollarSign className="status-icon" />;
//     }
//   };

//   const handleCompleteClick = (booking) => {
//     setSelectedBooking(booking);
//     setShowModal(true);
//   };

//   const confirmCompletion = async () => {
//     try {
//       const response = await api.post(
//         `/api/bookings/${selectedBooking.id}/complete/`,
//         { status: "Booking completed" },
//         { headers: { Authorization: `Bearer ${accessToken}` } }
//       );
      
//       setCompletionStatus(response.data.status);
      
//       if (response.data.status.includes('payment released')) {
//         // Update the booking status in the UI
//         setBookings(prevBookings =>
//           prevBookings.map(booking =>
//             booking.id === selectedBooking.id
//               ? { ...booking, status: "Booking completed and payment released" }
//               : booking
//           )
//         );
//       }
      
//       // Refresh bookings after a short delay
//       setTimeout(() => {
//         fetchBookings();
//       }, 1500);
//     } catch (err) {
//       setError('Failed to complete the booking. Please try again.');
//       console.error(err);
//     } finally {
//       setTimeout(() => {
//         setShowModal(false);
//         setCompletionStatus('');
//       }, 3000);
//     }
//   };

//   const canCompleteBooking = (booking) => {
//     return booking.status !== "Booking completed" && 
//            booking.status !== "Booking completed and payment released" &&
//            booking.payment_status === "paid";
//   };

//   return (
//     <div className="bookings-container">
//       <div className="bookings-header">
//         <h2>My Bookings</h2>
//         <p className="bookings-subtitle">View and manage your service appointments</p>
//       </div>

//       <div className="bookings-controls">
//         <div className="filter-control">
//           <FiFilter className="filter-icon" />
//           <select
//             id="paymentFilter"
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="filter-select"
//           >
//             <option value="all">All Bookings</option>
//             <option value="paid">Paid Bookings</option>
//             <option value="unpaid">Pending Payment</option>
//           </select>
//         </div>
//       </div>

//       {error ? (
//         <div className="error-state">
//           <FiAlertCircle className="error-icon" />
//           <p className="error-message">{error}</p>
//         </div>
//       ) : isLoading ? (
//         <div className="loading-state">
//           <FiLoader className="loading-icon spin" />
//           <p>Loading your bookings...</p>
//         </div>
//       ) : bookings.length === 0 ? (
//         <div className="empty-state">
//           <FiCalendar className="empty-icon" />
//           <h3>No bookings found</h3>
//           <p>You don't have any {filter !== 'all' ? filter : ''} bookings yet.</p>
//         </div>
//       ) : (
//         <div className="table-container">
//           <table className="bookings-table">
//             <thead>
//               <tr>
//                 <th>Service Type</th>
//                 <th>Service ID</th>
//                 <th>
//                   <FiCalendar className="header-icon" />
//                   Scheduled Date
//                 </th>
//                 <th>Status</th>
//                 <th>Payment ID</th>
//                 <th>Payment Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking) => (
//                 <tr key={booking.id}>
//                   <td data-label="Service Type">
//                     <span className="service-type">{booking.locksmith_service_type}</span>
//                   </td>
//                   <td data-label="Service ID">{booking.locksmith_service}</td>
//                   <td data-label="Scheduled Date">{formatDate(booking.scheduled_date)}</td>
//                   <td data-label="Status">
//                     <span className={`status-badge ${booking.status.toLowerCase()}`}>
//                       {booking.status}
//                     </span>
//                   </td>
//                   <td data-label="Payment ID">{booking.payment_intent_id || 'N/A'}</td>
//                   <td data-label="Payment Status">
//                     <div className="payment-status">
//                       {getPaymentStatusIcon(booking.payment_status)}
//                       <span>{booking.payment_status ? booking.payment_status.toUpperCase() : 'N/A'}</span>
//                     </div>
//                   </td>
//                   <td data-label="Actions">
//                     {canCompleteBooking(booking) && (
//                       <Button
//                         variant="primary"
//                         size="sm"
//                         onClick={() => handleCompleteClick(booking)}
//                       >
//                         Complete
//                       </Button>
//                     )}
//                     {booking.status === "Booking completed and payment released" && (
//                       <span className="completed-badge">Completed</span>
//                     )}
//                     {booking.status === "Confirmation recorded. Waiting for other party to confirm." && (
//                       <span className="waiting-badge">Waiting for locksmith</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Completion Confirmation Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Service Completion</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {completionStatus ? (
//             <div className="completion-status">
//               <p>{completionStatus}</p>
//             </div>
//           ) : (
//             <>
//               <p>Are you sure you want to mark this service as completed?</p>
//               <p><strong>Service:</strong> {selectedBooking?.locksmith_service_type}</p>
//               <p><strong>Scheduled:</strong> {selectedBooking && formatDate(selectedBooking.scheduled_date)}</p>
//               <p className="text-muted">Note: Both you and the locksmith need to confirm completion for payment to be released.</p>
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           {!completionStatus && (
//             <>
//               <Button variant="secondary" onClick={() => setShowModal(false)}>
//                 Cancel
//               </Button>
//               <Button variant="primary" onClick={confirmCompletion}>
//                 Confirm Completion
//               </Button>
//             </>
//           )}
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }