import React from 'react';
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css"

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header_left_side}>
          <img src='images/fasc.png' alt=''/>
          <div className={styles.left_side_subtitle}>
            <p>31,1 e 2 de Dezembro - 2077</p>
            <p>São Cristóvão, Sergipe</p>
          </div>
      </div>

      <div className={styles.header_right_side}>
          <NavLink to="/map" style={{ margin: '0 1rem' }} activeStyle={{ fontWeight: 'bold' }}>
            MAP
          </NavLink>

          <NavLink to="/artists" style={{ margin: '0 1rem' }} activeStyle={{ fontWeight: 'bold' }}>
            ARTISTAS
          </NavLink>
          
          <NavLink to="/" style={{ margin: '0 1rem' }} activeStyle={{ fontWeight: 'bold' }}>
            HOME
          </NavLink>
      </div>
      
    </header>
  );
}

export default Header;