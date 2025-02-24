// Configurações do Spotify
// obs: o correto seria eu colocar essas minhas informações em um .env, mas como é um projeto pequeno, 
// deixei aqui mesmo para facilitar o uso de todos os devs

const SPOTIFY_CLIENT_ID = 'c5ec5d817a504d2e840a1a7e16194b51';
const SPOTIFY_CLIENT_SECRET = '1258688ae11444749cd1e256770108fd';

let spotifyAccessToken = null;

// Token de acesso do Spotify
const getSpotifyToken = async () => {
  if (spotifyAccessToken) return spotifyAccessToken;

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  spotifyAccessToken = data.access_token;
  return spotifyAccessToken;
};

// Busca a track mais popular do artista
export const getSpotifyTrack = async (artistName) => {
  try {
    const token = await getSpotifyToken();
    
    // Primeiro busca o artista
    const searchResponse = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const searchData = await searchResponse.json();
    const artistId = searchData.artists?.items[0]?.id;

    if (!artistId) return null;

    // Busca as top tracks do artista
    const tracksResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=BR`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const tracksData = await tracksResponse.json();
    return tracksData.tracks?.[0]?.id || null;

  } catch (error) {
    console.error('Erro ao buscar no Spotify:', error);
    return null;
  }
};

export const getShows = async () => {
  const response = await fetch('https://fasc2025.onrender.com/shows');
  return response.json();
};

export const getStages = async () => {
  const response = await fetch('https://fasc2025.onrender.com/palcos');
  return response.json();
};

export const getArtistByName = async (name) => {
  const shows = await getShows();
  return shows.find(show => show.name === name);
};