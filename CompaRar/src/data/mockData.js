export const mockData = {
  establishments: [
    {
      id: 1,
      nombre: "Carrefour",
      direccion: "Av. Corrientes 1234, CABA",
      telefono: "011-4567-8900",
      tipo: "supermercado",
      horarios: "Lun-Dom 8:00-22:00",
      imagen_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
    },
    {
      id: 2,
      nombre: "Coto",
      direccion: "Av. Santa Fe 2345, CABA",
      telefono: "011-4567-8901",
      tipo: "supermercado",
      horarios: "Lun-Dom 7:30-23:00",
      imagen_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400"
    },
    {
      id: 3,
      nombre: "Disco",
      direccion: "Av. Rivadavia 3456, CABA",
      telefono: "011-4567-8902",
      tipo: "supermercado",
      horarios: "Lun-Dom 8:00-22:30",
      imagen_url: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400"
    },
    {
      id: 4,
      nombre: "Mayorista Central",
      direccion: "Av. Warnes 4567, CABA",
      telefono: "011-4567-8903",
      tipo: "mayorista",
      horarios: "Lun-Vie 6:00-18:00, Sab 6:00-14:00",
      imagen_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400"
    },
    {
      id: 5,
      nombre: "Jumbo",
      direccion: "Av. del Libertador 5678, CABA",
      telefono: "011-4567-8904",
      tipo: "supermercado",
      horarios: "Lun-Dom 8:00-23:00",
      imagen_url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400"
    },
    {
      id: 6,
      nombre: "Makro",
      direccion: "Ruta 8 Km 23, Provincia de Buenos Aires",
      telefono: "011-4567-8905",
      tipo: "mayorista",
      horarios: "Lun-Vie 7:00-19:00, Sab 7:00-15:00",
      imagen_url: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400"
    }
  ],

  products: [
    {
      id: 1,
      nombre: "Aceite de Girasol Natura 900ml",
      descripcion: "Aceite de girasol refinado, ideal para cocinar y freír",
      categoria: "Aceites y Vinagres",
      imagen_url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
      codigo_barras: "7790001234567"
    },
    {
      id: 2,
      nombre: "Leche Entera La Serenísima 1L",
      descripcion: "Leche entera pasteurizada, rica en calcio y proteínas",
      categoria: "Lácteos",
      imagen_url: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400",
      codigo_barras: "7790002345678"
    },
    {
      id: 3,
      nombre: "Arroz Largo Fino Gallo 1kg",
      descripcion: "Arroz largo fino de primera calidad",
      categoria: "Cereales y Legumbres",
      imagen_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
      codigo_barras: "7790003456789"
    },
    {
      id: 4,
      nombre: "Pan Lactal Bimbo 450g",
      descripcion: "Pan de molde lactal, ideal para tostadas y sándwiches",
      categoria: "Panadería",
      imagen_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
      codigo_barras: "7790004567890"
    },
    {
      id: 5,
      nombre: "Azúcar Común Ledesma 1kg",
      descripcion: "Azúcar blanca refinada de caña",
      categoria: "Endulzantes",
      imagen_url: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400",
      codigo_barras: "7790005678901"
    },
    {
      id: 6,
      nombre: "Fideos Matarazzo 500g",
      descripcion: "Fideos secos de sémola de trigo duro",
      categoria: "Pastas",
      imagen_url: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400",
      codigo_barras: "7790006789012"
    },
    {
      id: 7,
      nombre: "Coca Cola 2.25L",
      descripcion: "Gaseosa cola sabor original",
      categoria: "Bebidas",
      imagen_url: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400",
      codigo_barras: "7790007890123"
    },
    {
      id: 8,
      nombre: "Yogur Ser Natural 1kg",
      descripcion: "Yogur natural cremoso sin azúcar agregada",
      categoria: "Lácteos",
      imagen_url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
      codigo_barras: "7790008901234"
    },
    {
      id: 9,
      nombre: "Detergente Ala 750ml",
      descripcion: "Detergente líquido para ropa, fórmula concentrada",
      categoria: "Limpieza",
      imagen_url: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400",
      codigo_barras: "7790009012345"
    },
    {
      id: 10,
      nombre: "Papel Higiénico Elite 4 rollos",
      descripcion: "Papel higiénico doble hoja, suave y resistente",
      categoria: "Higiene Personal",
      imagen_url: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400",
      codigo_barras: "7790010123456"
    }
  ],

  prices: [
    // Aceite de Girasol
    { id: 1, producto_id: 1, establecimiento_id: 1, precio: 850, fecha_actualizacion: "2024-01-15" },
    { id: 2, producto_id: 1, establecimiento_id: 2, precio: 820, fecha_actualizacion: "2024-01-15" },
    { id: 3, producto_id: 1, establecimiento_id: 3, precio: 890, fecha_actualizacion: "2024-01-15" },
    { id: 4, producto_id: 1, establecimiento_id: 4, precio: 750, fecha_actualizacion: "2024-01-15" },
    { id: 5, producto_id: 1, establecimiento_id: 5, precio: 870, fecha_actualizacion: "2024-01-15" },

    // Leche
    { id: 6, producto_id: 2, establecimiento_id: 1, precio: 450, fecha_actualizacion: "2024-01-15" },
    { id: 7, producto_id: 2, establecimiento_id: 2, precio: 430, fecha_actualizacion: "2024-01-15" },
    { id: 8, producto_id: 2, establecimiento_id: 3, precio: 470, fecha_actualizacion: "2024-01-15" },
    { id: 9, producto_id: 2, establecimiento_id: 4, precio: 390, fecha_actualizacion: "2024-01-15" },
    { id: 10, producto_id: 2, establecimiento_id: 5, precio: 460, fecha_actualizacion: "2024-01-15" },

    // Arroz
    { id: 11, producto_id: 3, establecimiento_id: 1, precio: 680, fecha_actualizacion: "2024-01-15" },
    { id: 12, producto_id: 3, establecimiento_id: 2, precio: 650, fecha_actualizacion: "2024-01-15" },
    { id: 13, producto_id: 3, establecimiento_id: 3, precio: 720, fecha_actualizacion: "2024-01-15" },
    { id: 14, producto_id: 3, establecimiento_id: 4, precio: 580, fecha_actualizacion: "2024-01-15" },
    { id: 15, producto_id: 3, establecimiento_id: 6, precio: 590, fecha_actualizacion: "2024-01-15" },

    // Pan Lactal
    { id: 16, producto_id: 4, establecimiento_id: 1, precio: 320, fecha_actualizacion: "2024-01-15" },
    { id: 17, producto_id: 4, establecimiento_id: 2, precio: 310, fecha_actualizacion: "2024-01-15" },
    { id: 18, producto_id: 4, establecimiento_id: 3, precio: 340, fecha_actualizacion: "2024-01-15" },
    { id: 19, producto_id: 4, establecimiento_id: 5, precio: 330, fecha_actualizacion: "2024-01-15" },

    // Azúcar
    { id: 20, producto_id: 5, establecimiento_id: 1, precio: 520, fecha_actualizacion: "2024-01-15" },
    { id: 21, producto_id: 5, establecimiento_id: 2, precio: 500, fecha_actualizacion: "2024-01-15" },
    { id: 22, producto_id: 5, establecimiento_id: 3, precio: 540, fecha_actualizacion: "2024-01-15" },
    { id: 23, producto_id: 5, establecimiento_id: 4, precio: 450, fecha_actualizacion: "2024-01-15" },
    { id: 24, producto_id: 5, establecimiento_id: 6, precio: 460, fecha_actualizacion: "2024-01-15" },

    // Fideos
    { id: 25, producto_id: 6, establecimiento_id: 1, precio: 280, fecha_actualizacion: "2024-01-15" },
    { id: 26, producto_id: 6, establecimiento_id: 2, precio: 270, fecha_actualizacion: "2024-01-15" },
    { id: 27, producto_id: 6, establecimiento_id: 3, precio: 290, fecha_actualizacion: "2024-01-15" },
    { id: 28, producto_id: 6, establecimiento_id: 4, precio: 240, fecha_actualizacion: "2024-01-15" },
    { id: 29, producto_id: 6, establecimiento_id: 5, precio: 285, fecha_actualizacion: "2024-01-15" },

    // Coca Cola
    { id: 30, producto_id: 7, establecimiento_id: 1, precio: 950, fecha_actualizacion: "2024-01-15" },
    { id: 31, producto_id: 7, establecimiento_id: 2, precio: 920, fecha_actualizacion: "2024-01-15" },
    { id: 32, producto_id: 7, establecimiento_id: 3, precio: 980, fecha_actualizacion: "2024-01-15" },
    { id: 33, producto_id: 7, establecimiento_id: 5, precio: 960, fecha_actualizacion: "2024-01-15" },

    // Yogur
    { id: 34, producto_id: 8, establecimiento_id: 1, precio: 780, fecha_actualizacion: "2024-01-15" },
    { id: 35, producto_id: 8, establecimiento_id: 2, precio: 750, fecha_actualizacion: "2024-01-15" },
    { id: 36, producto_id: 8, establecimiento_id: 3, precio: 820, fecha_actualizacion: "2024-01-15" },
    { id: 37, producto_id: 8, establecimiento_id: 4, precio: 680, fecha_actualizacion: "2024-01-15" },

    // Detergente
    { id: 38, producto_id: 9, establecimiento_id: 1, precio: 1200, fecha_actualizacion: "2024-01-15" },
    { id: 39, producto_id: 9, establecimiento_id: 2, precio: 1150, fecha_actualizacion: "2024-01-15" },
    { id: 40, producto_id: 9, establecimiento_id: 3, precio: 1250, fecha_actualizacion: "2024-01-15" },
    { id: 41, producto_id: 9, establecimiento_id: 5, precio: 1180, fecha_actualizacion: "2024-01-15" },

    // Papel Higiénico
    { id: 42, producto_id: 10, establecimiento_id: 1, precio: 890, fecha_actualizacion: "2024-01-15" },
    { id: 43, producto_id: 10, establecimiento_id: 2, precio: 850, fecha_actualizacion: "2024-01-15" },
    { id: 44, producto_id: 10, establecimiento_id: 3, precio: 920, fecha_actualizacion: "2024-01-15" },
    { id: 45, producto_id: 10, establecimiento_id: 4, precio: 780, fecha_actualizacion: "2024-01-15" },
    { id: 46, producto_id: 10, establecimiento_id: 5, precio: 870, fecha_actualizacion: "2024-01-15" }
  ],

  offers: [
    {
      id: 1,
      establecimiento_id: 1,
      descripcion: "2x1 en todos los aceites de girasol",
      descuento: 50,
      fecha_inicio: "2024-01-10",
      fecha_fin: "2024-01-25",
      activa: true
    },
    {
      id: 2,
      establecimiento_id: 2,
      descripcion: "20% OFF en lácteos los martes",
      descuento: 20,
      fecha_inicio: "2024-01-01",
      fecha_fin: "2024-01-31",
      activa: true
    },
    {
      id: 3,
      establecimiento_id: 3,
      descripcion: "Llevá 3 pagá 2 en productos de limpieza",
      descuento: 33,
      fecha_inicio: "2024-01-15",
      fecha_fin: "2024-01-30",
      activa: true
    },
    {
      id: 4,
      establecimiento_id: 4,
      descripcion: "15% OFF comprando más de $10.000",
      descuento: 15,
      fecha_inicio: "2024-01-01",
      fecha_fin: "2024-02-29",
      activa: true
    },
    {
      id: 5,
      establecimiento_id: 5,
      descripcion: "Miércoles de ofertas: 25% OFF en bebidas",
      descuento: 25,
      fecha_inicio: "2024-01-01",
      fecha_fin: "2024-01-31",
      activa: true
    },
    {
      id: 6,
      establecimiento_id: 6,
      descripcion: "Descuento por volumen: 10% comprando +50kg",
      descuento: 10,
      fecha_inicio: "2024-01-01",
      fecha_fin: "2024-03-31",
      activa: true
    }
  ]
};