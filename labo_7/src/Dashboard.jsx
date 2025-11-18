import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    {
      title: "Clientes",
      icon: "👥",
      path: "/customers",
      color: "#667eea",
    },
    {
      title: "Nueva Venta",
      icon: "💰",
      path: "/sales/new",
      color: "#48bb78",
    },
    {
      title: "Ventas",
      icon: "📋",
      path: "/sales",
      color: "#ed8936",
    },
    {
      title: "Reporte",
      icon: "📊",
      path: "/sales/report",
      color: "#9f7aea",
    },
  ];

  if (!user) return <div style={styles.loading}>Cargando...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <div style={styles.navContent}>
          <h2 style={styles.navTitle}>Sistema de Ventas</h2>
          <div style={styles.userSection}>
            <span style={styles.userName}>{user.name}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Salir
            </button>
          </div>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.welcome}>
          <h1 style={styles.welcomeTitle}>¡Bienvenido!</h1>
          <p style={styles.welcomeText}>Selecciona una opción del menú</p>
        </div>

        <div style={styles.grid}>
          {menuItems.map((item, index) => (
            <div
              key={index}
              style={{...styles.card, borderTop: `4px solid ${item.color}`}}
              onClick={() => navigate(item.path)}
            >
              <div style={styles.cardIcon}>{item.icon}</div>
              <h3 style={styles.cardTitle}>{item.title}</h3>
            </div>
          ))}
        </div>

        <div style={styles.infoBox}>
          <h3 style={styles.infoTitle}>Información del Usuario</h3>
          <p style={styles.infoItem}><strong>Nombre:</strong> {user.name}</p>
          <p style={styles.infoItem}><strong>Email:</strong> {user.email}</p>
          <p style={styles.infoItem}><strong>ID:</strong> {user.id}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f7fafc",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    fontSize: "18px",
  },
  navbar: {
    background: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    padding: "15px 0",
  },
  navContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navTitle: {
    margin: 0,
    fontSize: "22px",
    color: "#2d3748",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  userName: {
    fontSize: "14px",
    color: "#4a5568",
  },
  logoutBtn: {
    padding: "8px 16px",
    background: "#fc8181",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "30px 20px",
  },
  welcome: {
    textAlign: "center",
    marginBottom: "40px",
  },
  welcomeTitle: {
    fontSize: "32px",
    margin: "0 0 10px 0",
    color: "#2d3748",
  },
  welcomeText: {
    fontSize: "16px",
    color: "#718096",
    margin: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    textAlign: "center",
  },
  cardIcon: {
    fontSize: "48px",
    marginBottom: "15px",
  },
  cardTitle: {
    margin: 0,
    fontSize: "18px",
    color: "#2d3748",
  },
  infoBox: {
    background: "white",
    padding: "25px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  infoTitle: {
    margin: "0 0 15px 0",
    fontSize: "18px",
    color: "#2d3748",
  },
  infoItem: {
    margin: "8px 0",
    fontSize: "14px",
    color: "#4a5568",
  },
};

export default Dashboard;