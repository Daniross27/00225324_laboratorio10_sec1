import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SalesReport = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/sales/report");
      
      if (response.data.success) {
        setReport(response.data.data);
      }
      setError("");
    } catch (err) {
      setError("Error al cargar el reporte");
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getTotalSales = () => {
    return report.reduce((sum, item) => sum + parseFloat(item.total_sales), 0);
  };

  if (loading) return <div style={styles.loading}>Cargando reporte...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>
          ← Volver
        </button>
        <h1 style={styles.title}>📊 Reporte de Ventas</h1>
        <button onClick={fetchReport} style={styles.refreshBtn}>
          🔄 Actualizar
        </button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {report.length === 0 ? (
        <div style={styles.noData}>No hay datos de ventas para mostrar</div>
      ) : (
        <>
          <div style={styles.summaryGrid}>
            <div style={styles.summaryCard}>
              <div style={styles.summaryValue}>{report.length}</div>
              <div style={styles.summaryLabel}>Clientes</div>
            </div>
            <div style={styles.summaryCard}>
              <div style={styles.summaryValue}>{formatAmount(getTotalSales())}</div>
              <div style={styles.summaryLabel}>Ventas Totales</div>
            </div>
            <div style={styles.summaryCard}>
              <div style={styles.summaryValue}>
                {formatAmount(getTotalSales() / report.length)}
              </div>
              <div style={styles.summaryLabel}>Promedio por Cliente</div>
            </div>
          </div>

          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  <th style={styles.th}>#</th>
                  <th style={styles.th}>Cliente</th>
                  <th style={styles.th}>Total de Ventas</th>
                  <th style={styles.th}>% del Total</th>
                </tr>
              </thead>
              <tbody>
                {report.map((item, index) => {
                  const percentage = (parseFloat(item.total_sales) / getTotalSales()) * 100;
                  return (
                    <tr key={index} style={styles.tr}>
                      <td style={styles.tdNumber}>{index + 1}</td>
                      <td style={styles.td}>{item.name}</td>
                      <td style={{...styles.td, ...styles.amount}}>
                        {formatAmount(item.total_sales)}
                      </td>
                      <td style={styles.td}>
                        <div style={styles.percentageContainer}>
                          <div style={styles.percentageBar}>
                            <div 
                              style={{
                                ...styles.percentageFill,
                                width: `${percentage}%`
                              }}
                            />
                          </div>
                          <span>{percentage.toFixed(1)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
  summaryGrid: {
    maxWidth: "1200px",
    margin: "0 auto 30px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  summaryCard: {
    background: "white",
    padding: "25px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  summaryValue: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#667eea",
    marginBottom: "8px",
  },
  summaryLabel: {
    fontSize: "14px",
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
  tdNumber: {
    padding: "15px",
    fontSize: "14px",
    color: "#718096",
    fontWeight: "600",
    width: "60px",
  },
  amount: {
    fontWeight: "600",
    color: "#48bb78",
  },
  percentageContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  percentageBar: {
    flex: 1,
    height: "8px",
    background: "#e2e8f0",
    borderRadius: "4px",
    overflow: "hidden",
  },
  percentageFill: {
    height: "100%",
    background: "#667eea",
    transition: "width 0.5s ease",
  },
};

export default SalesReport;