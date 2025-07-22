import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col, Card, Spinner } from 'react-bootstrap';
import { FileEarmarkArrowDown } from 'react-bootstrap-icons';
import api from '../../api/api';
import './EarningsSummary.css';

const EarningsSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/dashboard-summary/');
      setSummary(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch earnings summary. Please try again later.');
      console.error('Error fetching earnings summary:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await api.get('/api/dashboard-summary/', {
        params: { export: 'csv' },
        responseType: 'blob',
      });

      // Create a blob URL for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'earnings_summary.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Failed to export earnings summary.');
      console.error('Error exporting earnings summary:', err);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="earnings-summary">
      <Row className="mb-4">
        <Col>
          <h2>Earnings Summary</h2>
        </Col>
        <Col className="text-end">
          <Button 
            variant="success" 
            onClick={handleExportCSV}
            disabled={loading || !summary}
            className="export-btn"
          >
            <FileEarmarkArrowDown className="me-2" />
            Export as CSV
          </Button>
        </Col>
      </Row>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {summary && (
        <>
          <Card className="mb-4">
            <Card.Body>
              <h5 className="card-title">Platform Summary</h5>
              <div className="platform-summary">
                <div className="summary-item">
                  <span className="label">Total Platform Earnings:</span>
                  <span className="value">{formatCurrency(summary.total_platform_earnings)}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Total Jobs:</span>
                  <span className="value">
                    {summary.locksmiths.reduce((total, ls) => total + ls.job_count, 0)}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5 className="card-title mb-4">Locksmith Earnings</h5>
              <div className="table-responsive">
                <Table striped bordered hover className="earnings-table">
                  <thead>
                    <tr>
                      <th>Locksmith ID</th>
                      <th>Username</th>
                      <th className="text-end">Jobs Completed</th>
                      <th className="text-end">Total Earnings</th>
                      <th className="text-end">Transferred to Locksmith</th>
                      <th className="text-end">Admin Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.locksmiths.map((locksmith) => (
                      <tr key={locksmith.locksmith_service__locksmith__user__id}>
                        <td>{locksmith.locksmith_service__locksmith__user__id}</td>
                        <td>{locksmith.locksmith_service__locksmith__user__username}</td>
                        <td className="text-end">{locksmith.job_count}</td>
                        <td className="text-end">{formatCurrency(locksmith.total_earnings)}</td>
                        <td className="text-end">{formatCurrency(locksmith.total_transferred)}</td>
                        <td className="text-end">{formatCurrency(locksmith.total_admin_amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="table-active">
                      <th colSpan="2" className="text-end">Totals:</th>
                      <th className="text-end">
                        {summary.locksmiths.reduce((sum, ls) => sum + ls.job_count, 0)}
                      </th>
                      <th className="text-end">
                        {formatCurrency(
                          summary.locksmiths.reduce((sum, ls) => sum + parseFloat(ls.total_earnings), 0)
                        )}
                      </th>
                      <th className="text-end">
                        {formatCurrency(
                          summary.locksmiths.reduce((sum, ls) => sum + parseFloat(ls.total_transferred), 0)
                        )}
                      </th>
                      <th className="text-end">
                        {formatCurrency(
                          summary.locksmiths.reduce((sum, ls) => sum + parseFloat(ls.total_admin_amount), 0)
                        )}
                      </th>
                    </tr>
                  </tfoot>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
};

export default EarningsSummary;
