import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Barra de herramientas para las tablas de administración.
 * Contiene un campo de búsqueda y un botón para agregar nuevos items.
 * @param {string} activeTab - La pestaña actualmente activa.
 * @param {string} searchTerm - El valor actual del campo de búsqueda.
 * @param {function} setSearchTerm - Función para actualizar el término de búsqueda.
 * @param {function} handleAdd - Función que se ejecuta al hacer clic en el botón de agregar.
 * @param {object[]} tabs - La configuración de las pestañas para obtener etiquetas.
 */
const AdminToolbar = ({ activeTab, searchTerm, setSearchTerm, handleAdd, tabs }) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={`Buscar ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
          />
        </div>
        <Button
          onClick={() => handleAdd(activeTab)}
          className="search-gradient text-white flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar {tabs.find(t => t.id === activeTab)?.label.slice(0, -1)}</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminToolbar;