import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css"

function Navigation() {
    return (
      <nav className={styles.nav}>
        <NavLink to="/" style={{ margin: '0 1rem' }} activeStyle={{ fontWeight: 'bold' }}>
          Home
        </NavLink>
        <NavLink to="/about" style={{ margin: '0 1rem' }} activeStyle={{ fontWeight: 'bold' }}>
          Sobre
        </NavLink>
        <NavLink to="/map" style={{ margin: '0 1rem' }} activeStyle={{ fontWeight: 'bold' }}>
        Map
      </NavLink>
      </nav>
    );
  }

export default Navigation;