import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const { searchResults, searchQuery, establishments, filters, dispatch, searchProducts } = useApp();
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Aceites y Vinagres', 'Lácteos', 'Cereales y Legumbres', 'Panadería', 'Endulzantes', 'Pastas', 'Bebidas', 'Limpieza', 'Higiene Personal'];
  
  const safeEstablishments = establishments || [];
  const safeSearchResults = searchResults || [];

  useEffect(() => {
    if (searchQuery) {
        searchProducts(searchQuery);
    }
  }, [filters, searchQuery, searchProducts]);

  const handleFilterChange = (filterType, value) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { [filterType]: value }
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  const getEstablishmentName = (establishmentId) => {
    const establishment = safeEstablishments.find(e => e.id === establishmentId);
    return establishment ? establishment.nombre : 'Desconocido';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Resultados de búsqueda - {searchQuery} | ComparAR Precios</title>
        <meta name="description" content={`Resultados de búsqueda para "${searchQuery}". Compara precios entre diferentes supermercados y mayoristas en Argentina.`} />
        <meta property="og:title" content={`Resultados de búsqueda - {searchQuery} | ComparAR Precios`} />
        <meta property="og:description" content={`Resultados de búsqueda para "${searchQuery}". Compara precios entre diferentes supermercados y mayoristas en Argentina.`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Resultados para "{searchQuery}"
          </h1>
          <p className="text-gray-600">
            {safeSearchResults.length} productos encontrados
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filtros</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4" />
                </Button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <div>
                  <h3 className="font-medium mb-3">Categoría</h3>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todas las categorías</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Establecimiento</h3>
                  <select
                    value={filters.establishment}
                    onChange={(e) => handleFilterChange('establishment', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todos los establecimientos</option>
                    {safeEstablishments.map(establishment => (
                      <option key={establishment.id} value={establishment.id}>
                        {establishment.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Rango de Precio</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={filters.priceRange[1]}
                      onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>$0</span>
                      <span>{formatPrice(filters.priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Ordenar por</h3>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="price_asc">Menor precio</option>
                    <option value="price_desc">Mayor precio</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            {safeSearchResults.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-gray-500">
                  Intenta ajustar los filtros o buscar con otros términos
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {safeSearchResults.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md p-6 card-hover"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <Link to={`/producto/${product.id}`} className="md:w-48 flex-shrink-0">
                        <img  
                          alt={product.nombre}
                          className="w-full h-48 object-cover rounded-lg"
                         src={product.imagen_url || "https://via.placeholder.com/200"} />
                      </Link>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                             <Link to={`/producto/${product.id}`}>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                                  {product.nombre}
                                </h3>
                             </Link>
                            <p className="text-gray-600 mb-2">{product.descripcion}</p>
                            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                              {product.categoria}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-700">Precios disponibles:</h4>
                          {product.prices && product.prices.slice(0, 3).map((price, priceIndex) => (
                            <div
                              key={price.id}
                              className={`flex items-center justify-between p-3 rounded-lg ${
                                priceIndex === 0 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <div>
                                  <span className="font-medium">
                                    {getEstablishmentName(price.establecimiento_id)}
                                  </span>
                                  {priceIndex === 0 && (
                                    <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                      Mejor precio
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-green-600">
                                  {formatPrice(price.precio)}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Act: {new Date(price.fecha_actualizacion).toLocaleDateString('es-AR')}
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          {product.prices && product.prices.length > 3 && (
                            <Link to={`/producto/${product.id}`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full"
                              >
                                Ver {product.prices.length - 3} precios más
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;