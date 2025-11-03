import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice, getEstablishmentName, getProductName } from '@/utils/adminUtils';

/**
 * Componente de tabla para mostrar la lista de precios.
 * @param {object[]} data - Array de precios a mostrar.
 * @param {function} handleEdit - Función para manejar la edición de un precio.
 * @param {function} handleDelete - Función para manejar la eliminación de un precio.
 * @param {object[]} products - Lista completa de productos para buscar nombres.
 * @param {object[]} establishments - Lista completa de establecimientos para buscar nombres.
 */
const PricesTable = ({ data, handleEdit, handleDelete, products, establishments }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold">Producto</th>
            <th className="text-left py-3 px-4 font-semibold">Establecimiento</th>
            <th className="text-left py-3 px-4 font-semibold">Precio</th>
            <th className="text-left py-3 px-4 font-semibold">Última Actualización</th>
            <th className="text-left py-3 px-4 font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((price) => (
            <tr key={price.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4">
                <div className="font-medium">{getProductName(price.producto_id, products)}</div>
              </td>
              <td className="py-3 px-4">
                <div className="font-medium">{getEstablishmentName(price.establecimiento_id, establishments)}</div>
              </td>
              <td className="py-3 px-4">
                <div className="text-lg font-bold text-green-600">
                  {formatPrice(price.precio)}
                </div>
              </td>
              <td className="py-3 px-4 text-sm text-gray-500">
                {new Date(price.fecha_actualizacion).toLocaleDateString('es-AR')}
              </td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit('prices', price.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete('prices', price.id)}
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

export default PricesTable;