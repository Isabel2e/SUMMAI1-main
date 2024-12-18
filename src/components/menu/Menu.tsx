

import { useState } from "react";
import { Link } from "react-router-dom";
import "./Menu.scss";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para abrir/cerrar menú // Estado para almacenar el rol
 

  const role = localStorage.getItem("role")

  /*
  // Función para obtener el rol del usuario
  const getRole = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/me/");
      if (!response.ok) throw new Error("No se pudo obtener el rol del usuario");
      const data = await response.json();
      setRole(data.role); // Asumimos que el API devuelve un campo 'role'
    } catch (error) {
      console.error("Error al obtener el rol:", error);
    } finally {
      setLoading(false); // Finalizamos el estado de carga
    }
  };

  // Ejecutamos la obtención del rol al montar el componente
  useEffect(() => {
    getRole();
  }, []);
*/

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`menu ${isOpen ? "open" : ""}`}>
      {/* Botón de menú para pantallas pequeñas */}
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰ {/* Ícono de menú hamburguesa */}
      </button>

      {/* Elementos del menú */}
      <div className="item">
        <Link to="/home" className="listItem">
          <img src="/home.svg" alt="Home" />
          <span className="listItemTitle">Homepage</span>
        </Link>
        {role === "admin" && (
          <Link to="/user" className="listItem">
            <img src="/profile.svg" alt="Profile" />
            <span className="listItemTitle">Crear usuario</span>
          </Link>
        )}

        <Link to="/settings" className="listItem">
          <img src="/settings.svg" alt="Settings" />
          <span className="listItemTitle">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
