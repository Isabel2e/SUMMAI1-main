import React, { useState, useEffect } from "react";
import "./Settings.scss";
import KeywordTable from "../../components/KeywordTable/Tableword";

interface Word {
  id: number;
  word: string;
  language: string;
  is_active: boolean;
}

const Settings: React.FC = () => {
  const [word, setWord] = useState<string>("");
  const [language, setLanguage] = useState<string>("en");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [words, setWords] = useState<Word[]>([]);
  const [editingWord, setEditingWord] = useState<Word | null>(null);

  const fetchWords = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/word/");
      const data = await response.json();
      setWords(data);
    } catch (err) {
      setError("Error al cargar las palabras");
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "word") {
      setWord(value);
    } else if (name === "language") {
      setLanguage(value);
    }
  };

  /*const handleSubmit = async (e: React.FormEvent) => {
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
        setLanguage('');
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

*/
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const data = { word, language };

    try {
      const response = await fetch(
        editingWord
          ? `http://127.0.0.1:8000/api/update-Word/${editingWord.id}/`
          : "http://127.0.0.1:8000/api/register-word/",
        {
          method: editingWord ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const newWord = {
          id: editingWord ? editingWord.id : Date.now(),
          word,
          language,
          is_active: editingWord ? editingWord.is_active : true,
        };

        setSuccess(
          editingWord
            ? "Palabra actualizada con éxito"
            : "Palabra guardada con éxito"
        );
        setWords(
          (prevWords) =>
            editingWord
              ? prevWords.map((w) => (w.id === editingWord.id ? newWord : w)) // Actualiza la palabra
              : [...prevWords, newWord] // Agrega una nueva palabra
        );
        setWord("");
        setLanguage("");
        setEditingWord(null);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Error al guardar la palabra");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="settings-container">
        <h2>Configure Keyword</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="word">Keyword:</label>
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
            <label htmlFor="language">Lenguage:</label>
            <select
              id="language"
              name="language"
              value={language}
              onChange={handleInputChange}
              required
            >
              
              <option value="">Select Lenguage</option>
              <option value="Ingles">Inglés</option>
              <option value="Español">Español</option>
              <option value="Frances">Francés</option>
              <option value="Alemán">Alemán</option>
            </select>
          </div>
          <button type="submit" disabled={loading}>
            {loading
              ? "Cargando..."
              : editingWord
              ? "Update Keyword"
              : "Save Keyword"}
          </button>
        </form>
        
        {error && <p className="errores">{error}</p>}
        {success && <p className="successe" >{success}</p>}
      </div>

      <div className="table-container">
        <KeywordTable words={words} setWords={setWords}  onEdit={(word) => {
        setEditingWord(word);
        setWord(word.word);
        setLanguage(word.language);
       }}/>
      </div>
    </div>
  );
};

export default Settings;
