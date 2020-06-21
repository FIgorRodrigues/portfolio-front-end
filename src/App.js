import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);
  const url = 'repositories';

  useEffect(() => {
    api.get(url).then(({ data }) =>
      setRepositories([...repositories, ...data]));
  }, []);

  async function handleAddRepository() {
    const date = Date.now();
    const { data } = await api.post(url, {
      "title": `Projeto ${date}`, 
      "url": "https://github.com/FIgorRodrigues/portfolio", 
      "techs": ["Node.js", "React", "React Native"]
    });
    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`${ url }/${ id }`);
    const indexRepository = repositories.findIndex(repository => repository.id == id);
    repositories.splice(indexRepository, 1);
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { 
          repositories.map(repository => 
            <li key={repository.id}> 
              { repository.title }
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
