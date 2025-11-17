import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay un usuario logueado
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
      description: "Ver lista de todos los clientes",
      icon: "👥",
      path: "/customers",
      color: "#646cff",
    },
    {
      title: "Nueva Venta",
      description: "Registrar una nueva venta",
      icon: "💰",
      path: "/sales/new",
      color: "#27ae60",
    },
    {
      title: "Lista de Ventas",
      description: "Ver historial de ventas",
      icon: "📊",
      path: "/sales",
      color: "#e67e22",
    },
    {
      title: "Reporte de Ventas",
      description: "Ver estadísticas por cliente",
      icon: "📈",
      path: "/sales/report",
      color: "#9b59b6",
    },
  ];

  if (!user) {
    return (
      <div style={styles.loading}>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.headerTitle}>Sistema de Ventas</h1>
            <p style={styles.headerSubtitle}>
              Bienvenido, <strong>{user.name}</strong>
            </p>
          </div>
          <button onClick={handleLogout} style={styles.logoutButton}>
            🚪 Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <div style={styles.welcomeCard}>
          <h2 style={styles.welcomeTitle}>¡Bienvenido!</h2>
          <p style={styles.welcomeText}>
            Selecciona algo para ver los resultados
          </p>
        </div>

        {/* Menu Grid */}
        <div style={styles.grid}>
          {menuItems.map((item, index) => (
            <div
              key={index}
              style={{
                ...styles.card,
                borderLeft: `4px solid ${item.color}`,
              }}
              onClick={() => navigate(item.path)}
            >
              <div style={styles.cardIcon}>{item.icon}</div>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.cardDescription}>{item.description}</p>
              <div style={styles.cardArrow}>→</div>
            </div>
          ))}
        </div>

        {/* User Info Card */}
        <div style={styles.userInfoCard}>
          <h3 style={styles.userInfoTitle}>Información del Usuario</h3>
          <div style={styles.userInfoContent}>
            <div style={styles.userInfoItem}>
              <span style={styles.userInfoLabel}>Nombre:</span>
              <span style={styles.userInfoValue}>{user.name}</span>
            </div>
            <div style={styles.userInfoItem}>
              <span style={styles.userInfoLabel}>Email:</span>
              <span style={styles.userInfoValue}>{user.email}</span>
            </div>
            <div style={styles.userInfoItem}>
              <span style={styles.userInfoLabel}>ID:</span>
              <span style={styles.userInfoValue}>{user.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#f5f5f5",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    fontSize: "18px",
    color: "#666",
  },
  header: {
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  headerContent: {
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
  },
  headerTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    margin: 0,
  },
  headerSubtitle: {
    fontSize: "14px",
    color: "#666",
    margin: "5px 0 0 0",
  },
  logoutButton: {
    padding: "10px 20px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "background-color 0.3s",
  },
  content: {
    padding: "30px 20px",
  },
  welcomeCard: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "30px",
    textAlign: "center",
  },
  welcomeTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  welcomeText: {
    fontSize: "16px",
    color: "#666",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  card: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "transform 0.3s, box-shadow 0.3s",
    position: "relative",
  },
  cardIcon: {
    fontSize: "48px",
    marginBottom: "15px",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "8px",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "15px",
  },
  cardArrow: {
    position: "absolute",
    bottom: "20px",
    right: "20px",
    fontSize: "24px",
    color: "#646cff",
    fontWeight: "bold",
  },
  userInfoCard: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  userInfoTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  userInfoContent: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  userInfoItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  },
  userInfoLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#666",
  },
  userInfoValue: {
    fontSize: "14px",
    color: "#333",
  },
};

// Agregar efecto hover con JavaScript
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.15) !important;
    }
    .logout-button:hover {
      background-color: #c0392b !important;
    }
  `;
  document.head.appendChild(styleSheet);
}

export default Dashboard;