import React from 'react';
import { Package } from 'lucide-react';

/**
 * Componente genérico para renderizar una tabla de administración.
 * Muestra un mensaje de "vacío" si no hay datos, o el contenido de la tabla si los hay.
 * @param {object[]} data - Array de datos a mostrar.
 * @param {function} renderTableContent - Función que renderiza el contenido de la tabla.
 * @param {string} emptyMessage - Mensaje a mostrar cuando no hay datos.
 */
const AdminTable = ({ data, renderTableContent, emptyMessage }) => {
  return (
    <div className="p-6">
      {data.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Package className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No hay datos disponibles
          </h3>
          <p className="text-gray-500">
            {emptyMessage}
          </p>
        </div>
      ) : (
        renderTableContent()
      )}
    </div>
  );
};

export default AdminTable;