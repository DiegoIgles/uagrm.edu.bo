import React, { useEffect, useState } from 'react';
import './BoletaInscripcion.css';

function BoletaInscripcion() {
  const [boleta, setBoleta] = useState(null);

  useEffect(() => {
    const idEstudiante = localStorage.getItem('estudianteId');
    fetch(`http://uagrm.bo.cisistemasficct.com/api/estudiantes/${idEstudiante}/boleta`)
      .then(res => res.json())
      .then(data => setBoleta(data))
      .catch(err => console.error('Error al obtener la boleta:', err));
  }, []);

  const handleImprimir = () => {
    window.print();
  };

  if (!boleta) return <div className="boleta-container">Cargando boleta...</div>;

  return (
    <div className="boleta-container">
      <div className="boleta-header">
        <h1>Boleta de Inscripción</h1>
        <button className="btn-imprimir" onClick={handleImprimir}>
          <i className="fas fa-print"></i> Imprimir
        </button>
      </div>

      <div className="boleta-datos-superior">
        <div>
          <h2 className="periodo">PERIODO NORMAL {boleta.periodo}</h2>
        </div>

        <div className="datos-estudiante">
          <div className="codigo">{boleta.registro}</div>
          <div>{boleta.nombre_completo}</div>
          <div>{boleta.ci}</div>
        </div>
      </div>

      <hr className="boleta-linea" />

      <div className="carrera-info">
        <h3>{boleta.carrera_codigo} {boleta.carrera_nombre}</h3>
        <small>MODALIDAD {boleta.modalidad}</small>
        <small>LOCALIDAD {boleta.localidad}</small>
      </div>

      <div className="origen">ORIGEN</div>

      <table className="tabla-materias">
        <thead>
          <tr>
            <th>SIGLA</th>
            <th>GRUPO</th>
            <th>MATERIA</th>
            <th>MODALIDAD</th>
            <th>NIVEL</th>
            <th>HORARIO</th>
          </tr>
        </thead>
        <tbody>
          {boleta.materias.map((m) => (
            <tr key={m.id}>
              <td>{m.sigla}</td>
              <td>{m.grupo}</td>
              <td>{m.nombre}</td>
              <td>{m.modalidad}</td>
              <td>{m.nivel}</td>
              <td>{m.horario}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="aviso">
        <strong>AVISO:</strong>
        <p>Documento no válido para trámites.</p>
      </div>
    </div>
  );
}

export default BoletaInscripcion;
