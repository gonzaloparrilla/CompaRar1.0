import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Phone, Star, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet';

const EstablishmentDetail = () => {
  const { id } = useParams();
  const { establishments, prices, products, offers } = useApp();
  const { toast } = useToast();

  const establishment = establishments.find(e => e.id === parseInt(id));
  const establishmentPrices = prices.filter(p => p.establecimiento_id === parseInt(id));
  const establishmentOffers = offers.filter(o => o.establecimiento_id === parseInt(id) && o.activa);

  if (!establishment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Establecimiento no encontrado</h2>
          <Link to="/">
            <Button>Volver al inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  const productsWithPrices = establishmentPrices.map(price => {
    const product = products.find(p => p.id === price.producto_id);
    return {
      ...product,
      price: price.precio,
      lastUpdated: price.fecha_actualizacion
    };
  }).filter(p => p.id);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  const handleContactClick = () => {
    toast({
      title: "Función no implementada",
      description: "En breve se agregara la función"
    });
  };

  const handleDirectionsClick = () => {
    toast({
      title: "Función no implementada",
      description: "En breve se agregara la función"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{establishment.nombre} - Precios y Ofertas | ComparAR</title>
        <meta name="description" content={`Descubre los precios y ofertas de ${establishment.nombre}. ${establishment.direccion}. Horarios: ${establishment.horarios}`} />
        <meta property="og:title" content={`${establishment.nombre} - Precios y Ofertas | ComparAR`} />
        <meta property="og:description" content={`Descubre los precios y ofertas de ${establishment.nombre}. ${establishment.direccion}. Horarios: ${establishment.horarios}`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Establecimientos</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800 font-medium">{establishment.nombre}</span>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="flex items-start space-x-4">
                <img  
                  alt={establishment.nombre}
                  className="w-20 h-20 object-cover rounded-lg"
                 src={establishment.imagen_url || "https://via.placeholder.com/150"} />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {establishment.nombre}
                  </h1>
                  <div className="flex items-center space-x-1 mb-3">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-gray-300" />
                    <span className="text-gray-600 ml-2">4.2 (128 reseñas)</span>
                  </div>
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full capitalize">
                    {establishment.tipo}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button 
                className="w-full search-gradient text-white"
                onClick={handleDirectionsClick}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Cómo llegar
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleContactClick}
              >
                <Phone className="w-4 h-4 mr-2" />
                Contactar
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{establishment.direccion}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{establishment.horarios}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{establishment.telefono}</span>
            </div>
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{productsWithPrices.length} productos disponibles</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Productos Disponibles
              </h2>

              {productsWithPrices.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No hay productos disponibles</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {productsWithPrices.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      className="border border-gray-200 rounded-lg p-4 card-hover cursor-pointer"
                      onClick={() => window.location.href = `/producto/${product.id}`}
                    >
                      <img  
                        alt={product.nombre}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                       src={product.imagen_url || "https://via.placeholder.com/300"} />
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                        {product.nombre}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{product.categoria}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-green-600">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-xs text-gray-500">
                          Act: {new Date(product.lastUpdated).toLocaleDateString('es-AR')}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Offers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Ofertas Actuales
              </h3>
              
              {establishmentOffers.length === 0 ? (
                <p className="text-gray-500">No hay ofertas disponibles</p>
              ) : (
                <div className="space-y-4">
                  {establishmentOffers.map((offer) => (
                    <div
                      key={offer.id}
                      className="border border-orange-200 rounded-lg p-4 bg-orange-50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          -{offer.descuento}%
                        </span>
                        <span className="text-xs text-gray-500">
                          Hasta: {new Date(offer.fecha_fin).toLocaleDateString('es-AR')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{offer.descripcion}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Estadísticas
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Productos:</span>
                  <span className="font-bold">{productsWithPrices.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ofertas activas:</span>
                  <span className="font-bold text-orange-600">{establishmentOffers.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tipo:</span>
                  <span className="font-bold capitalize">{establishment.tipo}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Calificación:</span>
                  <span className="font-bold text-yellow-600">4.2/5</span>
                </div>
              </div>
            </motion.div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Ubicación
              </h3>
              <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Mapa interactivo</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={handleDirectionsClick}
                  >
                    Ver en mapa
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstablishmentDetail;