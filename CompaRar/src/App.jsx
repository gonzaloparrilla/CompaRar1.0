import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { AppProvider } from '@/context/AppContext';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import SearchResults from '@/pages/SearchResults';
import ProductDetail from '@/pages/ProductDetail';
import EstablishmentDetail from '@/pages/EstablishmentDetail';
import OffersPage from '@/pages/OffersPage';
import AdminPanel from '@/pages/AdminPanel';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

/**
 * Componente principal de la aplicación.
 * Configura el enrutamiento y los proveedores de contexto globales.
 */
function App() {
  return (
    // Proveedor de estado global para los datos de la aplicación (productos, precios, etc.)
    <AppProvider>
      {/* Proveedor para la autenticación de Supabase */}
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            {/* Gestiona las etiquetas del <head> para SEO y accesibilidad */}
            <Helmet>
              <title>ComparAR Precios - Comparador de Precios Argentina</title>
              <meta name="description" content="Compara precios de productos entre supermercados y mayoristas en Argentina. Encuentra las mejores ofertas y ahorra dinero en tus compras." />
              <meta property="og:title" content="ComparAR Precios - Comparador de Precios Argentina" />
              <meta property="og:description" content="Compara precios de productos entre supermercados y mayoristas en Argentina. Encuentra las mejores ofertas y ahorra dinero en tus compras." />
            </Helmet>
            
            <Header />
            
            <main className="flex-1">
              {/* Define las rutas de la aplicación */}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/buscar" element={<SearchResults />} />
                <Route path="/producto/:id" element={<ProductDetail />} />
                <Route path="/establecimiento/:id" element={<EstablishmentDetail />} />
                <Route path="/ofertas" element={<OffersPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route 
                  path="/admin" 
                  element={
                    // Ruta protegida que requiere autenticación
                    <ProtectedRoute>
                      <AdminPanel />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            
            <Footer />
            {/* Componente para mostrar notificaciones (toasts) */}
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;