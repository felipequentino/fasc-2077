import React from 'react';
import styles from './Home.module.css'
import Navigation from '../components/Navigation'

function Home() {
  return (
    <div>
      <div className={styles.home_header}>
          <img src='https://www.saocristovao.se.gov.br/img/timbrados-SC-2025-450x85-prefSC-02.png'  alt=''/>

          <Navigation/>
      </div>

      <div className={styles.home_stages}>

          <h1>Nossos <span>Palcos</span></h1>

          <div  className={styles.stages}>
            <div className={styles.musica_na_igreja}>
                <p>Musica na Igreja</p>
                <img src='https://portalbrasil.com.br/wp-content/uploads/2018/08/Festival-de-Artes-de-Sao-Cristovao-768x577.jpg' alt='musica_na_igreja'/>
            </div>

            <div className={styles.samba_na_bica}>
                <p>Samba na Bica</p>
                <img src='https://i1.wp.com/avozdacidade.com/wp/wp-content/uploads/2019/06/A-15-CF-TEM%C3%81TICA-Samba-da-Jurema-acontece-no-pr%C3%B3ximo-domingo.jpg?fit=640%2C427&ssl=1' alt='samba_na_bica'/>
            </div>

            <div className={styles.joao_bebe_agua}>
                <p>João Bebe Água</p>
                <img src='https://publicacao.saocristovao.se.gov.br/laravel-filemanager/photos/17/VictorBalde_Fasc2023_Dia3_Groundation-Selecao-18.jpg' alt='joao_bebe_agua'/>
            </div>

            <div className={styles.frei_santa_cecilia}>
                <p>Frei Santa Cecília</p>
                <img src='https://publicacao.saocristovao.se.gov.br/storage/post/fasc-encerra-neste-domingo-com-grandes-atracoes-nacionais-e-internacionais-confira-a-programacao-completa-2024-12-01-674c913b70d43.jpeg' alt='frei_santa_cecilia'/>
            </div>
          </div>
          
      </div>

      <div className={styles.home_artists}>
          <h1>O QUE VAI TOCAR</h1>

          <div>
              
          </div>

          <h2>E MUITO MAIS...</h2>
      </div>
    </div>
  );
}

export default Home;