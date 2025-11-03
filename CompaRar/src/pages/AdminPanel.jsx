import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Store, DollarSign, Tag, LogOut } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import AdminStatsCards from '@/components/admin/AdminStatsCards';
import AdminToolbar from '@/components/admin/AdminToolbar';
import AdminTable from '@/components/admin/AdminTable';
import ProductsTable from '@/components/admin/tables/ProductsTable';
import EstablishmentsTable from '@/components/admin/tables/EstablishmentsTable';
import PricesTable from '@/components/admin/tables/PricesTable';
import OffersTable from '@/components/admin/tables/OffersTable';
import AddProductModal from '@/components/admin/modals/AddProductModal';
import AddEstablishmentModal from '@/components/admin/modals/AddEstablishmentModal';
import EditPriceModal from '@/components/admin/modals/EditPriceModal';
import { getEstablishmentName, getProductName } from '@/utils/adminUtils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

/**
 * Componente principal del panel de administración.
 * Gestiona la visualización y manipulación de productos, establecimientos, precios y ofertas.
 */
const AdminPanel = () => {
  // Hooks para acceder al contexto, autenticación, notificaciones y navegación.
  const { products, establishments, prices, offers, deleteProduct, deletePrice, deleteEstablishment } = useApp();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Estados para gestionar la pestaña activa, búsqueda, modales y diálogos de confirmación.
  const [activeTab, setActiveTab] = useState('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isEstablishmentModalOpen, setIsEstablishmentModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [establishmentToEdit, setEstablishmentToEdit] = useState(null);
  const [priceToEdit, setPriceToEdit] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Función para cerrar la sesión del usuario.
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Definición de las pestañas del panel de administración.
  const tabs = [
    { id: 'products', label: 'Productos', icon: Package, count: products.length },
    { id: 'establishments', label: 'Establecimientos', icon: Store, count: establishments.length },
    { id: 'prices', label: 'Precios', icon: DollarSign, count: prices.length },
    { id: 'offers', label: 'Ofertas', icon: Tag, count: offers.length }
  ];

  // Manejador para abrir el modal de "Agregar" correspondiente.
  const handleAdd = (type) => {
    if (type === 'products') {
      setProductToEdit(null);
      setIsProductModalOpen(true);
    } else if (type === 'establishments') {
      setEstablishmentToEdit(null);
      setIsEstablishmentModalOpen(true);
    } else {
      toast({
        title: "Función no implementada",
        description: "En breve se agregara la función"
      });
    }
  };

  // Manejador para abrir el modal de "Editar" con los datos del item seleccionado.
  const handleEdit = (type, id) => {
    if (type === 'products') {
      const product = products.find(p => p.id === id);
      if (product) {
        setProductToEdit(product);
        setIsProductModalOpen(true);
      }
    } else if (type === 'establishments') {
      const establishment = establishments.find(e => e.id === id);
      if (establishment) {
        setEstablishmentToEdit(establishment);
        setIsEstablishmentModalOpen(true);
      }
    } else if (type === 'prices') {
      const price = prices.find(p => p.id === id);
      if (price) {
        setPriceToEdit(price);
        setIsPriceModalOpen(true);
      }
    } else {
      toast({
        title: "Función no implementada",
        description: "En breve se agregara la función"
      });
    }
  };

  // Manejador para abrir el diálogo de confirmación de eliminación.
  const handleDelete = (type, id) => {
    setItemToDelete({ type, id });
    setIsDeleteDialogOpen(true);
  };

  // Confirma y ejecuta la eliminación del item seleccionado.
  const confirmDelete = async () => {
    if (!itemToDelete) return;
    const { type, id } = itemToDelete;

    let error;
    let successMessage = '';

    if (type === 'products') {
      const result = await deleteProduct(id);
      error = result.error;
      successMessage = '¡Producto eliminado!';
    } else if (type === 'prices') {
      const result = await deletePrice(id);
      error = result.error;
      successMessage = '¡Precio eliminado!';
    } else if (type === 'establishments') {
      const result = await deleteEstablishment(id);
      error = result.error;
      successMessage = '¡Establecimiento eliminado!';
    }


    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error al eliminar',
        description: error.message || 'Hubo un problema al eliminar el item.',
      });
    } else {
      toast({
        title: successMessage,
        description: 'El item ha sido eliminado correctamente.',
      });
    }
    
    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  // Filtra los datos a mostrar según la pestaña activa y el término de búsqueda.
  const filteredData = () => {
    let data = [];
    switch (activeTab) {
      case 'products':
        data = products;
        break;
      case 'establishments':
        data = establishments;
        break;
      case 'prices':
        data = prices;
        break;
      case 'offers':
        data = offers;
        break;
      default:
        data = [];
    }

    if (!searchTerm) return data;

    return data.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      switch (activeTab) {
        case 'products':
          return item.nombre.toLowerCase().includes(searchLower) ||
                 (item.categoria && item.categoria.toLowerCase().includes(searchLower));
        case 'establishments':
          return item.nombre.toLowerCase().includes(searchLower) ||
                 (item.direccion && item.direccion.toLowerCase().includes(searchLower));
        case 'prices':
          const product = getProductName(item.producto_id, products);
          const establishment = getEstablishmentName(item.establecimiento_id, establishments);
          return product.toLowerCase().includes(searchLower) ||
                 establishment.toLowerCase().includes(searchLower);
        case 'offers':
          const offerEstablishment = getEstablishmentName(item.establecimiento_id, establishments);
          return item.descripcion.toLowerCase().includes(searchLower) ||
                 offerEstablishment.toLowerCase().includes(searchLower);
        default:
          return false;
      }
    });
  };

  // Renderiza la tabla correspondiente a la pestaña activa.
  const renderTableContent = () => {
    const data = filteredData();
    switch (activeTab) {
      case 'products':
        return <ProductsTable data={data} handleEdit={handleEdit} handleDelete={handleDelete} />;
      case 'establishments':
        return <EstablishmentsTable data={data} handleEdit={handleEdit} handleDelete={handleDelete} />;
      case 'prices':
        return <PricesTable data={data} handleEdit={handleEdit} handleDelete={handleDelete} products={products} establishments={establishments} />;
      case 'offers':
        return <OffersTable data={data} handleEdit={handleEdit} handleDelete={handleDelete} establishments={establishments} />;
      default:
        return null;
    }
  };

  // Mensaje a mostrar cuando no hay datos en la tabla.
  const getEmptyMessage = () => {
    if (searchTerm) {
      return 'No se encontraron resultados para tu búsqueda';
    }
    const currentTabLabel = tabs.find(t => t.id === activeTab)?.label.toLowerCase();
    return `Comienza agregando ${currentTabLabel}`;
  };

  // Descripción para el diálogo de confirmación de eliminación.
  const getDeleteDialogDescription = () => {
    if (!itemToDelete) return '';
    switch (itemToDelete.type) {
      case 'products':
        return 'Esta acción no se puede deshacer. Esto eliminará permanentemente el producto y todos sus precios asociados.';
      case 'prices':
        return 'Esta acción no se puede deshacer. Esto eliminará permanentemente el precio seleccionado.';
      case 'establishments':
        return 'Esta acción no se puede deshacer. Esto eliminará permanentemente el establecimiento y todos sus precios y ofertas asociadas.';
      default:
        return 'Esta acción no se puede deshacer. ¿Estás seguro?';
    }
  };

  return (
    <>
      {/* Modales para agregar y editar datos */}
      <AddProductModal 
        isOpen={isProductModalOpen} 
        setIsOpen={setIsProductModalOpen} 
        productToEdit={productToEdit}
        clearProductToEdit={() => setProductToEdit(null)}
      />
      <AddEstablishmentModal
        isOpen={isEstablishmentModalOpen}
        setIsOpen={setIsEstablishmentModalOpen}
        establishmentToEdit={establishmentToEdit}
        clearEstablishmentToEdit={() => setEstablishmentToEdit(null)}
      />
      <EditPriceModal
        isOpen={isPriceModalOpen}
        setIsOpen={setIsPriceModalOpen}
        priceToEdit={priceToEdit}
        clearPriceToEdit={() => setPriceToEdit(null)}
      />
      {/* Diálogo de confirmación para eliminaciones */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              {getDeleteDialogDescription()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setItemToDelete(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="min-h-screen bg-gray-50">
        <Helmet>
          <title>Panel de Administración - ComparAR Precios</title>
          <meta name="description" content="Panel de administración para gestionar productos, establecimientos, precios y ofertas en ComparAR Precios." />
          <meta property="og:title" content="Panel de Administración - ComparAR Precios" />
          <meta property="og:description" content="Panel de Administración para gestionar productos, establecimientos, precios y ofertas en ComparAR Precios." />
        </Helmet>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"> {/* Adjusted for better mobile layout */}
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email} />
                <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">¡Bienvenido!</h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
          {/* Tarjetas de estadísticas */}
          <AdminStatsCards tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="border-b border-gray-200">
              {/* Navegación por pestañas */}
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Barra de herramientas con búsqueda y botón de agregar */}
            <AdminToolbar 
              activeTab={activeTab} 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              handleAdd={handleAdd} 
              tabs={tabs} 
            />
            
            {/* Contenedor de la tabla */}
            <AdminTable 
              data={filteredData()} 
              renderTableContent={renderTableContent} 
              emptyMessage={getEmptyMessage()} 
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;