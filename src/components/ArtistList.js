import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArtistByName, getSpotifyTrack } from '../services/api';

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
      <div className="artist-container">
        <img src={artist.imgUrl} alt={artist.name} className="artist-image" />
        <h1>{artist.name}</h1>
        <p className="artist-description">{artist.description}</p>
        
        {trackId ? (
          <div className="spotify-embed">
            <iframe
              title={`Música do ${artist.name}`}
              src={`https://open.spotify.com/embed/track/${trackId}`}
              width="300"
              height="380"
              frameBorder="0"
              allow="encrypted-media"
              loading="lazy"
            ></iframe>
          </div>
        ) : (
          <p>Nenhuma música encontrada no Spotify</p>
        )}
  
        <div className="show-info">
          <p>Data: {new Date(artist.startDate).toLocaleDateString()}</p>
          <p>Horário: {new Date(artist.startDate).toLocaleTimeString()} - {new Date(artist.endDate).toLocaleTimeString()}</p>
          <p>Local: {artist.location}</p>
        </div>
      </div>
    );
  };
  
export default ArtistList;