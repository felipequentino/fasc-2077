import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArtistByName, getSpotifyTrack } from '../services/api';
import styles from "./ArtistList.module.css"

const ArtistList = () => {
    const [artist, setArtist] = useState(null);
    const [trackId, setTrackId] = useState(null);
    const [loading, setLoading] = useState(true);
    const { artistName } = useParams();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Busca dados do artista
          const artistData = await getArtistByName(artistName);
          if (!artistData) {
            setLoading(false);
            return;
          }
          setArtist(artistData);
  
          // Busca track do Spotify
          const track = await getSpotifyTrack(artistName);
          setTrackId(track);
          
        } catch (error) {
          console.error("Erro:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [artistName]);
  
    if (loading) return <div>Carregando...</div>;
    if (!artist) return <div>Artista não encontrado</div>;
  
    return (
      <div className={styles.artist_container}>
        <img src={artist.imgUrl} alt={artist.name} className={styles.artist_img}/>
        

        <div className={styles.artist_details}>
            
            <div className={styles.show_info}>
                <h1>{artist.name}</h1>
                <p className={styles.artist_descripition}>{artist.description}</p>
                <p>{new Date(artist.startDate).toLocaleDateString()} | {new Date(artist.startDate).toLocaleTimeString()} - {new Date(artist.endDate).toLocaleTimeString()}</p>
                <p>Local: {artist.location}</p>

                <p>Confira o maior Hit do artista:</p>
            {trackId ? (
              <div className={styles.spotify_embed}>
                <iframe
                  title={`Música do ${artist.name}`}
                  src={`https://open.spotify.com/embed/track/${trackId}`}
                  frameBorder="0"
                  allow="encrypted-media"
                  loading="lazy"
                ></iframe>
              </div>
            ) : (
              <p>Nenhuma música encontrada no Spotify</p>
            )}
            </div>
        </div>
      </div>
    );
  };
  
export default ArtistList;