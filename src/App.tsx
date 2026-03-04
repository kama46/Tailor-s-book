/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { CustomerList } from "./pages/CustomerList";
import { AddCustomer } from "./pages/AddCustomer";
import { CustomerProfile } from "./pages/CustomerProfile";
import { AddMeasurement } from "./pages/AddMeasurement";
import { Orders } from "./pages/Orders";
import { Settings } from "./pages/Settings";
import "./i18n/i18n";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <CustomerList />
            </Layout>
          }
        />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/customer/:id" element={<CustomerProfile />} />
        <Route
          path="/customer/:id/add-measurement"
          element={<AddMeasurement />}
        />
        <Route
          path="/orders"
          element={
            <Layout>
              <Orders />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}
