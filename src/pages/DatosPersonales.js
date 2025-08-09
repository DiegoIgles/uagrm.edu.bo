import React, { useEffect, useState } from 'react';
import './DatosPersonales.css';

function DatosPersonales() {
  const [estudiante, setEstudiante] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEstudiante = async () => {
      const id = localStorage.getItem('estudianteId');
      try {
        const res = await fetch('http://uagrm.bo.cisistemasficct.com/api/estudiantes');
        const data = await res.json();
        const estudianteFiltrado = data.find((e) => e.id === parseInt(id));
        if (estudianteFiltrado) {
          setEstudiante(estudianteFiltrado);
        } else {
          setError('Estudiante no encontrado');
        }
      } catch {
        setError('Error al obtener los datos');
      }
    };

    fetchEstudiante();
  }, []);

  if (error) return <p>{error}</p>;
  if (!estudiante) return <p>Cargando datos...</p>;

  return (
    <div className="datos-personales-container">
      <h2>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="currentColor" width="25" height="25">
                    <path fillrule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" cliprule="evenodd"></path>
                </svg>
                <span class="text-uppercase fw-semibold">DATOS PERSONALES</span>
            </h2>
      <div className="datos-grid">
        <div className="campo">
          <label>Registro:</label>
          <div className="valor">{estudiante.registro}</div>
        </div>
        <div className="campo">
          <label>Apellidos y Nombres:</label>
          <div className="valor">{estudiante.apellidos_nombres}</div>
        </div>
        <div className="campo">
          <label>Cédula de Identidad:</label>
          <div className="valor">{estudiante.ci}</div>
        </div>
        <div className="campo">
          <label>Sexo:</label>
          <div className="valor">{estudiante.sexo}</div>
        </div>
        <div className="campo">
          <label>Estado Civil:</label>
          <div className="valor">{estudiante.estado_civil}</div>
        </div>
        <div className="campo">
          <label>Fecha de Nacimiento:</label>
          <div className="valor">{estudiante.fecha_nacimiento}</div>
        </div>
        <div className="campo">
          <label>País:</label>
          <div className="valor">{estudiante.pais}</div>
        </div>
        <div className="campo">
          <label>Departamento:</label>
          <div className="valor">{estudiante.departamento}</div>
        </div>
        <div className="campo">
          <label>Provincia:</label>
          <div className="valor">{estudiante.provincia}</div>
        </div>
        <div className="campo">
          <label>Nacionalidad:</label>
          <div className="valor">{estudiante.nacionalidad}</div>
        </div>
        <div className="campo">
          <label>Dirección:</label>
          <div className="valor">{estudiante.direccion}</div>
        </div>
        <div className="campo">
          <label>Teléfono:</label>
          <div className="valor">{estudiante.telefono}</div>
        </div>
        <div className="campo">
          <label>Celular:</label>
          <div className="valor">{estudiante.celular}</div>
        </div>
        <div className="campo">
          <label>Email:</label>
          <div className="valor">{estudiante.email}</div>
        </div>
        <div className="campo">
          <label>Modalidad de Ingreso:</label>
          <div className="valor">{estudiante.modalidad_ingreso}</div>
        </div>
        <div className="campo">
          <label>Periodo:</label>
          <div className="valor">{estudiante.periodo}</div>
        </div>
        <div className="campo">
          <label>Tipo de Sangre:</label>
          <div className="valor">{estudiante.tipo_sangre}</div>
        </div>
        <div className="campo">
          <label>Título de Bachiller:</label>
          <div className="valor">{estudiante.titulo_bachiller}</div>
        </div>
      </div>

      {estudiante.foto ? (
        <div className="foto-container">
          <label>Foto</label>
          <img src={estudiante.foto} alt="Foto estudiante" className="foto-estudiante" />
        </div>
      ) : (
        <p className="foto-no-disponible">📸 Foto no disponible</p>
      )}
    </div>
  );
}

export default DatosPersonales;
