import React from 'react';
import styles from "./About.module.css"

function About() {
  return (
    <div className={styles.about}>

      <div className={styles.fact1}>
        <video autoPlay muted loop className={styles.video}>
          <source src="images/video1.mp4" type='video/mp4'/>
        </video>

        <div  className={styles.videoContent}>
          <h2>O Inicio</h2>
          <p>sdaiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiih</p>
        </div>
        
      </div>

      <div className={styles.fact2}>

        <video autoPlay muted loop className={styles.video}>
          <source src="images/video2.mp4" type='video/mp4'/>
        </video>

        <div className={styles.videoContent}>
          <h2>A Cultura</h2>
          <p>saudiahsdoasdojasdjasdihasiidaosjdodffdhdfhsfduseyrsuhdfshdfiishfdihishdfihsdfihsfidhsidfhsifdhishdfksdfishhdfihsfdkskdfs</p>
        </div>
      </div>

      <div className={styles.fact2}>

        <video autoPlay muted loop className={styles.video}>
          <source src="images/video2.mp4" type='video/mp4'/>
        </video>

        <div className={styles.videoContent}>
          <h2>A Cultura</h2>
          <p>saudiahsdoasdojasdjasdihasiidaosjdodffdhdfhsfduseyrsuhdfshdfiishfdihishdfihsdfihsfidhsidfhsifdhishdfksdfishhdfihsfdkskdfs</p>
        </div>
      </div>

      <div className={styles.fact2}>

        <video autoPlay muted loop className={styles.video}>
          <source src="images/video2.mp4" type='video/mp4'/>
        </video>

        <div className={styles.videoContent}>
          <h2>A Cultura</h2>
          <p>saudiahsdoasdojasdjasdihasiidaosjdodffdhdfhsfduseyrsuhdfshdfiishfdihishdfihsdfihsfidhsidfhsifdhishdfksdfishhdfihsfdkskdfs</p>
        </div>
      </div>

      
    </div>
  );
}

export default About;