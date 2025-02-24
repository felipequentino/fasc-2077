import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css"

function Navigation() {
    return (
      <nav className={styles.navigation}>
        <NavLink to="/" style={{ margin: '0 1rem' }} activeStyle={{ fontWeight: 'bold' }}>
          Home
        </NavLink>
        <NavLink to="/about" style={{ margin: '0 1rem' }} activeStyle={{ fontWeight: 'bold' }}>
          Sobre
        </NavLink>
        <NavLink to="/map" style={{ margin: '0 1rem' }} activeStyle={{ fontWeight: 'bold' }}>
        Map
      </NavLink>
        <NavLink to="/artists" style={{ margin: '0 1rem' }} activeStyle={{ fontWeight: 'bold' }}>
          Artistas
        </NavLink>
        <NavLink to="/palcos" style={{ margin: '0 1rem' }} activeStyle={{ fontWeight: 'bold' }}>
          Palcos
        </NavLink>
      </nav>
    );
  }

export default Navigation;