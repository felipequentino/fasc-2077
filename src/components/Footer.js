import React from 'react';
import styles from "./Footer.module.css"

function Footer() {
  return (
    <footer style={{ padding: '1rem', background: '#282c34', color: 'white', marginTop: 'auto'}}>
      <p>&copy; 2077 Fasc. Todos os direitos reservados.</p>
      <div className={styles.icons}>
        <a href='https://www.bing.com/ck/a?!&&p=1e66a2e4d78e300b47ebf7cda01f030e500fcb4ba1585e69a08d3f1acfa680c3JmltdHM9MTczODM2ODAwMA&ptn=3&ver=2&hsh=4&fclid=1aed0a5e-c2f1-6112-21e7-1e9bc388603c&psq=fasc+instagram&u=a1aHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9mZXN0aXZhbGRlYXJ0ZXNkZXNhb2NyaXN0b3Zhby8&ntb=1'><img src='images/instagram (1).png' alt='instagram'></img></a>
        <a><img src='images/facebook.png' alt='facebook'></img></a>
        <a href='https://www.bing.com/ck/a?!&&p=a629727ebec5b5ae13a24c39fdbf28fec3c6326e1cfddab049fc9128b129e6f6JmltdHM9MTczODM2ODAwMA&ptn=3&ver=2&hsh=4&fclid=1aed0a5e-c2f1-6112-21e7-1e9bc388603c&psq=fasc+tiktok&u=a1aHR0cHM6Ly93d3cudGlrdG9rLmNvbS9AZmFzYy5zZQ&ntb=1'><img src='images/tiktok.png' alt='tiktok'></img></a>
        <a><img src='images/twitter.png' alt='twitter'></img></a>
           
      </div>
      
    </footer>
  );
}

export default Footer;