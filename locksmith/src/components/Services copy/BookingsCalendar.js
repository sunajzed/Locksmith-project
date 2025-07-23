// import React, { useState, useEffect, useCallback } from 'react';
// import { format, startOfMonth, endOfMonth, parseISO } from 'date-fns';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import { Badge, Modal, Spin, Typography } from 'antd';
// import { CrownFilled, StarFilled, ClockCircleFilled } from '@ant-design/icons';
// import api from '../../api/api';
// import './BookingsCalendar.css';

// const { Title, Text } = Typography;

// const BookingsCalendar = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalBookings, setModalBookings] = useState([]);
//   const [modalDate, setModalDate] = useState('');

//   const formatDate = (date) => format(date, 'yyyy-MM-dd');

//   const fetchBookings = useCallback(async (start, end) => {
//     try {
//       setLoading(true);
//       const accessToken = localStorage.getItem('accessToken');

//       if (!accessToken) {
//         throw new Error('No access token found. Please log in.');
//       }

//       const response = await api.get('/api/calendar/bookings/', {
//         params: {
//           start_date: start,
//           end_date: end
//         },
//         headers: {
//           'Authorization': `Bearer ${accessToken}`
//         }
//       });

//       setBookings(Array.isArray(response.data) ? response.data : []);
//       setError(null);
//       return response.data || [];
//     } catch (err) {
//       let errorMessage = 'Failed to load bookings. Please try again later.';
//       if (err.response?.data) {
//         errorMessage = err.response.data.detail || JSON.stringify(err.response.data);
//       } else if (err.message) {
//         errorMessage = err.message;
//       }

//       setError(errorMessage);
//       setBookings([]);
//       return [];
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     const start = format(startOfMonth(currentDate), 'yyyy-MM-dd');
//     const end = format(endOfMonth(currentDate), 'yyyy-MM-dd');
//     fetchBookings(start, end);
//   }, [currentDate, fetchBookings]);

//   const handleDatesSet = (arg) => {
//     setCurrentDate(arg.view.currentStart);
//   };

//   const formatDateTime = (dateTimeString) => {
//     if (!dateTimeString) return 'N/A';
//     try {
//       const date = parseISO(dateTimeString);
//       return format(date, 'MMM d, yyyy h:mm a');
//     } catch {
//       return dateTimeString;
//     }
//   };

//   const getStatusColor = (status) => {
//     const statusMap = {
//       'Scheduled': '#6c5ce7',
//       'Completed': '#28a745',
//       'Pending': '#ffc107',
//       'Cancelled': '#dc3545'
//     };
//     return statusMap[status] || '#636e72';
//   };

//   const getLocksmithStatusColor = (status) => {
//     const statusMap = {
//       'APPROVED': '#28a745',
//       'PENDING': '#ffc107',
//       'REJECTED': '#dc3545'
//     };
//     return statusMap[status] || '#636e72';
//   };

//   const renderEventContent = (eventInfo) => {
//     if (eventInfo.event.extendedProps.isViewMore) {
//       return (
//         <div className="fc-event-main view-more-event">
//           <span className="fc-event-title">more</span>
//         </div>
//       );
//     }
//     return (
//       <div className="fc-event-main">
//         <div className="fc-event-time">
//           {format(parseISO(eventInfo.event.startStr), 'h:mm a')}
//         </div>
//         <span className="fc-event-title">{eventInfo.event.title}</span>
//         {eventInfo.event.extendedProps.booking?.priority === 'high' && (
//           <StarFilled className="fc-event-priority" />
//         )}
//       </div>
//     );
//   };

//   const handleEventClick = (clickInfo) => {
//     if (clickInfo.event.extendedProps.isViewMore) {
//       setModalBookings(clickInfo.event.extendedProps.bookings);
//       setModalDate(format(parseISO(clickInfo.event.startStr), 'MMMM d, yyyy'));
//       setModalOpen(true);
//     }
//   };

//   const handleEventMouseEnter = (mouseEnterInfo) => {
//     if (mouseEnterInfo.event.extendedProps.isViewMore) return;

//     const booking = mouseEnterInfo.event.extendedProps.booking;
//     if (!booking) return;

