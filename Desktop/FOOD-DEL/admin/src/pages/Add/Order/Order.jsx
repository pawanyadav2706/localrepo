import React, { useEffect, useState } from "react";
import "./Order.css";
import axios from "axios";

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Dummy data for now (API call karna ho to axios se backend hit karo)
    const fetchOrders = async () => {
      try {
        // Example API
        // const res = await axios.get(`${url}/api/order/list`);
        // setOrders(res.data.orders);

        // Dummy data
        setOrders([
          {
            id: "ORD12345",
            customer: "Amit Sharma",
            email: "amit@example.com",
            items: "2x Pizza, 1x Coke",
            total: 650,
            status: "Pending",
            date: "2025-09-24",
          },
          {
            id: "ORD12346",
            customer: "Neha Gupta",
            email: "neha@example.com",
            items: "1x Pasta, 1x Brownie",
            total: 480,
            status: "Delivered",
            date: "2025-09-23",
          },
          {
            id: "ORD12347",
            customer: "Rohan Verma",
            email: "rohan@example.com",
            items: "3x Burger, 2x Fries",
            total: 720,
            status: "Out for Delivery",
            date: "2025-09-22",
          },
        ]);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [url]);

  return (
    <div className="order">
      <h2 className="order-title">📦 Orders Management</h2>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Items</th>
              <th>Total (₹)</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.email}</td>
                  <td>{order.items}</td>
                  <td>₹{order.total}</td>
                  <td>
                    <span className={`status ${order.status.replace(/ /g, "-").toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-orders">
                  🚫 No orders available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
