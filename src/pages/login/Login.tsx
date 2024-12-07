 // src/components/LoginForm.tsx
 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.scss"
import { IoPersonCircle } from "react-icons/io5";

// Definimos el tipo para el estado del formulario
interface LoginFormState {
  username: string;
  password: string;
}

// Definimos el tipo de respuesta esperada de la API
interface ApiResponse {
  username?: string;
  message?: string;
  detail?: string;
}

//REVISAR
const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormState>({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  //const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const navigate = useNavigate();

  const getRole = async (username: string) => {
    const response = await fetch(`http://127.0.0.1:8000/api/user/${username}/`);
    if (!response.ok) throw new Error("No se pudo obtener el rol del usuario");
    const data = await response.json();
    console.log(data)
    return data;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    //setApiResponse(null);


    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await response.json();
      console.log(data.username);

      if (response.ok) {
        setSuccess(`Inicio de sesión exitoso, bienvenido ${data.username}!`);
        const role = await getRole(formData.username);
        console.log(role);
        localStorage.setItem("role", role.role)

        navigate('/Home');
      } else {
        setError(data.detail || 'Error en el inicio de sesión');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <div className="icon-container">
       <IoPersonCircle className="iconuser" />
      </div>
      <h2>Bienvenido</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Ingresar usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Ingresar contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default LoginForm;