//     const tooltip = `
//       <div class="booking-tooltip-content">
//         <div class="booking-tooltip-header">
//           <div class="booking-tooltip-title">${booking.title || 'Booking'}</div>
//           ${booking.priority === 'high' ? '<div class="booking-tooltip-priority"><StarFilled /></div>' : ''}
//         </div>
//         <div class="booking-tooltip-row">
//           <span class="booking-tooltip-label">Status:</span>
//           <span class="booking-tooltip-value" style="color: ${getStatusColor(booking.status)}">
//             ${booking.status || 'N/A'}
//           </span>
//         </div>
//         <div class="booking-tooltip-row">
//           <span class="booking-tooltip-label">Payment:</span>
//           <span class="booking-tooltip-value" style="color: ${booking.payment_status === 'paid' ? '#28a745' : '#ffc107'}">
//             ${booking.payment_status === 'paid' ? 'Paid' : 'Pending'}
//           </span>
//         </div>
//         <div class="booking-tooltip-row">
//           <span class="booking-tooltip-label">Locksmith:</span>
//           <span class="booking-tooltip-value" style="color: ${getLocksmithStatusColor(booking.locksmith_status)}">
//             ${booking.locksmith_status || 'N/A'}
//           </span>
//         </div>
//         <div class="booking-tooltip-row">
//           <span class="booking-tooltip-label">Time:</span>
//           <span class="booking-tooltip-value">${formatDateTime(booking.scheduled_date)}</span>
//         </div>
//       </div>
//     `;

//     const tooltipEl = document.createElement('div');
//     tooltipEl.className = 'booking-tooltip';
//     tooltipEl.innerHTML = tooltip;
//     document.body.appendChild(tooltipEl);

//     const updatePosition = (e) => {
//       tooltipEl.style.left = `${e.pageX + 12}px`;
//       tooltipEl.style.top = `${e.pageY + 12}px`;
//     };

//     updatePosition(mouseEnterInfo.jsEvent);
//     document.addEventListener('mousemove', updatePosition);

//     mouseEnterInfo.el.tooltip = {
//       el: tooltipEl,
//       updatePosition,
//       remove: () => {
//         document.removeEventListener('mousemove', updatePosition);
//         if (document.body.contains(tooltipEl)) {
//           document.body.removeChild(tooltipEl);
//         }
//       }
//     };
//   };

//   const handleEventMouseLeave = () => {
//     const tooltipEl = document.querySelector('.booking-tooltip');
//     if (tooltipEl) {
//       document.body.removeChild(tooltipEl);
//     }
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setModalBookings([]);
//     setModalDate('');
//   };

//   // Group bookings by date and create events
//   const events = [];
//   const bookingsByDate = bookings.reduce((acc, booking) => {
//     const date = format(parseISO(booking.scheduled_date), 'yyyy-MM-dd');
//     if (!acc[date]) {
//       acc[date] = [];
//     }
//     acc[date].push(booking);
//     return acc;
//   }, {});

//   Object.keys(bookingsByDate).forEach(date => {
//     const dayBookings = bookingsByDate[date];
    
//     // Sort by priority (high first) then by time
//     dayBookings.sort((a, b) => {
//       if (a.priority === 'high' && b.priority !== 'high') return -1;
//       if (a.priority !== 'high' && b.priority === 'high') return 1;
//       return new Date(a.scheduled_date) - new Date(b.scheduled_date);
//     });

//     // Show up to 2 bookings per day
//     dayBookings.slice(0, 2).forEach(booking => {
//       events.push({
//         title: booking.title || 'Booking',
//         start: booking.scheduled_date,
//         allDay: false,
//         backgroundColor: getStatusColor(booking.status),
//         borderColor: 'rgba(255, 255, 255, 0.2)',
//         extendedProps: {
//           booking: booking
//         }
//       });
//     });

//     // If more than 2 bookings, add a "View More" event
//     if (dayBookings.length > 2) {
//       events.push({
//         title: `View More`,
//         start: date,
//         allDay: true,
//         backgroundColor: 'transparent',
//         borderColor: 'transparent',
//         textColor: '#636e72',
//         classNames: ['view-more-event'],
//         extendedProps: {
//           isViewMore: true,
//           bookings: dayBookings
//         }
//       });
//     }
//   });

