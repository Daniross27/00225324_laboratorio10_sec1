import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/sales");
      
      if (response.data.success) {
        setSales(response.data.data);
      }
      setError("");
    } catch (err) {
      setError("Error al cargar las ventas");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getTotalAmount = () => {
    return sales.reduce((sum, sale) => sum + parseFloat(sale.amount), 0);
  };

  if (loading) return <div style={styles.loading}>Cargando ventas...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>
          ← Volver
        </button>
        <h1 style={styles.title}>Lista de Ventas</h1>
        <button onClick={fetchSales} style={styles.refreshBtn}>
          🔄 Actualizar
        </button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {sales.length === 0 ? (
        <div style={styles.noData}>No hay ventas registradas</div>
      ) : (
        <>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Cliente</th>
                  <th style={styles.th}>Código</th>
                  <th style={styles.th}>Monto</th>
                  <th style={styles.th}>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id} style={styles.tr}>
                    <td style={styles.td}>#{sale.id}</td>
                    <td style={styles.td}>{sale.customer_name}</td>
                    <td style={styles.td}>{sale.customer_code}</td>
                    <td style={{...styles.td, ...styles.amount}}>
                      {formatAmount(sale.amount)}
                    </td>
                    <td style={styles.td}>{formatDate(sale.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={styles.footer}>
            <div>
              <strong>Total de ventas:</strong> {sales.length}
            </div>
            <div>
              <strong>Monto total:</strong> {formatAmount(getTotalAmount())}
            </div>
          </div>
        </>
      )}
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
  refreshBtn: {
    padding: "10px 20px",
    background: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    marginLeft: "auto",
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
  amount: {
    fontWeight: "600",
    color: "#48bb78",
  },
  footer: {
    maxWidth: "1200px",
    margin: "20px auto 0",
    padding: "15px",
    background: "white",
    borderRadius: "6px",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#4a5568",
  },
};

export default SalesList;