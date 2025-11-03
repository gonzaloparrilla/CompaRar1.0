import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Mail, Phone, MapPin } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Tag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ComparAR Precios</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              La plataforma líder en comparación de precios en Argentina. 
              Encuentra las mejores ofertas en supermercados y mayoristas de todo el país.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <span>info@comparar.com.ar</span>
              </div>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <span className="text-lg font-semibold mb-4 block">Enlaces Rápidos</span>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/ofertas" className="text-gray-300 hover:text-white transition-colors">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-300 hover:text-white transition-colors">
                  Panel Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <span className="text-lg font-semibold mb-4 block">Categorías</span>
            <ul className="space-y-2 text-gray-300">
              <li>Aceites y Vinagres</li>
              <li>Lácteos</li>
              <li>Cereales y Legumbres</li>
              <li>Panadería</li>
              <li>Bebidas</li>
              <li>Limpieza</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">© 2025 ComparAR Precios. Proyecto Final - Tecnicatura Universitaria en Informática.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;