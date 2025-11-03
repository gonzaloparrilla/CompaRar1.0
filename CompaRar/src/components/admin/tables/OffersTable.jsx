import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getEstablishmentName } from '@/utils/adminUtils';

const OffersTable = ({ data, handleEdit, handleDelete, establishments }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold">Establecimiento</th>
            <th className="text-left py-3 px-4 font-semibold">Descripción</th>
            <th className="text-left py-3 px-4 font-semibold">Descuento</th>
            <th className="text-left py-3 px-4 font-semibold">Vigencia</th>
            <th className="text-left py-3 px-4 font-semibold">Estado</th>
            <th className="text-left py-3 px-4 font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((offer) => (
            <tr key={offer.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4">
                <div className="font-medium">{getEstablishmentName(offer.establecimiento_id, establishments)}</div>
              </td>
              <td className="py-3 px-4">
                <div className="max-w-xs line-clamp-2">{offer.descripcion}</div>
              </td>
              <td className="py-3 px-4">
                <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full font-bold">
                  -{offer.descuento}%
                </span>
              </td>
              <td className="py-3 px-4 text-sm">
                <div>{new Date(offer.fecha_inicio).toLocaleDateString('es-AR')}</div>
                <div className="text-gray-500">hasta {new Date(offer.fecha_fin).toLocaleDateString('es-AR')}</div>
              </td>
              <td className="py-3 px-4">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  offer.activa 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {offer.activa ? 'Activa' : 'Inactiva'}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit('offer', offer.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete('offer', offer.id)}
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

export default OffersTable;