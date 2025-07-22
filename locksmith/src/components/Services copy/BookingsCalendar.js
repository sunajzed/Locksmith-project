import React, { useState, useEffect, useCallback } from 'react';
import { format, startOfMonth, endOfMonth, parseISO, startOfDay, endOfDay } from 'date-fns';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import api from '../../api/api';
import './BookingsCalendar.css';

const BookingsCalendar = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Format date to YYYY-MM-DD
  const formatDate = (date) => format(date, 'yyyy-MM-dd');

  const fetchBookings = useCallback(async (start, end) => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        throw new Error('No access token found. Please log in.');
      }

      console.log('Fetching bookings with params:', {
        start_date: start,
        end_date: end
      });

      const response = await api.get('/api/calendar/bookings/', {
        params: {
          start_date: start,
          end_date: end
        },
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      console.log('Bookings API response:', response.data);
      setBookings(Array.isArray(response.data) ? response.data : []);
      setError(null);
      return response.data || [];
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
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load and when month changes
  useEffect(() => {
    const start = format(startOfMonth(currentDate), 'yyyy-MM-dd');
    const end = format(endOfMonth(currentDate), 'yyyy-MM-dd');
    fetchBookings(start, end);
  }, [currentDate, fetchBookings]);

  const handleDatesSet = (arg) => {
    // Update current date when month changes
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
      'Scheduled': '#3b82f6',    // blue
      'Completed': '#10b981',     // green
      'Pending': '#f59e0b',       // yellow
      'Cancelled': '#ef4444'      // red
    };
    return statusMap[status] || '#6b7280'; // gray
  };

  const getLocksmithStatusColor = (status) => {
    const statusMap = {
      'APPROVED': '#10b981',      // green
      'PENDING': '#f59e0b',       // yellow
      'REJECTED': '#ef4444'       // red
    };
    return statusMap[status] || '#6b7280'; // gray
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div className="fc-event-main">
        <span className="fc-event-title">{eventInfo.event.title}</span>
      </div>
    );
  };

  const handleEventMouseEnter = (mouseEnterInfo) => {
    const booking = mouseEnterInfo.event.extendedProps.booking;
    if (!booking) return;

    const tooltip = `
      <div class="p-2">
        <div class="fw-bold">${booking.title || 'Booking'}</div>
        <div>Status: <span class="badge" style="background-color: ${getStatusColor(booking.status)}">${booking.status || 'N/A'}</span></div>
        <div>Payment: <span class="badge" style="background-color: ${booking.payment_status === 'paid' ? '#10b981' : '#f59e0b'}">
          ${booking.payment_status === 'paid' ? 'Paid' : 'Pending'}
        </span></div>
        <div>Locksmith: <span class="badge" style="background-color: ${getLocksmithStatusColor(booking.locksmith_status)}">
          ${booking.locksmith_status || 'N/A'}
        </span></div>
        <div>Date: ${formatDateTime(booking.scheduled_date)}</div>
      </div>
    `;

    const tooltipEl = document.createElement('div');
    tooltipEl.className = 'booking-tooltip';
    tooltipEl.innerHTML = tooltip;
    document.body.appendChild(tooltipEl);

    const updatePosition = (e) => {
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.left = `${e.pageX + 10}px`;
      tooltipEl.style.top = `${e.pageY + 10}px`;
      tooltipEl.style.zIndex = '9999';
      tooltipEl.style.backgroundColor = 'white';
      tooltipEl.style.padding = '10px';
      tooltipEl.style.borderRadius = '4px';
      tooltipEl.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
      tooltipEl.style.maxWidth = '250px';
      tooltipEl.style.pointerEvents = 'none';
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

  const handleEventMouseLeave = (mouseLeaveInfo) => {
    const tooltipEl = document.querySelector('.booking-tooltip');
    if (tooltipEl) {
      document.body.removeChild(tooltipEl);
    }
  };

  // Format events for FullCalendar
  const events = bookings.map(booking => ({
    title: booking.title || 'Booking',
    start: booking.scheduled_date,
    allDay: true,
    backgroundColor: getStatusColor(booking.status),
    borderColor: getStatusColor(booking.status),
    extendedProps: {
      booking: booking
    }
  }));

  return (
    <div className="p-4 calendar-container">
      <h2 className="mb-4">Bookings Calendar</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="position-relative">
        {loading && (
          <div className="calendar-loading-overlay">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
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
          eventMouseEnter={handleEventMouseEnter}
          eventMouseLeave={handleEventMouseLeave}
          datesSet={handleDatesSet}
          height="auto"
          dayMaxEvents={true}
          eventDisplay="block"
          dayHeaderClassNames="fc-day-header"
          dayCellClassNames="fc-day-cell"
          eventClassNames="fc-event-custom"
          eventBackgroundColor="#3b82f6"
          eventBorderColor="#3b82f6"
          eventTextColor="#ffffff"
          fixedWeekCount={false}
          showNonCurrentDates={false}
        />
      </div>
    </div>
  );
};

export default BookingsCalendar;