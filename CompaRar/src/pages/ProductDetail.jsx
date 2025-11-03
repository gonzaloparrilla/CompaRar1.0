import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet';

const ProductDetail = () => {
  const { id } = useParams();
  const { products, prices, establishments } = useApp();
  const { toast } = useToast();

  const product = products.find(p => p.id === parseInt(id));
  const productPrices = prices.filter(p => p.producto_id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Producto no encontrado</h2>
          <Link to="/">
            <Button>Volver al inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  const sortedPrices = productPrices
    .map(price => ({
      ...price,
      establishment: establishments.find(e => e.id === price.establecimiento_id)
    }))
    .filter(p => p.establishment) // Asegurarse que el establecimiento exista
    .sort((a, b) => a.precio - b.precio);

  const minPrice = sortedPrices.length > 0 ? sortedPrices[0].precio : 0;
  const maxPrice = sortedPrices.length > 0 ? sortedPrices[sortedPrices.length - 1].precio : 0;
  const avgPrice = sortedPrices.length > 0 ? 
    sortedPrices.reduce((sum, p) => sum + p.precio, 0) / sortedPrices.length : 0;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  const handleEstablishmentClick = (establishmentId) => {
    window.location.href = `/establecimiento/${establishmentId}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{product.nombre} - Comparar Precios | ComparAR</title>
        <meta name="description" content={`Compara precios de ${product.nombre} en diferentes supermercados y mayoristas. ${product.descripcion}`} />
        <meta property="og:title" content={`${product.nombre} - Comparar Precios | ComparAR`} />
        <meta property="og:description" content={`Compara precios de ${product.nombre} en diferentes supermercados y mayoristas. ${product.descripcion}`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-2 mb-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{product.categoria}</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800 font-medium">{product.nombre}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-6 mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img  
                    alt={product.nombre}
                    className="w-full h-64 object-cover rounded-lg"
                   src={product.imagen_url || "https://via.placeholder.com/300"} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    {product.nombre}
                  </h1>
                  <p className="text-gray-600 mb-4">{product.descripcion}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Categoría:</span>
                      <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {product.categoria}
                      </span>
                    </div>
                    {product.codigo_barras && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Código de barras:</span>
                        <span className="font-mono text-sm">{product.codigo_barras}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Comparación de Precios
              </h2>

              {sortedPrices.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No hay precios disponibles para este producto</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedPrices.map((price, index) => (
                    <motion.div
                      key={price.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        index === 0 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-gray-50 hover:border-blue-200'
                      }`}
                      onClick={() => handleEstablishmentClick(price.establishment.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <img  
                          alt={price.establishment.nombre}
                          className="w-12 h-12 object-cover rounded-full"
                         src={price.establishment.imagen_url || "https://via.placeholder.com/150"} />
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {price.establishment.nombre}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <MapPin className="w-3 h-3" />
                            <span>{price.establishment.direccion}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>Act: {new Date(price.fecha_actualizacion).toLocaleDateString('es-AR')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${
                          index === 0 ? 'text-green-600' : 'text-gray-800'
                        }`}>
                          {formatPrice(price.precio)}
                        </div>
                        {index === 0 && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            Mejor precio
                          </span>
                        )}
                        {index > 0 && (
                          <span className="text-sm text-red-500">
                            +{formatPrice(price.precio - minPrice)}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Estadísticas de Precio
              </h3>
              
              {sortedPrices.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Precio mínimo:</span>
                    <span className="font-bold text-green-600">{formatPrice(minPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Precio máximo:</span>
                    <span className="font-bold text-red-600">{formatPrice(maxPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Precio promedio:</span>
                    <span className="font-bold text-blue-600">{formatPrice(avgPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Diferencia:</span>
                    <span className="font-bold text-orange-600">{formatPrice(maxPrice - minPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ahorro máximo:</span>
                    <span className="font-bold text-purple-600">
                      {maxPrice > 0 ? ((maxPrice - minPrice) / maxPrice * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No hay datos suficientes</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Acciones Rápidas
              </h3>
              
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => toast({
                    title: "Función no implementada",
                    description: "En breve se agregara la función"
                  })}
                >
                  <Star className="w-4 h-4 mr-2" />
                  Agregar a favoritos
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => toast({
                    title: "Función no implementada",
                    description: "En breve se agregara la función"
                  })}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Ver historial de precios
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;