import React, { useEffect, useState } from 'react';
import './Historico.css';

function Historico() {
  const [data, setData] = useState(null);
  const estudianteId = localStorage.getItem('estudianteId');

  useEffect(() => {
    if (!estudianteId) {
      console.error("No se encontró el ID del estudiante en localStorage.");
      return;
    }

    fetch(`https://localhost:8000/api/estudiantes/${estudianteId}/historial`)
      .then(res => {
        if (!res.ok) throw new Error('Error en la respuesta del servidor');
        return res.json();
      })
      .then(setData)
      .catch(error => {
        console.error("Error al obtener el historial:", error);
      });
  }, [estudianteId]);

  if (!data) return <p>Cargando...</p>;

  const { estudiante, notas, ppac } = data;

  return (
    <div className="historico-container">
      <div className="header">
        <h2>Histórico</h2>
        <button className="btn-imprimir">
          <i class="fa fa-print"></i> Imprimir
        </button>
      </div>

      <div className="info-estudiante">
        <div>
          <p>ESTUDIANTE:</p>
          <h2>{estudiante.registro}</h2>
          <p>{estudiante.nombre_completo}</p>
        </div>
        <div className="ppac-box">
          <h2>P.P.A.C. {Math.floor(ppac)}</h2>
          <p>{estudiante.carrera}</p>
        </div>
      </div>

      <table className="tabla-notas">
        <thead>
          <tr>
            <th>NIVEL</th>
            <th>CARRERA</th>
            <th>MATERIA</th>
            <th>CR</th>
            <th>PERIODO</th>
            <th>NOTA</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((n, index) => (
            <tr key={index}>
              <td>{n.nivel}</td>
              <td>{n.carrera}</td>
              <td>{`${n.codigo} - ${n.materia}`}</td>
              <td>{n.creditos}</td>
              <td>{n.periodo}</td>
              <td className={n.nota >= 51 ? 'nota-verde' : 'nota-roja'}>
                {n.nota}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Historico;
