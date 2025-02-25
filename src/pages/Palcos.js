import React, { useState, useEffect } from 'react';
import styles from './Palcos.module.css';
import Navigation from '../components/Navigation';
import { getStages } from '../services/api';

const Palcos = () => {
  const [stagesData, setStagesData] = useState([]);

  useEffect(() => {
    async function fetchStages() {
      try {
        const apiStages = await getStages();
        const stageMapping = {
          "Palco João Bebe Água": {
            image: "images/Joaobbagua.png",
            color: "#FF7200"
          },
          "Palco Frei Santa Cecília": {
            image: "images/freisantacecilia.png",
            color: "#00FFFF"
          },
          "Palco Samba na Bica": {
            image: "images/sambanabica.png",
            color: "#F5E901"
          },
          "Música na Igreja": {
            image: "images/igreja.png",
            color: "#96FF01"
          }
        };

        const mappedStages = apiStages.map(stage => ({
          title: stage.name,
          image: stageMapping[stage.name]?.image || "images/default.png",
          description: stage.history, 
          color: stageMapping[stage.name]?.color || "#000000"
        }));

        setStagesData(mappedStages);
      } catch (error) {
        console.error("Erro ao buscar os palcos:", error);
      }
    }
    fetchStages();
  }, []);

  return (
    <div className={styles.stagesContainer}>
      <section className={styles.stagesHeader}>
        <h1>NOSSOS PALCOS</h1>
      </section>

      <div className={styles.stagesGrid}>
        {stagesData.map((stage, index) => (
          <div 
            key={index}
            className={styles.stageCard}
            style={{ borderColor: stage.color }}
          >
            <div 
              className={styles.cardHeader}
              style={{ backgroundColor: stage.color }}
            >
              <h2>{stage.title}</h2>
            </div>
            
            <img
              src={stage.image}
              alt={stage.title}
              className={styles.stageImage}
            />
            
            <p className={styles.stageDescription}>
              {stage.description}
            </p>
            

          </div>
        ))}
      </div>
    </div>
  );
};

export default Palcos;
