import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getShows } from '../services/api';

function Map() {
  // Coordenadas dos palcos
  const stages = {
    "Palco João Bebe Água": [-11.013701851717906, -37.20535000517793],
    "Palco Samba na Bica": [-11.016444, -37.207999],
    "Palco Frei Santa Cecília": [-11.016167, -37.203444],
    "Música na Igreja": [-11.015391759386777, -37.20573580919405]
  };
  const [shows, setShows] = useState([]);
  
  // Cria a hora simulada: fixando a data no dia 15/01/2025, por ser a data dos shows
  const [simulatedTime, setSimulatedTime] = useState(() => {
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0]; // "HH:MM:SS"
    return new Date(`2025-01-15T${timeString}`);
  });
  
  // Guarda o horário real de início para calcular o tempo decorrido
  const actualStartTimeRef = useRef(Date.now());
  const simulationBaseRef = useRef(simulatedTime);

  // Atualiza a hora simulada a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - actualStartTimeRef.current;
      const newSimulatedTime = new Date(simulationBaseRef.current.getTime() + elapsed);
      setSimulatedTime(newSimulatedTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Busca os shows 
  useEffect(() => {
    async function fetchShows() {
      try {
        const data = await getShows();
        setShows(data);
      } catch (error) {
        console.error("Erro ao buscar os shows:", error);
      }
    }
    fetchShows();
  }, []);
  
  // Use simulatedTime como o tempo atual da aplicação
  const currentTime = simulatedTime;
  
  // Retorna os próximos shows de cada palco
  // Se o show estiver ocorrendo agora, retorna-o com status "AO VIVO"
  // Senão, retorna o próximo show com status "SHOW MAIS TARDE"
  const getRelevantShow = (stageName) => {
    const stageShows = shows.filter(show => show.location === stageName);
    let currentShow = stageShows.find(show =>
      new Date(show.startDate).getTime() <= currentTime.getTime() &&
      new Date(show.endDate).getTime() > currentTime.getTime()
    );
    if (currentShow) return { ...currentShow, status: 'AO VIVO' };
    
    const upcomingShows = stageShows.filter(show => new Date(show.startDate).getTime() > currentTime.getTime());
    if (upcomingShows.length > 0) {
      upcomingShows.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      return { ...upcomingShows[0], status: 'SHOW MAIS TARDE!' };
    }
    return null;
  };
  
  // Cria os marcadores para cada palco
  const stageMarkers = Object.entries(stages).map(([stageName, coordinates]) => {
    const relevantShow = getRelevantShow(stageName);
    let markerState = 'default';
    
    if (relevantShow) {
      const showStart = new Date(relevantShow.startDate);
      const showEnd = new Date(relevantShow.endDate);
      if (showStart <= currentTime && showEnd > currentTime) {
        markerState = 'active';
      } else {
        markerState = 'upcoming';
      }
    }
    
    const imageUrl = relevantShow
      ? relevantShow.imgUrl
      : `/palcos/${stageName.replace(/\s+/g, '_')}.jpg`;
    
    // Ícone custom
    const customIcon = L.divIcon({
      className: '',
      html: `<div style="width: 50px; height: 50px; background-image: url('${imageUrl}'); background-size: cover; background-position: center; border-radius: 50%; border: 3px solid ${markerState === 'active' ? '#28a745' : markerState === 'upcoming' ? '#007bff' : '#6c757d'}; ${markerState === 'active' ? 'animation: pulse 2s infinite;' : ''} ${markerState === 'upcoming' ? 'animation: loadingPulse 2s infinite;' : ''}"></div>`,
      iconSize: [100, 100],
      iconAnchor: [25, 50],
      popupAnchor: [0, -50]
    });
    
    return (
      <Marker key={stageName} position={coordinates} icon={customIcon}>
        <Popup>
          <div style={{ textAlign: 'center' }}>
            <h3>{stageName}</h3>
            {relevantShow ? (
              <>
                <p><strong>{relevantShow.status}</strong></p>
                <p>{relevantShow.name}</p>
                <p>
                  {new Date(relevantShow.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                  {new Date(relevantShow.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <img
                  src={relevantShow.imgUrl}
                  alt={relevantShow.name}
                  style={{ width: '150px', height: '150px', borderRadius: '8px' }}
                />
              </>
            ) : (
              <>
                <p>Sem show agendado</p>
                <img
                  src={`/palcos/${stageName.replace(/\s+/g, '_')}.jpg`}
                  alt={stageName}
                  style={{ width: '150px', height: '150px', borderRadius: '8px' }}
                />
              </>
            )}
          </div>
        </Popup>
      </Marker>
    );
  });
  
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          @keyframes loadingPulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
          }
        `}
      </style>
      <MapContainer center={stages["Música na Igreja"]} zoom={20} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {stageMarkers}
      </MapContainer>
    </div>
  );
}

export default Map;
