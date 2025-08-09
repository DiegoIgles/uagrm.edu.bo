import React, { useEffect, useState } from 'react';
import './DatosPersonales.css';

function DatosPersonales() {
  const [estudiante, setEstudiante] = useState(null);
  const [error, setError] = useState('');

  // Base de API configurable
  const API_BASE = import.meta.env?.VITE_API_BASE_URL || 'https://uagrm.bo.cisistemasficct.com';

  // Función para construir URL absoluta de imagen
  const buildAbsoluteUrl = (foto) => {
    if (!foto) return null;
    if (/^https?:\/\//i.test(foto)) return foto; // ya es absoluta
    if (foto.startsWith('/')) {
      return `${API_BASE.replace(/\/+$/, '')}${foto}`;
    }
    return `${API_BASE.replace(/\/+$/, '')}/storage/fotos/${foto}`;
  };

  useEffect(() => {
    const fetchEstudiante = async () => {
      const id = localStorage.getItem('estudianteId');
      if (!id) {
        setError('No hay sesión activa.');
        return;
      }
      try {
        const res = await fetch(`${API_BASE.replace(/\/+$/, '')}/api/estudiantes/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // Si el backend no devuelve foto_url, la construimos
        if (!data.foto_url) {
          data.foto_url = buildAbsoluteUrl(data.foto);
        }

        setEstudiante(data);
      } catch (e) {
        console.error(e);
        setError('Error al obtener los datos');
      }
    };

    fetchEstudiante();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) return <p>{error}</p>;
  if (!estudiante) return <p>Cargando datos...</p>;

  return (
    <div className="datos-personales-container">
      <h2>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="currentColor" width="25" height="25">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
          />
        </svg>
        <span className="text-uppercase fw-semibold">DATOS PERSONALES</span>
      </h2>

      <div className="datos-grid">
        <div className="campo"><label>Registro:</label><div className="valor">{estudiante.registro}</div></div>
        <div className="campo"><label>Apellidos y Nombres:</label><div className="valor">{estudiante.apellidos_nombres}</div></div>
        <div className="campo"><label>Cédula de Identidad:</label><div className="valor">{estudiante.ci}</div></div>
        <div className="campo"><label>Sexo:</label><div className="valor">{estudiante.sexo}</div></div>
        <div className="campo"><label>Estado Civil:</label><div className="valor">{estudiante.estado_civil}</div></div>
        <div className="campo"><label>Fecha de Nacimiento:</label><div className="valor">{estudiante.fecha_nacimiento}</div></div>
        <div className="campo"><label>País:</label><div className="valor">{estudiante.pais}</div></div>
        <div className="campo"><label>Departamento:</label><div className="valor">{estudiante.departamento}</div></div>
        <div className="campo"><label>Provincia:</label><div className="valor">{estudiante.provincia}</div></div>
        <div className="campo"><label>Nacionalidad:</label><div className="valor">{estudiante.nacionalidad}</div></div>
        <div className="campo"><label>Dirección:</label><div className="valor">{estudiante.direccion}</div></div>
        <div className="campo"><label>Teléfono:</label><div className="valor">{estudiante.telefono || '—'}</div></div>
        <div className="campo"><label>Celular:</label><div className="valor">{estudiante.celular}</div></div>
        <div className="campo"><label>Email:</label><div className="valor">{estudiante.email}</div></div>
        <div className="campo"><label>Modalidad de Ingreso:</label><div className="valor">{estudiante.modalidad_ingreso}</div></div>
        <div className="campo"><label>Periodo:</label><div className="valor">{estudiante.periodo}</div></div>
        <div className="campo"><label>Tipo de Sangre:</label><div className="valor">{estudiante.tipo_sangre}</div></div>
        <div className="campo"><label>Título de Bachiller:</label><div className="valor">{estudiante.titulo_bachiller}</div></div>
      </div>

      {estudiante.foto_url ? (
        <div className="foto-container">
          <img src={estudiante.foto_url} alt="Foto estudiante" className="foto-estudiante" />
        </div>
      ) : (
        <p className="foto-no-disponible">📸 Foto no disponible</p>
      )}
    </div>
  );
}

export default DatosPersonales;