//   return (
//     <div className="calendar-container">
//       <div className="calendar-header">
//         <Title level={2} className="calendar-title">
//           <CrownFilled className="title-icon" /> Bookings Calendar
//         </Title>
//         <Text className="calendar-subtitle">
//           Manage and view all your scheduled appointments
//         </Text>
//       </div>

//       {error && (
//         <div className="alert alert-danger" role="alert">
//           {error}
//         </div>
//       )}

//       <div className="position-relative">
//         {loading && (
//           <div className="calendar-loading-overlay">
//             <Spin size="large" />
//           </div>
//         )}

//         <FullCalendar
//           plugins={[dayGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           headerToolbar={{
//             left: 'prev,next today',
//             center: 'title',
//             right: ''
//           }}
//           events={events}
//           eventContent={renderEventContent}
//           eventClick={handleEventClick}
//           eventMouseEnter={handleEventMouseEnter}
//           eventMouseLeave={handleEventMouseLeave}
//           datesSet={handleDatesSet}
//           height="auto"
//           dayMaxEvents={3}
//           dayMaxEventRows={3}
//           eventDisplay="block"
//           dayHeaderClassNames="fc-day-header"
//           dayCellClassNames="fc-day-cell"
//           eventClassNames="fc-event-custom"
//           fixedWeekCount={false}
//           showNonCurrentDates={false}
//           contentHeight="auto"
//           aspectRatio={1.5}
//         />

//         <Modal
//           title={
//             <div className="modal-title-content">
//               <ClockCircleFilled className="modal-title-icon" />
//               <span>Bookings for {modalDate}</span>
//             </div>
//           }
//           open={modalOpen}
//           onCancel={closeModal}
//           footer={null}
//           centered
//           width={680}
//           className="booking-modal"
//         >
//           <div className="modal-body">
//             {modalBookings.map((booking, index) => (
//               <div key={index} className="booking-item">
//                 <div className="booking-header">
//                   <div className="booking-title">
//                     {booking.title || 'Booking'}
//                     {booking.priority === 'high' && (
//                       <StarFilled className="booking-priority-icon" />
//                     )}
//                   </div>
//                   <Badge 
//                     color={getStatusColor(booking.status)} 
//                     text={booking.status || 'N/A'} 
//                     className="booking-status"
//                   />
//                 </div>
//                 <div className="booking-details">
//                   <div className="booking-detail">
//                     <span className="detail-label">Payment:</span>
//                     <span className="detail-value" style={{ color: booking.payment_status === 'paid' ? '#28a745' : '#ffc107' }}>
//                       {booking.payment_status === 'paid' ? 'Paid' : 'Pending'}
//                     </span>
//                   </div>
//                   <div className="booking-detail">
//                     <span className="detail-label">Locksmith:</span>
//                     <span className="detail-value" style={{ color: getLocksmithStatusColor(booking.locksmith_status) }}>
//                       {booking.locksmith_status || 'N/A'}
//                     </span>
//                   </div>
//                   <div className="booking-detail">
//                     <span className="detail-label">Time:</span>
//                     <span className="detail-value">{formatDateTime(booking.scheduled_date)}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default BookingsCalendar;

import React, { useState, useEffect, useCallback } from 'react';
import { format, startOfMonth, endOfMonth, parseISO } from 'date-fns';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Badge, Modal, Spin, Typography } from 'antd';
import { CrownFilled, StarFilled, ClockCircleFilled } from '@ant-design/icons';
import api from '../../api/api';
import './BookingsCalendar.css';

const { Title, Text } = Typography;

