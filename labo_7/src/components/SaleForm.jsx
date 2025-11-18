import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SaleForm = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    id_customer: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/customers");
      if (response.data.success) {
        setCustomers(response.data.data);
      }
    } catch (err) {
      setMessage({
        text: "Error al cargar clientes",
        type: "error",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (message.text) setMessage({ text: "", type: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.id_customer) {
      setMessage({
        text: "Complete todos los campos",
        type: "error",
      });
      return;
    }

    if (parseFloat(formData.amount) <= 0) {
      setMessage({
        text: "El monto debe ser mayor a 0",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/sales", {
        amount: parseFloat(formData.amount),
        id_customer: parseInt(formData.id_customer),
      });

      if (response.data.success) {
        setMessage({
          text: "¡Venta registrada exitosamente!",
          type: "success",
        });
        setFormData({ amount: "", id_customer: "" });
        
        setTimeout(() => {
          setMessage({ text: "", type: "" });
        }, 3000);
      }
    } catch (err) {
      setMessage({
        text: "Error al registrar la venta",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>
          ← Volver
        </button>
        <h1 style={styles.title}>Registrar Nueva Venta</h1>
      </div>

      <div style={styles.formWrapper}>
        {message.text && (
          <div
            style={{
              ...styles.message,
              ...(message.type === "success"
                ? styles.successMessage
                : styles.errorMessage),
            }}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Cliente *</label>
            <select
              name="id_customer"
              value={formData.id_customer}
              onChange={handleChange}
              style={styles.select}
              disabled={loading}
            >
              <option value="">Seleccione un cliente</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.code} - {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Monto de la Venta *</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0.01"
              style={styles.input}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar Venta"}
          </button>
        </form>
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
  header: {
    maxWidth: "600px",
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
  formWrapper: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  message: {
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "20px",
    fontSize: "14px",
  },
  successMessage: {
    background: "#c6f6d5",
    color: "#22543d",
  },
  errorMessage: {
    background: "#fed7d7",
    color: "#742a2a",
  },
  form: {
    background: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#2d3748",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "2px solid #e2e8f0",
    borderRadius: "6px",
    boxSizing: "border-box",
    outline: "none",
  },
  select: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "2px solid #e2e8f0",
    borderRadius: "6px",
    boxSizing: "border-box",
    background: "white",
    cursor: "pointer",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "600",
    color: "white",
    background: "#48bb78",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
};

export default SaleForm;