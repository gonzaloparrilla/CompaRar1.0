import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Calendar, MapPin, Filter, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet';

const OffersPage = () => {
  const { offers, establishments } = useApp();
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState('all');

  const activeOffers = offers.filter(offer => offer.activa);
  
  const filteredOffers = selectedType === 'all' 
    ? activeOffers 
    : activeOffers.filter(offer => {
        const establishment = establishments.find(e => e.id === offer.establecimiento_id);
        return establishment?.tipo === selectedType;
      });

  const handleOfferClick = () => {
    toast({
      title: "Función no implementada",
      description: "En breve se agregara la función"
    });
  };

  const getEstablishment = (establishmentId) => {
    return establishments.find(e => e.id === establishmentId);
  };

  const isOfferExpiringSoon = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays > 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Ofertas y Promociones - ComparAR Precios</title>
        <meta name="description" content="Descubre las mejores ofertas y promociones de supermercados y mayoristas en Argentina. Ahorra dinero en tus compras diarias." />
        <meta property="og:title" content="Ofertas y Promociones - ComparAR Precios" />
        <meta property="og:description" content="Descubre las mejores ofertas y promociones de supermercados y mayoristas en Argentina. Ahorra dinero en tus compras diarias." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Ofertas y Promociones
            </h1>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Descubrí las mejores ofertas de supermercados y mayoristas en Argentina
            </p>
            <div className="flex items-center justify-center space-x-6 text-orange-100">
              <div className="flex items-center space-x-2">
                <Tag className="w-5 h-5" />
                <span>{activeOffers.length} ofertas activas</span>
              </div>
              <div className="flex items-center space-x-2">
                <Percent className="w-5 h-5" />
                <span>Hasta 50% OFF</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filtrar ofertas
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedType === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedType('all')}
              className="flex items-center space-x-2"
            >
              <span>Todas</span>
              <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                {activeOffers.length}
              </span>
            </Button>
            <Button
              variant={selectedType === 'supermercado' ? 'default' : 'outline'}
              onClick={() => setSelectedType('supermercado')}
              className="flex items-center space-x-2"
            >
              <span>Supermercados</span>
              <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                {activeOffers.filter(o => {
                  const est = establishments.find(e => e.id === o.establecimiento_id);
                  return est?.tipo === 'supermercado';
                }).length}
              </span>
            </Button>
            <Button
              variant={selectedType === 'mayorista' ? 'default' : 'outline'}
              onClick={() => setSelectedType('mayorista')}
              className="flex items-center space-x-2"
            >
              <span>Mayoristas</span>
              <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                {activeOffers.filter(o => {
                  const est = establishments.find(e => e.id === o.establecimiento_id);
                  return est?.tipo === 'mayorista';
                }).length}
              </span>
            </Button>
          </div>
        </motion.div>

        {/* Offers Grid */}
        {filteredOffers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Tag className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No hay ofertas disponibles
            </h3>
            <p className="text-gray-500">
              Intenta cambiar los filtros o vuelve más tarde
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map((offer, index) => {
              const establishment = getEstablishment(offer.establecimiento_id);
              const isExpiring = isOfferExpiringSoon(offer.fecha_fin);
              
              return (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden card-hover cursor-pointer"
                  onClick={handleOfferClick}
                >
                  {/* Offer Header */}
                  <div className="relative">
                    <div className="offer-gradient p-4 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium opacity-90">
                          {establishment?.nombre}
                        </span>
                        {isExpiring && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                            ¡Últimos días!
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-3xl font-bold">-{offer.descuento}%</span>
                        <span className="text-sm opacity-90">OFF</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <img  
                        alt={establishment?.nombre}
                        className="w-12 h-12 object-cover rounded-full border-2 border-white"
                       src="https://images.unsplash.com/photo-1485531865381-286666aa80a9" />
                    </div>
                  </div>

                  {/* Offer Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {offer.descripcion}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{establishment?.direccion}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Válido hasta: {new Date(offer.fecha_fin).toLocaleDateString('es-AR')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-3 py-1 rounded-full capitalize ${
                        establishment?.tipo === 'supermercado' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {establishment?.tipo}
                      </span>
                      <Button 
                        size="sm" 
                        className="search-gradient text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOfferClick();
                        }}
                      >
                        Ver oferta
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mt-12 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">
            ¡No te pierdas ninguna oferta!
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Suscribite a nuestro newsletter y recibí las mejores ofertas y promociones 
            directamente en tu email
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <Button 
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              onClick={() => toast({
                title: "Función no implementada",
                description: "En breve se agregara la función"
              })}
            >
              Suscribirse
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OffersPage;