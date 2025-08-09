import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const handleClick = (tipo) => {
    if (tipo === 'estudiante') {
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      <img src="/logo-uagrm.png" alt="Logo UAGRM" className="logo" />

      <h1 className="titulo">Bienvenido al Perfil</h1>
      <h2 className="subtitulo">Elige tu tipo de cuenta</h2>

      <div className="tipos-container">
        {['estudiante', 'docente', 'admin'].map((tipo) => (
          <div
            key={tipo}
            className={`cuenta-card ${hovered === tipo ? 'hovered' : ''}`}
            onMouseEnter={() => setHovered(tipo)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(tipo)}
          >
            <img src={`/${tipo}.png`} alt={tipo} />
            {hovered === tipo && (
              <div className="label">{tipo.toUpperCase()}</div>
            )}
          </div>
        ))}
      </div>

      <div className="links">
        <a href="/">¿Olvidaste tu contraseña?</a>
        <br />
        <a href="/">
          Habilitación de servicios de cobros para personas externas
        </a>
      </div>
    </div>
  );
}

export default Home;
