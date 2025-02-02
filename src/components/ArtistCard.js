import styles from "./ArtistCard.module.css"

function ArtistCard({image, name , date , stage , time  , description}) {
    return(
    
            <div className={styles.cardContainer}>
                <div className={styles.artistPic}>
                    <img src={image} alt="Pic"/>
                </div>

                <div className={styles.artistInfo}>
                    <h1>{name}</h1>
                    <p className={styles.description}>{description}</p>
                    <p className={styles.stage}>
                        <img src="images/localizacao.png" alt="stage"/>
                        {stage}
                    </p>
                    <p className={styles.time}> 
                        <img src="images/time.png" alt="time"/> 
                        {date} - {time}
                    </p>
                </div>
            </div>
        
    )
}

export default ArtistCard