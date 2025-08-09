import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ⬅️ nuevo
import "./NotasSemestrales.css";

function NotasSemestrales({ defaultSemestre = "", defaultAnio = "" }) {
  const [semestre, setSemestre] = useState(defaultSemestre);
  const [anio, setAnio] = useState(defaultAnio);
  const [status, setStatus] = useState({ loading: false, error: "", ok: false });
  const navigate = useNavigate(); // ⬅️ nuevo

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", ok: false });

    const estudianteId = localStorage.getItem("estudianteId") || "8";

    const semNum = Number(semestre);
    const anioNum = Number(anio);
    if (!semNum || semNum < 1 || semNum > 4) {
      setStatus({ loading: false, error: "Ingresa un semestre válido (1 a 4).", ok: false });
      return;
    }
    if (!anioNum || anio.length !== 4) {
      setStatus({ loading: false, error: "Ingresa un año válido (ej. 2024).", ok: false });
      return;
    }

    try {
      const res = await fetch(
        `https://uagrm.bo.cisistemasficct.com/api/estudiantes/${estudianteId}/notas-por-periodo`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ semestre: semNum, anio: anioNum }),
        }
      );

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Error HTTP ${res.status}`);
      }

      const data = await res.json();

      // Guarda lo último buscado (para recargar la página de resultados si se refresca)
      sessionStorage.setItem(
        "notas:lastSearch",
        JSON.stringify({ semestre: semNum, anio: anioNum, estudianteId })
      );

      // Redirige llevando la data
      navigate("/dashboard/notas-resultado", { state: data });

    } catch (err) {
      setStatus({ loading: false, error: err.message || "Error al consultar.", ok: false });
      return;
    }
  };

  return (
    <div className="ns-wrapper">
      <div className="ns-card">
        <h1 className="ns-title">Notas semestrales</h1>

        <p className="ns-text">
          Ingrese el semestre y año (Gestión) que inscribió materias de las cuales desea ver sus notas.
        </p>

        <div className="ns-obs">
          <span className="ns-obs-label">OBS:</span>{" "}
          Si su carrera es anualizada, debe colocar <strong>Sem: 1</strong> y Año el que desea ver.
          <br />
          <span className="ns-obs-small">
            (Verano es Sem: <strong>3</strong> y Mesa es Sem: <strong>4</strong>)
          </span>
        </div>

        <form className="ns-form" onSubmit={handleSubmit}>
          <div className="ns-grid">
            <label className="ns-field">
              <span className="ns-label">Sem.</span>
              <input
                type="number"
                min="1"
                max="4"
                className="ns-input"
                value={semestre}
                onChange={(e) => setSemestre(e.target.value)}
                required
              />
            </label>

            <label className="ns-field">
              <span className="ns-label">Año</span>
              <input
                type="number"
                min="2000"
                max="2100"
                className="ns-input"
                value={anio}
                onChange={(e) => setAnio(e.target.value)}
                required
              />
            </label>
          </div>

          <button className="ns-btn" type="submit" disabled={status.loading}>
            {status.loading ? "Consultando..." : "Aceptar"}
          </button>

          {status.error && <div className="ns-alert ns-alert-error">{status.error}</div>}
        </form>
      </div>
    </div>
  );
}

export default NotasSemestrales;
