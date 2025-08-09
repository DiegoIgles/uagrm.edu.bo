import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [registro, setRegistro] = useState('');
  const [ci, setCi] = useState('');
  const [error, setError] = useState('');
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate(); // ⬅️ necesario para redireccionar

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://uagrm.bo.cisistemasficct.com/api/login-estudiante', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registro, ci }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('estudianteId', data.estudiante.id);
        setNombre(data.estudiante.apellidos_nombres);
        navigate('/dashboard'); // ⬅️ Redireccionar a la vista
      } else {
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch {
      setError('No se pudo conectar al servidor');
    }
  };

  return (
    <div className="login-page">
      <img src="/logo-uagrm.png" alt="Logo UAGRM" className="logo-externo" />
      <div className="login-box">
        <div className="login-header">Inicio de sesión</div>
        <div className="login-body">
          <h3 className="form-title">Estudiantes</h3>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Código"
              value={registro}
              onChange={(e) => setRegistro(e.target.value)}
              className="input-field"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={ci}
              onChange={(e) => setCi(e.target.value)}
              className="input-field"
              required
            />
            <button type="submit" className="submit-button">Iniciar Sesión</button>

            {error && <p className="error-text">{error}</p>}
            {nombre && <p className="success-text">Bienvenido, {nombre}</p>}

            <a href="/" className="forgot-link">¿Olvidaste tu contraseña?</a>

            <hr />
            <p className="access-title">Acceso directo a:</p>
            <div className="access-links">
              <a href="/">Inscripción Web</a>
              <a href="/">Formulario de seguimiento a Titulados</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
