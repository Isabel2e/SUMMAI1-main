import React, { useState } from "react";
import "./User.scss";

interface UserFormState {
  username: string;
  email: string;
  password: string;
  re_password: string;
  role: string;
}

const User: React.FC = () => {
  const [formData, setFormData] = useState<UserFormState>({
    username: "",
    email: "",
    password: "",
    re_password: "",
    role: "user",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Maneja los cambios en el formulario
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para obtener el token
  const getToken = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/csrf-token/");
    if (!response.ok) throw new Error("No se pudo obtener el token CSRF");
    const data = await response.json();
    console.log(data);
    return data;
  };

  // Función para obtener el rol del usuario
 

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Obtén el token y el rol antes de proceder
      //const [tokenData, roleData] = await Promise.all([getToken(), getRole()]);
      const tokenData =    await getToken()
      //const roleData = await getRole()

      //console.log("Token:", tokenData);
      //console.log("Role:", roleData);

      // Envía los datos del formulario
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": tokenData.token, // Usa el token obtenido
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error al crear el usuario");
      }

      setSuccess("Usuario creado con éxito");
      setFormData({ username: "", email: "", password: "", re_password:"",  role: "user" });
    } catch (err: any) {
      setError(err.message || "Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-form-container">
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="re_password">Confirmar Password:</label>
          <input
            type="re_password"
            id="re_password"
            name="re_password"
            value={formData.re_password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Rol:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Crear Usuario"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default User;
