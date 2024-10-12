import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Capacitación CRUD</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/estados">Listar Estados</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/agregar-estado">Agregar Estado</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ciudades">Listar Ciudades</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/agregar-ciudad">Agregar Ciudad</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
