// Componente responsavel por fazer uma chamada a API e listar os artistas
// Cada show é exibido em um card com a imagem do artista, nome e um botão para ver detalhes


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getShows } from '../services/api';
import { getArtistByName } from '../services/api';
import { useParams } from 'react-router-dom';
import styles from "./Artists.module.css"

const Artists = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState(null);
  const { artistName } = useParams();

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const data = await getShows();
        setShows(data);
        
        const artistData = await getArtistByName(artistName);
        if (!artistData) {
          setLoading(false);
          return;
        }
        setArtist(artistData);

      } catch (error) {
        console.error("Erro ao buscar shows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [artistName]);

  if (loading) return <div>Carregando artistas...</div>;

  return (
    <div className={styles.artist_grid}>
      {shows.map((show) => (
        <div key={show.name} className={styles.artist_card}>
          <img src={show.imgUrl} alt={show.name} className={styles.artist_thumbnail} />
          <h2>{show.name}</h2>
          <p className={styles.artist_description}>{show.description}</p>
          <p><img src='images/time.png' alt='date'/> {new Date(show.startDate).toLocaleDateString()} | {new Date(show.startDate).toLocaleTimeString()} - {new Date(show.endDate).toLocaleTimeString()}</p>
          <p><img src='images/local.png' alt='local'/>{show.location}</p>
          <Link to={`/artists/${encodeURIComponent(show.name)}`} className={styles.cta_button}>
            Ver Detalhes
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Artists;