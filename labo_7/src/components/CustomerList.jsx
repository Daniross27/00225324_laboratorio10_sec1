import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/customers");
      
      if (response.data.success) {
        setCustomers(response.data.data);
      }
      setError("");
    } catch (err) {
      setError("Error al cargar los clientes");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={styles.loading}>Cargando clientes...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>
          ← Volver
        </button>
        <h1 style={styles.title}>Lista de Clientes</h1>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {customers.length === 0 ? (
        <div style={styles.noData}>No hay clientes registrados</div>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Código</th>
                <th style={styles.th}>Nombre</th>
                <th style={styles.th}>Dirección</th>
                <th style={styles.th}>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} style={styles.tr}>
                  <td style={styles.td}>{customer.id}</td>
                  <td style={styles.td}>{customer.code}</td>
                  <td style={styles.td}>{customer.name}</td>
                  <td style={styles.td}>{customer.address}</td>
                  <td style={styles.td}>{customer.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={styles.footer}>
        Total de clientes: <strong>{customers.length}</strong>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f7fafc",
    padding: "20px",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  header: {
    maxWidth: "1200px",
    margin: "0 auto 30px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  backBtn: {
    padding: "10px 20px",
    background: "#4a5568",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  title: {
    margin: 0,
    fontSize: "28px",
    color: "#2d3748",
  },
  error: {
    maxWidth: "1200px",
    margin: "0 auto 20px",
    padding: "15px",
    background: "#fee",
    color: "#c33",
    borderRadius: "6px",
  },
  noData: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px",
    background: "white",
    borderRadius: "8px",
    textAlign: "center",
    color: "#718096",
  },
  tableWrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
    background: "white",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  thead: {
    background: "#667eea",
    color: "white",
  },
  th: {
    padding: "15px",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "600",
  },
  tr: {
    borderBottom: "1px solid #e2e8f0",
  },
  td: {
    padding: "15px",
    fontSize: "14px",
    color: "#4a5568",
  },
  footer: {
    maxWidth: "1200px",
    margin: "20px auto 0",
    padding: "15px",
    background: "white",
    borderRadius: "6px",
    fontSize: "14px",
    color: "#4a5568",
  },
};

export default CustomerList;