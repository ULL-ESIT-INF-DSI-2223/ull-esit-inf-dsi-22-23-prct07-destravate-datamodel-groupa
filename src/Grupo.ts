// Clase para representar un grupo
class Grupo {
  id: number;
  nombre: string;
  participantes: number[]; // IDs de los usuarios del grupo
  estadisticas: {
    semana: {
      km: number;
      desnivel: number;
    };
    mes: {
      km: number;
      desnivel: number;
    };
    año: {
      km: number;
      desnivel: number;
    };
  };
  clasificacion: number[]; // IDs de los usuarios ordenados por km totales o desnivel acumulado
  rutasFavoritas: number[]; // IDs de las rutas favoritas del grupo
  historico: {
    [fecha: string]: number[]; // IDs de las rutas realizadas por el grupo en la fecha
  };
}
