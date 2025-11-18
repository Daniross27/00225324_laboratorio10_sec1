import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signin", { 
        email, 
        password 
      });
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Sistema de Ventas</h1>
          <p style={styles.subtitle}>Iniciar Sesión</p>
        </div>
        
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button 
            type="submit" 
            style={loading ? {...styles.button, ...styles.buttonDisabled} : styles.button}
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
  },
  card: {
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    maxWidth: "400px",
    width: "100%",
    overflow: "hidden",
  },
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "30px",
    textAlign: "center",
    color: "white",
  },
  title: {
    margin: "0 0 10px 0",
    fontSize: "24px",
    fontWeight: "bold",
  },
  subtitle: {
    margin: 0,
    fontSize: "14px",
    opacity: 0.9,
  },
  form: {
    padding: "30px",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "14px",
    border: "2px solid #e0e0e0",
    borderRadius: "6px",
    boxSizing: "border-box",
    transition: "border-color 0.3s",
    outline: "none",
  },
  error: {
    padding: "10px",
    background: "#fee",
    color: "#c33",
    borderRadius: "6px",
    fontSize: "14px",
    marginBottom: "15px",
  },
  button: {
    width: "100%",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "600",
    color: "white",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
};

export default Login;