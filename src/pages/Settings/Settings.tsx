import React, { useState, useEffect } from 'react';
import './Settings.scss';

interface Word {
  id: number;
  word: string;
  language: string;
}

const Settings: React.FC = () => {
  const [word, setWord] = useState<string>('');
  const [language, setLanguage] = useState<string>('en');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [words, setWords] = useState<Word[]>([]);
  const [editingWord, setEditingWord] = useState<Word | null>(null);

  const fetchWords = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/word/');
      const data = await response.json();
      setWords(data);
    } catch (err) {
      setError('Error al cargar las palabras');
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'word') {
      setWord(value);
    } else if (name === 'language') {
      setLanguage(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const data = { word, language };

    try {
      const response = await fetch(
        editingWord
          ? `http://127.0.0.1:8000/api/update-Word/${editingWord.id}/`
          : 'http://127.0.0.1:8000/api/register-word/',
        {
          method: editingWord ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setSuccess(editingWord ? 'Palabra actualizada con éxito' : 'Palabra guardada con éxito');
        setWord('');
        setLanguage('en');
        setEditingWord(null);
        fetchWords();
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

  const handleEdit = (word: Word) => {
    setEditingWord(word);
    setWord(word.word);
    setLanguage(word.language);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/delete-Word/${id}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccess('Palabra eliminada con éxito');
        fetchWords();
      } else {
        setError('Error al eliminar la palabra');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
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
            <option value="en">Inglés</option>
            <option value="es">Español</option>
            <option value="fr">Francés</option>
            <option value="de">Alemán</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : editingWord ? 'Actualizar Palabra' : 'Guardar Palabra'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <table>
        <thead>
          <tr>
            <th>Palabra</th>
            <th>Idioma</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word) => (
            <tr key={word.id}>
              <td>{word.word}</td>
              <td>{word.language}</td>
              <td>
                <button onClick={() => handleEdit(word)}>Editar</button>
                <button onClick={() => handleDelete(word.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Settings;
