import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, TrendingUp, ShoppingBag, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/use-toast';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchProducts, offers, establishments, products } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchProducts(searchQuery);
      navigate('/buscar');
    } else {
      toast({
        title: "Búsqueda vacía",
        description: "Por favor ingresa un producto para buscar",
        variant: "destructive"
      });
    }
  };

  const featuredOffers = offers.filter(offer => offer.activa).slice(0, 3);
  const featuredEstablishments = establishments.slice(0, 4);
  const popularProducts = products.slice(0, 6);

  const handleFeatureClick = (feature) => {
    toast({
      title: "Función no implementada",
      description: "En breve se agregara la función"
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Compará Precios en
              <span className="block text-yellow-300">Argentina</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-blue-100"
            >
              Encontrá las mejores ofertas en supermercados y mayoristas de todo el país
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <form onSubmit={handleSearch}>
                <div className="relative glass-effect rounded-xl p-2 flex items-center"> {/* Added flex and items-center */}
                  <Search className="absolute left-4 h-6 w-6 text-blue-200" /> {/* Removed top-6 */}
                  <input
                    type="text"
                    placeholder="¿Qué producto estás buscando?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 pl-12 bg-transparent text-white placeholder-blue-200 border-none outline-none text-lg flex-grow" // Added flex-grow
                  />
                  <Button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 sm:px-8 sm:py-4 ml-2" // Adjusted padding and added ml-2
                  >
                    Buscar
                  </Button>
                </div>
              </form>
            </motion.div>

            {/* Quick Search Tags */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-3 mt-8"
            >
              {['Aceite', 'Leche', 'Arroz', 'Pan', 'Azúcar'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    searchProducts(tag);
                    navigate('/buscar');
                  }}
                  className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-white hover:bg-opacity-30 transition-all"
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              ¿Por qué elegir ComparAR?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              La forma más fácil y rápida de ahorrar dinero en tus compras
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 card-hover"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Búsqueda Inteligente</h3>
              <p className="text-gray-600">
                Encontrá cualquier producto en segundos con nuestro sistema de búsqueda avanzado
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 card-hover"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Precios Actualizados</h3>
              <p className="text-gray-600">
                Información de precios actualizada diariamente de los principales supermercados
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 card-hover"
            >
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ofertas Exclusivas</h3>
              <p className="text-gray-600">
                Descubrí promociones y descuentos especiales de todos los establecimientos
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Ofertas Destacadas</h2>
            <Link to="/ofertas">
              <Button variant="outline" className="flex items-center space-x-2">
                <span>Ver todas</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredOffers.map((offer, index) => {
              const establishment = establishments.find(e => e.id === offer.establecimiento_id);
              return (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg card-hover"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-500">
                      {establishment?.nombre}
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{offer.descuento}%
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{offer.descripcion}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Válido hasta: {new Date(offer.fecha_fin).toLocaleDateString('es-AR')}
                  </p>
                  <Button 
                    className="w-full offer-gradient text-white"
                    onClick={() => handleFeatureClick('offer')}
                  >
                    Ver Oferta
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Productos Más Buscados
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-lg p-4 shadow-md card-hover cursor-pointer"
                onClick={() => navigate(`/producto/${product.id}`)}
              >
                <img  
                  alt={product.nombre}
                  className="w-full h-24 object-cover rounded-lg mb-3"
                 src={product.imagen_url || "https://via.placeholder.com/150"} />
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                  {product.nombre}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{product.categoria}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Establishments */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Establecimientos Participantes
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredEstablishments.map((establishment, index) => (
              <motion.div
                key={establishment.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg card-hover cursor-pointer text-center"
                onClick={() => navigate(`/establecimiento/${establishment.id}`)}
              >
                <img  
                  alt={establishment.nombre}
                  className="w-16 h-16 object-cover rounded-full mx-auto mb-4"
                 src={establishment.imagen_url || "https://via.placeholder.com/150"} />
                <h3 className="font-semibold text-gray-800">{establishment.nombre}</h3>
                <p className="text-sm text-gray-500 capitalize">{establishment.tipo}</p>
                <div className="flex items-center justify-center mt-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">4.5</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para ahorrar?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Comenzá a comparar precios y encontrá las mejores ofertas hoy mismo
          </p>
          <Button 
            size="lg" 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4"
            onClick={() => document.querySelector('input[placeholder*="producto"]')?.focus()}
          >
            Empezar a Buscar
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;