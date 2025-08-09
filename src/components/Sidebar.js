import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  const items = [
    { label: "Datos Personales", path: "/dashboard" },
    { label: "Certificados", path: "/dashboard/mantenimiento" },
    { label: "Histórico", path: "/dashboard/historico" },
    { label: "Avance Académico", path: "/dashboard/avance-academico" },
    { label: "Boleta de Inscripción", path: "/dashboard/boleta" },
    { label: "Casos Especiales", path: "/dashboard/mantenimiento" },
    { label: "Malla Curricular", path: "/dashboard/mantenimiento" },
    { label: "Notas Semestrales", path: "/dashboard/notas" },
    { label: "Consulta Libros", path: "/dashboard/mantenimiento" },
    { label: "Pagos en Caja", path: "/dashboard/mantenimiento" },
    { label: "Bloqueos", path: "/dashboard/mantenimiento" },
    { label: "Avance de Contenidos", path: "/dashboard/mantenimiento" },
    { label: "Evaluación Académica", path: "/dashboard/mantenimiento" },
    { label: "Fecha de Análisis", path: "/dashboard/mantenimiento" },
    { label: "Form. Beca", path: "/dashboard/mantenimiento" },
    { label: "Control de Materias", path: "/dashboard/mantenimiento" },
    { label: "Cambiar contraseña", path: "/dashboard/mantenimiento" },
    { label: "Solicitar Servicio", path: "/dashboard/mantenimiento" },
    { label: "Expoencia", path: "/dashboard/mantenimiento" },
    { label: "Form. Titulados", path: "/dashboard/mantenimiento" },
    { label: "Salir", path: "/" }
  ];

  const handleLogout = () => {
    // Elimina datos de sesión
    localStorage.removeItem('cartId');
    localStorage.removeItem('estudianteId');
    localStorage.removeItem('token');

    // Si quieres limpiar todo el localStorage:
    // localStorage.clear();

    // Redirige al inicio
    navigate('/');
  };

  return (
    <div className="sidebar">
      <h4 className="sidebar-title">Consultas Estudiantes</h4>
      
      <div className="sidebar-buttons">
        {items.map(({ label, path }, index) => {
          let className = "sidebar-button";
          if (label === "Solicitar Servicio") className += " special-yellow";
          else if (label === "Expoencia" || label === "Form. Titulados") className += " special-yellow";

          return (
            <button
              key={index}
              className={className}
              onClick={() => {
                if (label === "Salir") {
                  handleLogout();
                } else {
                  navigate(path);
                }
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
