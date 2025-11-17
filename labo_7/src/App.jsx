import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Protected from "./Protected";
import CustomerList from "./components/CustomerList";
import SaleForm from "./components/SaleForm";
import SalesList from "./components/SalesList";
import SalesReport from "./components/SalesReport";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta por defecto redirige al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Ruta de autenticación */}
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Rutas de la aplicación */}
        <Route path="/protected" element={<Protected />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/sales/new" element={<SaleForm />} />
        <Route path="/sales" element={<SalesList />} />
        <Route path="/sales/report" element={<SalesReport />} /> 
      </Routes>
    </Router>
  );
};

export default App;