const BookingsCalendar = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBookings, setModalBookings] = useState([]);
  const [modalDate, setModalDate] = useState('');

  const formatDate = (date) => format(date, 'yyyy-MM-dd');

  const fetchBookings = useCallback(async (start, end) => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        throw new Error('No access token found. Please log in.');
      }

      const response = await api.get('/api/calendar/bookings/', {
        params: {
          start_date: start,
          end_date: end
        },
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      setBookings(Array.isArray(response.data) ? response.data : []);
      setError(null);
      return response.data || [];
    } catch (err) {
      let errorMessage = 'Failed to load bookings. Please try again later.';
      if (err.response?.data) {
        errorMessage = err.response.data.detail || JSON.stringify(err.response.data);
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setBookings([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const start = format(startOfMonth(currentDate), 'yyyy-MM-dd');
    const end = format(endOfMonth(currentDate), 'yyyy-MM-dd');
    fetchBookings(start, end);
  }, [currentDate, fetchBookings]);

  const handleDatesSet = (arg) => {
    setCurrentDate(arg.view.currentStart);
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

  const getStatusColor = (status) => {
    const statusMap = {
      'Scheduled': '#6c5ce7',
      'Completed': '#28a745',
      'Pending': '#ffc107',
      'Cancelled': '#dc3545'
    };
    return statusMap[status] || '#636e72';
  };

  const getLocksmithStatusColor = (status) => {
    const statusMap = {
      'APPROVED': '#28a745',
      'PENDING': '#ffc107',
      'REJECTED': '#dc3545'
    };
    return statusMap[status] || '#636e72';
  };

  const renderEventContent = (eventInfo) => {
    if (eventInfo.event.extendedProps.isViewMore) {
      return (
        <div className="fc-event-main view-more-event">
          <span className="fc-event-title">+{eventInfo.event.extendedProps.bookings.length - 2} more</span>
        </div>
      );
    }
    return (
      <div className="fc-event-main">
        <div className="fc-event-time">
          {format(parseISO(eventInfo.event.startStr), 'h:mm a')}
        </div>
        <span className="fc-event-title">{eventInfo.event.title}</span>
        {eventInfo.event.extendedProps.booking?.priority === 'high' && (
          <StarFilled className="fc-event-priority" />
        )}
      </div>
    );
  };

  const handleEventClick = (clickInfo) => {
    if (clickInfo.event.extendedProps.isViewMore) {
      setModalBookings(clickInfo.event.extendedProps.bookings);
      setModalDate(format(parseISO(clickInfo.event.startStr), 'MMMM d, yyyy'));
      setModalOpen(true);
    }
  };

  const handleEventMouseEnter = (mouseEnterInfo) => {
    if (mouseEnterInfo.event.extendedProps.isViewMore) return;

    const booking = mouseEnterInfo.event.extendedProps.booking;
    if (!booking) return;

    const tooltip = `
      <div class="booking-tooltip-content">
        <div class="booking-tooltip-header">
          <div class="booking-tooltip-title">${booking.title || 'Booking'}</div>
          ${booking.priority === 'high' ? '<div class="booking-tooltip-priority"><StarFilled /></div>' : ''}
        </div>
        <div class="booking-tooltip-row">
          <span class="booking-tooltip-label">Status:</span>
          <span class="booking-tooltip-value" style="color: ${getStatusColor(booking.status)}">
            ${booking.status || 'N/A'}
          </span>
        </div>
        <div class="booking-tooltip-row">
          <span class="booking-tooltip-label">Payment:</span>
          <span class="booking-tooltip-value" style="color: ${booking.payment_status === 'paid' ? '#28a745' : '#ffc107'}">
            ${booking.payment_status === 'paid' ? 'Paid' : 'Pending'}
          </span>
        </div>
        <div class="booking-tooltip-row">
          <span class="booking-tooltip-label">Locksmith:</span>
          <span class="booking-tooltip-value" style="color: ${getLocksmithStatusColor(booking.locksmith_status)}">
            ${booking.locksmith_status || 'N/A'}
          </span>
        </div>
        <div class="booking-tooltip-row">
          <span class="booking-tooltip-label">Time:</span>
          <span class="booking-tooltip-value">${formatDateTime(booking.scheduled_date)}</span>
        </div>
      </div>
    `;

    const tooltipEl = document.createElement('div');
    tooltipEl.className = 'booking-tooltip';
    tooltipEl.innerHTML = tooltip;
    document.body.appendChild(tooltipEl);

    const updatePosition = (e) => {
      tooltipEl.style.left = `${e.pageX + 12}px`;
      tooltipEl.style.top = `${e.pageY + 12}px`;
    };

    updatePosition(mouseEnterInfo.jsEvent);
    document.addEventListener('mousemove', updatePosition);

    mouseEnterInfo.el.tooltip = {
      el: tooltipEl,
      updatePosition,
      remove: () => {
        document.removeEventListener('mousemove', updatePosition);
        if (document.body.contains(tooltipEl)) {
          document.body.removeChild(tooltipEl);
        }
      }
    };
  };

  const handleEventMouseLeave = () => {
    const tooltipEl = document.querySelector('.booking-tooltip');
    if (tooltipEl) {
      document.body.removeChild(tooltipEl);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalBookings([]);
    setModalDate('');
  };

  const events = [];
  const bookingsByDate = bookings.reduce((acc, booking) => {
    const date = format(parseISO(booking.scheduled_date), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(booking);
    return acc;
  }, {});

  Object.keys(bookingsByDate).forEach(date => {
    const dayBookings = bookingsByDate[date];
    
    dayBookings.sort((a, b) => {
      if (a.priority === 'high' && b.priority !== 'high') return -1;
      if (a.priority !== 'high' && b.priority === 'high') return 1;
      return new Date(a.scheduled_date) - new Date(b.scheduled_date);
    });

    dayBookings.slice(0, 2).forEach(booking => {
      events.push({
        title: booking.title || 'Booking',
        start: booking.scheduled_date,
        allDay: false,
        backgroundColor: getStatusColor(booking.status),
        borderColor: 'rgba(255, 255, 255, 0.2)',
        extendedProps: {
          booking: booking
        }
      });
    });

    if (dayBookings.length > 2) {
      events.push({
        title: `View More`,
        start: date,
        allDay: true,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        textColor: '#636e72',
        classNames: ['view-more-event'],
        extendedProps: {
          isViewMore: true,
          bookings: dayBookings
        }
      });
    }
  });

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <Title level={2} className="calendar-title">
          <CrownFilled className="title-icon" /> Bookings Calendar
        </Title>
        <Text className="calendar-subtitle">
          Manage and view all your scheduled appointments
        </Text>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="position-relative">
        {loading && (
          <div className="calendar-loading-overlay">
            <Spin size="large" />
          </div>
        )}

        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: ''
          }}
          events={events}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventMouseEnter={handleEventMouseEnter}
          eventMouseLeave={handleEventMouseLeave}
          datesSet={handleDatesSet}
          height="auto"
          dayMaxEvents={3}
          dayMaxEventRows={3}
          eventDisplay="block"
          dayHeaderClassNames="fc-day-header"
          dayCellClassNames="fc-day-cell"
          eventClassNames="fc-event-custom"
          fixedWeekCount={false}
          showNonCurrentDates={false}
          contentHeight="auto"
          aspectRatio={1.5}
        />

        <Modal
          title={
            <div className="modal-title-content">
              <ClockCircleFilled className="modal-title-icon" />
              <span>Bookings for {modalDate}</span>
            </div>
          }
          open={modalOpen}
          onCancel={closeModal}
          footer={null}
          centered
          width={680}
          className="booking-modal"
        >
          <div className="modal-body">
            {modalBookings.map((booking, index) => (
              <div key={index} className="booking-item">
                <div className="booking-header">
                  <div className="booking-title">
                    {booking.title || 'Booking'}
                    {booking.priority === 'high' && (
                      <StarFilled className="booking-priority-icon" />
                    )}
                  </div>
                  <Badge 
                    color={getStatusColor(booking.status)} 
                    text={booking.status || 'N/A'} 
                    className="booking-status"
                  />
                </div>
                <div className="booking-details">
                  <div className="booking-detail">
                    <span className="detail-label">Payment:</span>
                    <span className="detail-value" style={{ color: booking.payment_status === 'paid' ? '#28a745' : '#ffc107' }}>
                      {booking.payment_status === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                  <div className="booking-detail">
                    <span className="detail-label">Locksmith:</span>
                    <span className="detail-value" style={{ color: getLocksmithStatusColor(booking.locksmith_status) }}>
                      {booking.locksmith_status || 'N/A'}
                    </span>
                  </div>
                  <div className="booking-detail">
                    <span className="detail-label">Time:</span>
                    <span className="detail-value">{formatDateTime(booking.scheduled_date)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default BookingsCalendar;