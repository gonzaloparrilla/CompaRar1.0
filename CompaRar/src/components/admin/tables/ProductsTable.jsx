import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Componente de tabla para mostrar la lista de productos.
 * @param {object[]} data - Array de productos a mostrar.
 * @param {function} handleEdit - Función para manejar la edición de un producto.
 * @param {function} handleDelete - Función para manejar la eliminación de un producto.
 */
const ProductsTable = ({ data, handleEdit, handleDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold">Imagen</th>
            <th className="text-left py-3 px-4 font-semibold">Nombre</th>
            <th className="text-left py-3 px-4 font-semibold">Categoría</th>
            <th className="text-left py-3 px-4 font-semibold">Código</th>
            <th className="text-left py-3 px-4 font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4">
                <img  
                  alt={product.nombre}
                  className="w-12 h-12 object-cover rounded-lg"
                 src={product.imagen_url || "https://via.placeholder.com/150"} />
              </td>
              <td className="py-3 px-4">
                <div>
                  <div className="font-medium">{product.nombre}</div>
                  <div className="text-sm text-gray-500 line-clamp-1">{product.descripcion}</div>
                </div>
              </td>
              <td className="py-3 px-4">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {product.categoria}
                </span>
              </td>
              <td className="py-3 px-4 font-mono text-sm">{product.codigo_barras}</td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit('products', product.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete('products', product.id)}
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

export default ProductsTable;