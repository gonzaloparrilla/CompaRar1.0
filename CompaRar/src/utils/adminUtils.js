export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(price);
};

export const getEstablishmentName = (id, establishments) => {
  const establishment = establishments.find(e => e.id === id);
  return establishment ? establishment.nombre : 'Desconocido';
};

export const getProductName = (id, products) => {
  const product = products.find(p => p.id === id);
  return product ? product.nombre : 'Desconocido';
};