import React from 'react';
import styles from './Home.module.css'
import Navigation from '../components/Navigation'

function Home() {
  return (
    <div>
      <section className={styles.home_header}>
          <img className={styles.home_header_wallpaper} src='images/wallpaper.png' alt='wallpaper'/>

          <img className={styles.home_header_title} src='images/many-shows.png' alt=''/>

          <div className={styles.home_header_artists}>
            <div className={styles.carroussel}>
              <img src='images/Charli-XCX.png' alt='charlixcx'/>
              <img src='images/Taylor-Swift.png' alt='taylorswift'/>
              <img src='images/linkin-park.png' alt='linkinpark'/>
              <img src='images/Pablo-Vittar.png' alt='pablovittar'/>
              <img src='images/Jao.png' alt='jao'/>
              <img src='images/Calcinha-Preta.png' alt='calcinhapreta'/>
              <img src='images/much-more.png' alt='muitomais'/>
            </div> 
          </div>
      </section>

      <section className={styles.home_stages}>

          <img className={styles.home_stages_top_img} src='images/fasc-symbols.png' alt='fasc-symbols'/>
          <h1>NOSSOS PALCOS</h1>

          <div  className={styles.stages}>
            <div className={styles.musica_na_igreja}>
                <h2>MUSICA NA IGREJA</h2>
                <img className={styles.stages_title} src='images/igreja.png' alt=''/>
                <p>
                  A Igreja de Nossa Senhora do Rosário dos Homens Pretos foi construída em 1746 pela irmandade de negros da cidade. Irmandades...
                </p>
                <button>
                <a href='/palcos'>SAIBA MAIS</a>
                </button>
            </div>

            <div className={styles.samba_na_bica}>
                <h2>SAMBA NA BICA</h2>
                <img className={styles.stages_title} src='images/sambanabica.png' alt=''/>
                <p>
                  Popularmente conhecida como Bica dos Pintos, esse espaço natural é uma grande referência em São Cristóvão quando o assunto é turismo...
                </p>
                <button>
                <a href='/palcos'>SAIBA MAIS</a>
                </button>
            </div>

            <div className={styles.joao_bebe_agua}>
                <h2>JOÃO BEBE ÁGUA</h2>
                <img className={styles.stages_title} src='images/Joaobbagua.png' alt=''/>
                <p>
                  Palco em homenagem a João Bebe-Água, que foi presidente da Câmara dos Vereadores de São Cristóvão e líder de uma Irmandade de Amparo dos...
                </p>
                <button>
                <a href='/palcos'>SAIBA MAIS</a>
                </button>
            </div>

            <div className={styles.frei_santa_cecilia}>
                <h2>FREI SANTA CECÍLIA</h2>
                <img className={styles.stages_title} src='images/freisantacecilia.png' alt=''/>
                <p>
                  Descrito poeticamente pelo historiador Manoel dos Passos de Oliveira Telles, na sua primeira edição de 1903, em termos como: “Sua estatura...
                </p>
                <button>
                <a href='/palcos'>SAIBA MAIS</a>
                </button>
            </div>
          </div>
          
      </section>

      <div className={styles.home_footer}>

        <img className={styles.home_footer_img} src='images/footer.png' alt=''/> 
        <img className={styles.home_footer_partnaires} src='images/partnairs.png' alt=''/>
      
      </div>
    </div>
  );
}

export default Home;