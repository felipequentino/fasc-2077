import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getShows } from '../services/api';
import styles from './Map.module.css';

function Map() {
  // Coordenadas dos palcos
  const stages = {
    "Palco João Bebe Água": [-11.013701851717906, -37.20535000517793],
    "Palco Samba na Bica": [-11.016444, -37.207999],
    "Palco Frei Santa Cecília": [-11.016167, -37.203444],
    "Música na Igreja": [-11.015391759386777, -37.20573580919405]
  };

  const [shows, setShows] = useState([]);
  
  // Cria a hora simulada: fixando a data no dia 15/01/2025 (para cálculo do tempo decorrido)
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
  
  // Tempo atual simulado
  const currentTime = simulatedTime;

  // Gera um array de datas (no formato ISO) do intervalo desejado
  const generateDateRange = (start, end) => {
    const dates = [];
    let current = new Date(start);
    const endDate = new Date(end);
    while (current <= endDate) {
      dates.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  // Define o intervalo desejado
  const availableDates = generateDateRange("2025-01-16", "2025-02-07");
  const [selectedDate, setSelectedDate] = useState(availableDates[0]);

  // Filtra os shows que acontecem no dia selecionado
  const getShowsForDate = (dateStr) => {
    return shows.filter(show => {
      const showDate = new Date(show.startDate).toISOString().split('T')[0];
      return showDate === dateStr;
    });
  };

  // Shows para o dia selecionado
  const scheduledShows = getShowsForDate(selectedDate);

  // Retorna os próximos shows de cada palco (para os marcadores no mapa)
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

  // TimelineEntry: cada item da programação. Todo o card é um Link para /artists/{nome_do_artista}
  const TimelineEntry = ({ show, isActive }) => {
    const start = new Date(show.startDate);
    const end = new Date(show.endDate);
    
    return (
      <Link 
        to={`/artists/${encodeURIComponent(show.name)}`} 
        className={styles.timelineLink}
      >
        <div className={`${styles.timelineCard} ${isActive ? styles.activeShow : ''}`}>
          <div className={styles.timeBadge}>
            {start.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} -{' '}
            {end.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <h4>{show.name}</h4>
          <div 
            className={styles.stageTag} 
            style={{ backgroundColor: getStageColor(show.location) }}
          >
            {show.location}
          </div>
          {isActive && <div className={styles.liveBadge}>AO VIVO</div>}
        </div>
      </Link>
    );
  };

  const getStageColor = (stageName) => {
    const colors = {
      "Palco João Bebe Água": "#FF7200",
      "Palco Samba na Bica": "#F5E901",
      "Palco Frei Santa Cecília": "#00FFFF",
      "Música na Igreja": "#96FF01"
    };
    return colors[stageName] || '#cccccc';
  };

  // Cria os marcadores para cada palco
  const stageMarkers = Object.entries(stages).map(([stageName, coordinates]) => {
    const relevantShow = getRelevantShow(stageName);
    let markerState = 'default';
    
    if (relevantShow) {
      const showStart = new Date(relevantShow.startDate);
      const showEnd = new Date(relevantShow.endDate);
      markerState = showStart <= currentTime && showEnd > currentTime ? 'active' : 'upcoming';
    }
    
    const imageUrl = relevantShow
      ? relevantShow.imgUrl
      : `/palcos/${stageName.replace(/\s+/g, '_')}.jpg`;
    
    // Ícone customizado
    const customIcon = L.divIcon({
      className: '',
      html: `<div style="width: 50px; height: 50px; background-image: url('${imageUrl}'); background-size: cover; background-position: center; border-radius: 50%; border: 3px solid ${
        markerState === 'active' ? '#28a745' : markerState === 'upcoming' ? '#007bff' : '#6c757d'
      }; ${markerState === 'active' ? 'animation: pulse 2s infinite;' : ''} ${markerState === 'upcoming' ? 'animation: loadingPulse 2s infinite;' : ''}"></div>`,
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
    <div className={styles.mapContainer}>
      <div className={styles.layoutContainer}>
        <div className={styles.mapSection}>
          <div className={styles.mapWrapper}>
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
            <MapContainer 
              center={stages["Música na Igreja"]} 
              zoom={17} 
              className={styles.leafletContainer}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {stageMarkers}
            </MapContainer>
          </div>
        </div>
  
        {/* Seção de Programação */}
        <div className={styles.timelineSection}>
          <div className={styles.timelineHeader}>
            <h2>Programação</h2>
          </div>
  
          <div className={styles.timelineContent}>
            <div className={styles.daySchedule}>
              <h3>
                Programação para {new Date(selectedDate).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </h3>
              {scheduledShows.length > 0 ? (
                scheduledShows.map(show => (
                  <TimelineEntry 
                    key={show.id} 
                    show={show}
                    isActive={new Date(show.startDate) <= currentTime && new Date(show.endDate) > currentTime}
                  />
                ))
              ) : (
                <p>Nenhum show programado para este dia</p>
              )}
            </div>
          </div>
  
          {/* Seletor de Dias */}
          <div className={styles.daySelector}>
            {availableDates.map(dateStr => (
              <button
                key={dateStr}
                className={`${styles.calendarDay} ${selectedDate === dateStr ? styles.activeDay : ""}`}
                onClick={() => setSelectedDate(dateStr)}
              >
                {new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
              </button>
            ))}
          </div>
        </div>
      </div>
  
      <div className={styles.mapFooter}>
        <p className={styles.highlightText}>Explore os palcos e acompanhe os shows de HOJE!</p>
        <small>Horários simulados para demonstração</small>
      </div>
    </div>
  );
}  

export default Map;
