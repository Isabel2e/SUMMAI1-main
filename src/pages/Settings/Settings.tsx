import React, { useState } from 'react';
import './Settings.scss'; // Importa el archivo SCSS



const Settings: React.FC = () => {
  const [word, setWord] = useState<string>('');
  const [language, setLanguage] = useState<string>('en'); // Idioma por defecto
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'word') {
      setWord(value);
    } else if (name === 'language') {
      setLanguage(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log()
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const data = { 'word': word, 'language': language };
    console.log(data)

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register-word/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess('Palabra guardada con éxito');
        setWord('');
        setLanguage('en'); // Reset language to default
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Error al guardar la palabra');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-container">
      <h2>Configuración de Palabras</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="word">Palabra:</label>
          <input
            type="text"
            id="word"
            name="word"
            value={word}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="language">Idioma:</label>
          <select
            id="language"
            name="language"
            value={language}
            onChange={handleInputChange}
            required
          >
            <option value="Inglis">Inglés</option>
            <option value="Spanish">Español</option>
            <option value="French">Francés</option>
            <option value="German">Alemán</option>
            {/* Agrega más idiomas si es necesario */}
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Guardar Palabra'}
        </button>
        </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default Settings;