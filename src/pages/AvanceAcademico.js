// src/pages/AvanceAcademico.jsx
import React, { useEffect, useState } from 'react';
import './AvanceAcademico.css';

function AvanceAcademico() {
  const [data, setData] = useState(null);
  const estudianteId = localStorage.getItem('estudianteId');

  useEffect(() => {
    if (!estudianteId) {
      console.error("ID no encontrado");
      return;
    }

    fetch(`https://uagrm.bo.cisistemasficct.com/api/estudiantes/${estudianteId}/avance-academico`)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error(err));
  }, [estudianteId]);

  if (!data) return <p>Cargando...</p>;

  const { estudiante, notas_aprobadas, ppac } = data;

  return (
    <div className="vista-avance-academico"> {/* Clase contenedora única */}
      <div className="avance-academico-container">
        <div className="header">
          <h2>Avance Académico</h2>
          <button className="btn-imprimir">
            <i className="fa fa-print"></i> Imprimir
          </button>
        </div>

        <div className="info-estudiante">
          <div>
            <p>ESTUDIANTE :</p>
            <h2>{estudiante.registro}</h2>
            <p>{estudiante.nombre_completo}</p>
          </div>
          <div className="ppac-box">
            <h2>P.P.A.C. {Math.floor(ppac)}</h2>
            <p>({notas_aprobadas[0]?.carrera})</p>
          </div>
        </div>

        <table className="tabla-notas">
          <thead>
            <tr>
              <th>NIVEL</th>
              <th>MATERIA</th>
              <th>PERIODO</th>
              <th>NOTA</th>
            </tr>
          </thead>
          <tbody>
            {notas_aprobadas.map((n, index) => (
              <tr key={index}>
                <td>{n.nivel}</td>
                <td>{`${n.codigo} - ${n.materia}`}</td>
                <td>{n.periodo}</td>
                <td>{n.nota}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AvanceAcademico;
