import React from "react";
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";
import { Table, Button, Card, Row, Col } from "react-bootstrap";
import { CSVLink } from "react-csv";
import "./StatisticsReports.css";

// Mock Data
const transactionData = [
  { month: "Jan", transactions: 120, revenue: 3000 },
  { month: "Feb", transactions: 150, revenue: 4000 },
  { month: "Mar", transactions: 180, revenue: 4500 },
  { month: "Apr", transactions: 210, revenue: 5000 },
  { month: "May", transactions: 250, revenue: 6000 },
];

const serviceData = [
  { name: "Lock Repair", value: 500 },
  { name: "Key Duplication", value: 450 },
  { name: "Emergency Unlock", value: 600 },
  { name: "New Lock Installation", value: 520 },
];

const locksmiths = [
  { id: 1, name: "John Doe", transactions: 50, earnings: "$2500" },
  { id: 2, name: "Alice Johnson", transactions: 45, earnings: "$2200" },
  { id: 3, name: "Robert Brown", transactions: 40, earnings: "$2000" },
];

const platformReport = [
  ["Month", "Transactions", "Revenue"],
  ...transactionData.map((item) => [item.month, item.transactions, `$${item.revenue}`]),
];

const serviceReport = [
  ["Service", "Requests"],
  ...serviceData.map((service) => [service.name, service.value]),
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const StatisticsReports = () => {
  return (
    <div className="statistics-container">
      <h2 className="text-center mb-4">Platform Statistics & Reports</h2>

      {/* Total Transactions and Revenue */}
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Transactions (Monthly)</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={transactionData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="transactions" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Revenue Insights (Monthly Earnings)</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={transactionData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Popular Services */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Popular Services</Card.Title>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={serviceData} cx="50%" cy="50%" outerRadius={100} fill="#00C49F" dataKey="value" label>
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>

      {/* Top Locksmiths */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Top Locksmiths</Card.Title>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Locksmith</th>
                <th>Transactions</th>
                <th>Earnings</th>
              </tr>
            </thead>
            <tbody>
              {locksmiths.map((locksmith) => (
                <tr key={locksmith.id}>
                  <td>{locksmith.id}</td>
                  <td>{locksmith.name}</td>
                  <td>{locksmith.transactions}</td>
                  <td>{locksmith.earnings}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Download Reports */}
      <Card className="mb-4">
        <Card.Body>
          <h4>Generate Reports</h4>
          <CSVLink data={platformReport} filename="platform_performance.csv">
            <Button variant="primary" className="me-3">Download Platform Report</Button>
          </CSVLink>
          <CSVLink data={serviceReport} filename="service_demand.csv">
            <Button variant="secondary">Download Service Demand Report</Button>
          </CSVLink>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StatisticsReports;
