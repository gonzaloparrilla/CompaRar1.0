import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EstablishmentsTable = ({ data, handleEdit, handleDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold">Logo</th>
            <th className="text-left py-3 px-4 font-semibold">Nombre</th>
            <th className="text-left py-3 px-4 font-semibold">Tipo</th>
            <th className="text-left py-3 px-4 font-semibold">Dirección</th>
            <th className="text-left py-3 px-4 font-semibold">Teléfono</th>
            <th className="text-left py-3 px-4 font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((establishment) => (
            <tr key={establishment.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4">
                <img  
                  alt={establishment.nombre}
                  className="w-12 h-12 object-cover rounded-full"
                 src={establishment.imagen_url || "https://via.placeholder.com/150"} />
              </td>
              <td className="py-3 px-4">
                <div className="font-medium">{establishment.nombre}</div>
                <div className="text-sm text-gray-500">{establishment.horarios}</div>
              </td>
              <td className="py-3 px-4">
                <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                  establishment.tipo === 'supermercado' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {establishment.tipo}
                </span>
              </td>
              <td className="py-3 px-4 text-sm">{establishment.direccion}</td>
              <td className="py-3 px-4 text-sm">{establishment.telefono}</td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit('establishments', establishment.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete('establishments', establishment.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EstablishmentsTable;