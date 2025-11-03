import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

const AppContext = createContext();

const initialState = {
  products: [],
  establishments: [],
  prices: [],
  offers: [],
  searchQuery: '',
  searchResults: [],
  filters: {
    category: '',
    priceRange: [0, 10000],
    establishment: '',
    sortBy: 'price_asc'
  },
  loading: true,
  error: null
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'LOAD_DATA':
      return {
        ...state,
        products: action.payload.products,
        establishments: action.payload.establishments,
        prices: action.payload.prices,
        offers: action.payload.offers,
        loading: false
      };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const loadData = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const { data: products, error: productsError } = await supabase.from('products').select('*').order('nombre', { ascending: true });
      if (productsError) throw productsError;

      const { data: establishments, error: establishmentsError } = await supabase.from('establishments').select('*').order('nombre', { ascending: true });
      if (establishmentsError) throw establishmentsError;

      const { data: prices, error: pricesError } = await supabase.from('prices').select('*');
      if (pricesError) throw pricesError;

      const { data: offers, error: offersError } = await supabase.from('offers').select('*');
      if (offersError) throw offersError;

      dispatch({
        type: 'LOAD_DATA',
        payload: { products, establishments, prices, offers }
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Error al cargar los datos desde Supabase' });
    }
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const searchProducts = useCallback((query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    
    if (!query.trim()) {
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] });
      return;
    }

    const filteredProducts = state.products.filter(product =>
      product.nombre.toLowerCase().includes(query.toLowerCase()) ||
      (product.categoria && product.categoria.toLowerCase().includes(query.toLowerCase()))
    );

    const resultsWithPrices = filteredProducts.map(product => {
      const productPrices = state.prices.filter(price => price.producto_id === product.id);
      const minPrice = productPrices.length > 0 ? Math.min(...productPrices.map(p => p.precio)) : 0;
      
      return {
        ...product,
        prices: productPrices,
        minPrice
      };
    });

    let filteredResults = resultsWithPrices;

    if (state.filters.category) {
      filteredResults = filteredResults.filter(p => p.categoria === state.filters.category);
    }

    if (state.filters.establishment) {
      filteredResults = filteredResults.filter(p => 
        p.prices.some(price => price.establecimiento_id === parseInt(state.filters.establishment))
      );
    }

    filteredResults = filteredResults.filter(p => 
      p.minPrice >= state.filters.priceRange[0] && p.minPrice <= state.filters.priceRange[1]
    );

    switch (state.filters.sortBy) {
      case 'price_asc':
        filteredResults.sort((a, b) => a.minPrice - b.minPrice);
        break;
      case 'price_desc':
        filteredResults.sort((a, b) => b.minPrice - a.minPrice);
        break;
      default:
        filteredResults.sort((a, b) => a.minPrice - b.minPrice);
        break;
    }

    dispatch({ type: 'SET_SEARCH_RESULTS', payload: filteredResults });
  }, [state.products, state.prices, state.filters, dispatch]);

  const uploadImage = async (file, bucketName = 'product-images') => {
    if (!file) return { data: null, error: null };

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file);

    if (uploadError) {
      return { data: null, error: uploadError };
    }

    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return { data: { publicUrl: urlData.publicUrl }, error: null };
  };

  const addProductAndPrice = async (productData, priceData, imageFile) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    let imageUrl = productData.imagen_url;
    if (imageFile) {
      const { data: uploadData, error: uploadError } = await uploadImage(imageFile);
      if (uploadError) {
        return { productError: uploadError };
      }
      imageUrl = uploadData.publicUrl;
    }

    const { data: newProduct, error: productError } = await supabase
      .from('products')
      .insert([{ ...productData, imagen_url: imageUrl, user_id: user?.id }])
      .select()
      .single();

    if (productError) {
      return { productError };
    }

    const { error: priceError } = await supabase
      .from('prices')
      .insert([{ 
        ...priceData, 
        producto_id: newProduct.id,
        user_id: user?.id,
        fecha_actualizacion: '2025-11-15' // Fecha fija para demostración
      }]);
    
    if (!priceError) {
      await loadData();
    }

    return { productError, priceError };
  };

  const addEstablishment = async (establishmentData, imageFile) => {
    const { data: { user } } = await supabase.auth.getUser();
    let imageUrl = establishmentData.imagen_url;
    if (imageFile) {
      const { data: uploadData, error: uploadError } = await uploadImage(imageFile, 'establishment-logos'); // Usar un bucket específico para logos
      if (uploadError) {
        return { error: uploadError };
      }
      imageUrl = uploadData.publicUrl;
    }

    const { error } = await supabase.from('establishments').insert([{...establishmentData, imagen_url: imageUrl, user_id: user?.id}]);
    if (!error) {
      await loadData();
    }
    return { error };
  };

  const updateProduct = async (productId, productData, imageFile) => {
    let imageUrl = productData.imagen_url;
    if (imageFile) {
      const { data: uploadData, error: uploadError } = await uploadImage(imageFile);
      if (uploadError) {
        return { error: uploadError };
      }
      imageUrl = uploadData.publicUrl;
    }

    const { error } = await supabase
      .from('products')
      .update({ ...productData, imagen_url: imageUrl })
      .eq('id', productId);
    
    if (!error) {
      await loadData();
    }
    return { error };
  };

  const deleteProduct = async (productId) => {
    const { error: pricesError } = await supabase
      .from('prices')
      .delete()
      .eq('producto_id', productId);

    if (pricesError) {
      return { error: pricesError };
    }

    const { error: productError } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (!productError) {
      await loadData();
    }
    return { error: productError };
  };

  const updatePrice = async (priceId, priceData) => {
    const { error } = await supabase
      .from('prices')
      .update({ ...priceData, fecha_actualizacion: '2025-11-15' }) // Actualizar también la fecha fija
      .eq('id', priceId);
    
    if (!error) {
      await loadData();
    }
    return { error };
  };

  const deletePrice = async (priceId) => {
    const { error } = await supabase
      .from('prices')
      .delete()
      .eq('id', priceId);

    if (!error) {
      await loadData();
    }
    return { error };
  };
  
  const updateEstablishment = async (establishmentId, establishmentData, imageFile) => {
    let imageUrl = establishmentData.imagen_url;
    if (imageFile) {
      const { data: uploadData, error: uploadError } = await uploadImage(imageFile, 'establishment-logos'); // Usar un bucket específico para logos
      if (uploadError) {
        return { error: uploadError };
      }
      imageUrl = uploadData.publicUrl;
    }

    const { error } = await supabase
      .from('establishments')
      .update({ ...establishmentData, imagen_url: imageUrl })
      .eq('id', establishmentId);
    if (!error) {
      await loadData();
    }
    return { error };
  };

  const deleteEstablishment = async (establishmentId) => {
    const { error: pricesError } = await supabase
      .from('prices')
      .delete()
      .eq('establecimiento_id', establishmentId);
    if (pricesError) {
      return { error: pricesError };
    }

    const { error: offersError } = await supabase
      .from('offers')
      .delete()
      .eq('establecimiento_id', establishmentId);
    if (offersError) {
      return { error: offersError };
    }

    const { error: establishmentError } = await supabase
      .from('establishments')
      .delete()
      .eq('id', establishmentId);
    if (!establishmentError) {
      await loadData();
    }
    return { error: establishmentError };
  };

  const value = {
    ...state,
    dispatch,
    searchProducts,
    loadData,
    addProductAndPrice,
    addEstablishment,
    updateProduct,
    deleteProduct,
    updatePrice,
    deletePrice,
    updateEstablishment,
    deleteEstablishment,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de AppProvider');
  }
  return context;
};