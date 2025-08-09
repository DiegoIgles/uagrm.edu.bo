import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import "./NotasResultado.css";

export default function NotasResultado() {
  const location = useLocation();
  const initialData = location.state || null;

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState("");

  useEffect(() => {
    const doFetch = async () => {
      const last = sessionStorage.getItem("notas:lastSearch");
      if (!last) {
        setLoading(false);
        setError("No hay datos de búsqueda. Vuelve a la página de notas.");
        return;
      }
      try {
        const { semestre, anio, estudianteId } = JSON.parse(last);
        const res = await fetch(
          `http://uagrm.bo.cisistemasficct.com/api/estudiantes/${estudianteId || 8}/notas-por-periodo`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ semestre: Number(semestre), anio: Number(anio) }),
          }
        );
        if (!res.ok) throw new Error(await res.text());
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message || "Error al cargar notas.");
      } finally {
        setLoading(false);
      }
    };

    if (!initialData) {
      setLoading(true);
      doFetch();
    }
  }, [initialData]);

  const periodoTitle = useMemo(
    () => (data?.periodo ? `Notas semestre ${data.periodo}` : "Notas"),
    [data]
  );

  if (loading) {
    return (
      <div className="nr-wrapper">
        <div className="nr-card"><div className="nr-loading">Cargando…</div></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="nr-wrapper">
        <div className="nr-card">
          <h1 className="nr-title">Notas</h1>
          <div className="nr-alert nr-alert-error">{error}</div>
        </div>
      </div>
    );
  }

  const est = data?.estudiante || {};

  return (
    <div className="nr-wrapper">
      <div className="nr-card">
        <h1 className="nr-title">{periodoTitle}</h1>

        <div className="nr-meta">
          <div className="nr-row">
            <span className="nr-label">Carrera</span>
            <span className="nr-sep">:</span>
            <span className="nr-value">{est.carrera || "-"}</span>
          </div>
          <div className="nr-row">
            <span className="nr-label">Registro N°</span>
            <span className="nr-sep">:</span>
            <span className="nr-value">{est.registro || "-"}</span>
          </div>
          <div className="nr-row">
            <span className="nr-label">Apellidos y Nombres</span>
            <span className="nr-sep">:</span>
            <span className="nr-value">{est.nombre_completo || "-"}</span>
          </div>
          <div className="nr-row">
            <span className="nr-label">Fecha de emisión</span>
            <span className="nr-sep">:</span>
            <span className="nr-value">{data?.fecha_emision || "-"}</span>
          </div>
        </div>

        <div className="nr-table-wrap">
          <table className="nr-table">
            <thead>
              <tr>
                <th>Carr-Plan</th>
                <th>Nivel</th>
                <th>Sigla-Grupo</th>
                <th>Nombre de Materia</th>
                <th>Sem-Año</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody>
              {data?.notas?.length ? (
                data.notas.map((n, i) => {
                  const reprobada = Number(n.nota) < 51;
                  return (
                    <tr key={i} className={reprobada ? "nr-row-baja" : ""}>
                      <td>{n.carrera_plan}</td>
                      <td>{n.nivel}</td>
                      <td>{n.sigla_grupo}</td>
                      <td className="nr-col-materia">{n.materia}</td>
                      <td>{n.periodo}</td>
                      <td className={`nr-nota ${reprobada ? "nr-nota-baja" : "nr-nota-ok"}`}>
                        {n.nota}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="nr-empty">Sin registros.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
