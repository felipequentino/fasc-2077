import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
    return (
      <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
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
      </nav>
    );
  }

export default Navigation;