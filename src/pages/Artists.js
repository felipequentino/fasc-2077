// Componente responsavel por fazer uma chamada a API e listar os artistas
// Cada show é exibido em um card com a imagem do artista, nome e um botão para ver detalhes


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getShows } from '../services/api';

const Artists = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const data = await getShows();
        setShows(data);
      } catch (error) {
        console.error("Erro ao buscar shows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  if (loading) return <div>Carregando artistas...</div>;

  return (
    <div className="artists-grid">
      {shows.map((show) => (
        <div key={show.name} className="artist-card">
          <img src={show.imgUrl} alt={show.name} className="artist-thumbnail" />
          <h2>{show.name}</h2>
          <Link to={`/artists/${encodeURIComponent(show.name)}`} className="cta-button">
            Ver Detalhes
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Artists;