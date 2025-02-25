import React from "react"
import styles from '../pages/Home.module.css'

function HomeFooter() {
    return (
        <div className={styles.home_footer}>

            <img className={styles.home_footer_img} src='images/footer.png' alt=''/> 
            <img className={styles.home_footer_partnaires} src='images/partnairs.png' alt=''/>
      
        </div>
    )
}

export default HomeFooter