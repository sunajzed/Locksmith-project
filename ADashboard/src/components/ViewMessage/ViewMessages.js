

import React, { useState, useEffect } from 'react';
import { Table, Container, Alert, Spinner } from 'react-bootstrap';
import api from '../../api/api';

const ViewMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isAdmin = localStorage.getItem('userRole') === 'admin';
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!isAdmin) return;

    const fetchMessages = async () => {
      try {
        const response = await api.get('/api/contact/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setMessages(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [isAdmin, accessToken]);

  if (!isAdmin) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">You must be logged in as admin to view this page.</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Contact Messages</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      {messages.length === 0 ? (
        <Alert variant="info">No messages found</Alert>
      ) : (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th style={{ backgroundColor: 'black', color: 'white' }}>#</th>
              <th style={{ backgroundColor: 'black', color: 'white' }}>Name</th>
              <th style={{ backgroundColor: 'black', color: 'white' }}>Email</th>
              <th style={{ backgroundColor: 'black', color: 'white' }}>Subject</th>
              <th style={{ backgroundColor: 'black', color: 'white' }}>Message</th>
              <th style={{ backgroundColor: 'black', color: 'white' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message, index) => (
              <tr key={message.id}>
                <td>{index + 1}</td>
                <td>{message.name}</td>
                <td>{message.email}</td>
                <td>{message.subject}</td>
                <td>{message.message}</td>
                <td>{new Date(message.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ViewMessages;