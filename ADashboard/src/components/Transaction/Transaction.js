// import React from "react";
// import "./Transaction.css"; // Custom CSS
// import { Table, Badge } from "react-bootstrap"; // Bootstrap components

// const transactionsData = [
//   { id: 1, amount: 50.0, status: "Completed" },
//   { id: 2, amount: 75.5, status: "Pending" },
//   { id: 3, amount: 100.0, status: "Failed" },
// ];

// const getStatusBadge = (status) => {
//   switch (status) {
//     case "Completed":
//       return "success";
//     case "Pending":
//       return "warning";
//     case "Failed":
//       return "danger";
//     default:
//       return "secondary";
//   }
// };

// const TransactionTable = () => {
//   return (
//     <div className="transaction-container">
//       <h2 className="text-center mb-4">Transaction Details</h2>
//       <div className="table-responsive">
//         <Table striped bordered hover>
//           <thead className="table-dark">
//             <tr>
//               <th>ID</th>
//               <th>Amount ($)</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactionsData.map((transaction) => (
//               <tr key={transaction.id}>
//                 <td>{transaction.id}</td>
//                 <td>${transaction.amount.toFixed(2)}</td>
//                 <td>
//                   <Badge bg={getStatusBadge(transaction.status)}>
//                     {transaction.status}
//                   </Badge>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default TransactionTable;
import React from "react";
import { Table, Badge } from "react-bootstrap"; // Bootstrap components
import "./Transaction.css"; // Custom CSS for styling

const transactions = [
  {
    id: 1,
    customerName: "John Doe",
    locksmithName: "Mike Smith",
    location: "New York, NY",
    amountPaid: "$120",
    amountReceived: "$90",
    commission: "$30",
    status: "Completed",
  },
  {
    id: 2,
    customerName: "Alice Johnson",
    locksmithName: "Robert Brown",
    location: "Los Angeles, CA",
    amountPaid: "$150",
    amountReceived: "$110",
    commission: "$40",
    status: "Pending",
  },
  {
    id: 3,
    customerName: "David Lee",
    locksmithName: "Sarah Wilson",
    location: "Chicago, IL",
    amountPaid: "$80",
    amountReceived: "$60",
    commission: "$20",
    status: "Completed",
  },
];

const TransactionTable = () => {
  return (
    <div className="transaction-container">
      <h2 className="text-center mb-4">Transaction Details</h2>
      <div className="table-responsive">
        <Table bordered hover className="transaction-table">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Locksmith Name</th>
              <th>Location</th>
              <th>Amount Paid</th>
              <th>Amount Received</th>
              <th>Commission Deducted</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.customerName}</td>
                <td>{transaction.locksmithName}</td>
                <td>{transaction.location}</td>
                <td>{transaction.amountPaid}</td>
                <td>{transaction.amountReceived}</td>
                <td>{transaction.commission}</td>
                <td>
                  <Badge
                    bg={transaction.status === "Completed" ? "success" : "warning"}
                  >
                    {transaction.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionTable;
