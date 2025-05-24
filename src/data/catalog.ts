import type { CatalogData } from '../types/catalog';

export const catalogData: CatalogData = {
  cascos: {
    category: 'Cascos',
    description: 'Protección y estilo para tu cabeza con los mejores cascos del mercado',
    products: [
      {
        id: "h001",
        name: "Shoei NXR2",
        description: "Casco integral premium",
        price: 1999.95,
        image: "products/casco1.png",
        featured: true,
        details: "El Shoei NXR2 es un casco integral de gama alta que ofrece la máxima protección y comodidad. Fabricado con materiales de primera calidad y tecnología avanzada para reducir el ruido y mejorar la aerodinámica."
      },
      {
        id: "h002",
        name: "AGV K6",
        description: "Casco deportivo ligero",
        price: 1699.95,
        image: "products/casco2.png",
        featured: true,
        details: "El AGV K6 es un casco deportivo ultraligero diseñado para ofrecer el máximo rendimiento en carretera. Su estructura de carbono-aramida proporciona una excelente protección con un peso mínimo."
      },
      {
        id: "h003",
        name: "HJC RPHA 11",
        description: "Casco racing profesional",
        price: 1499.95,
        image: "products/casco3.png",
        featured: true,
        details: "El HJC RPHA 11 es un casco racing de alto rendimiento utilizado por pilotos profesionales. Ofrece una excelente ventilación, visibilidad y aerodinámica para uso en circuito o carretera."
      }
    ]
  },
  ropa: {
    category: 'Ropa',
    description: 'Equipamiento de protección y ropa para motociclistas',
    products: [
      {
        id: "r001",
        name: "Chaqueta Alpinestars T-GP Plus R v3",
        description: "Chaqueta deportiva con protecciones",
        price: 899.95,
        image: "products/ropa1.png",
        featured: true,
        details: "Chaqueta deportiva con protecciones en hombros y codos. Material resistente a la abrasión y forro térmico extraíble."
      },
      {
        id: "r002",
        name: "Pantalón Dainese Delta 3",
        description: "Pantalón de cuero deportivo",
        price: 799.95,
        image: "products/ropa2.png",
        featured: true,
        details: "Pantalón de cuero con protecciones en rodillas y cadera. Diseño ergonómico para máxima comodidad en la conducción."
      },
      {
        id: "r003",
        name: "Guantes Rev'it Sand 4",
        description: "Guantes ventilados para verano",
        price: 149.95,
        image: "products/ropa3.png",
        featured: true,
        details: "Guantes de verano con protecciones y excelente ventilación. Perfectos para la conducción en climas cálidos."
      }
    ]
  },
  accesorios: {
    category: 'Accesorios',
    description: 'Complementos y accesorios para tu moto',
    products: [
      {
        id: "a001",
        name: "Intercomunicador Cardo Packtalk Bold",
        description: "Sistema de comunicación premium",
        price: 599.95,
        image: "products/acc1.png",
        featured: true,
        details: "Sistema de comunicación avanzado con tecnología DMC y conectividad Bluetooth. Alcance de hasta 1.6 km."
      },
      {
        id: "a002",
        name: "Candado Abus Granit X-Plus 540",
        description: "Candado de disco con alarma",
        price: 199.95,
        image: "products/acc2.png",
        featured: true,
        details: "Candado de alta seguridad con alarma de 100dB. Sistema de doble bloqueo y resistente a la manipulación."
      },
      {
        id: "a003",
        name: "GoPro Hero 10 Black",
        description: "Cámara de acción 5.3K",
        price: 899.95,
        image: "products/acc3.png",
        featured: true,
        details: "Cámara de acción con estabilización HyperSmooth 4.0 y grabación 5.3K. Perfecta para capturar tus aventuras."
      }
    ]
  },
  mejoras: {
    category: 'Mejoras',
    description: 'Mejoras y actualizaciones para tu moto',
    products: [
      {
        id: "m001",
        name: "Escape Akrapovic Evolution",
        description: "Sistema de escape completo",
        price: 2499.95,
        image: "products/mejora1.png",
        featured: true,
        details: "Sistema de escape completo en titanio. Mejora el rendimiento y el sonido de tu moto."
      },
      {
        id: "m002",
        name: "Kit de Suspensión Öhlins",
        description: "Suspensión ajustable premium",
        price: 3499.95,
        image: "products/mejora2.png",
        featured: true,
        details: "Kit de suspensión delantera y trasera totalmente ajustable. Mejora la estabilidad y el manejo."
      },
      {
        id: "m003",
        name: "ECU Flash Woolich Racing",
        description: "Reprogramación de ECU",
        price: 599.95,
        image: "products/mejora3.png",
        featured: true,
        details: "Optimización de la ECU para mejorar el rendimiento y la respuesta del acelerador."
      }
    ]
  },
  mantenimiento: {
    category: 'Mantenimiento',
    description: 'Productos para el mantenimiento de tu moto',
    products: [
      {
        id: "mt001",
        name: "Kit de Filtros K&N",
        description: "Filtro de aire de alto flujo",
        price: 199.95,
        image: "products/mant1.png",
        featured: true,
        details: "Filtro de aire lavable y reutilizable. Mejora el flujo de aire y el rendimiento del motor."
      },
      {
        id: "mt002",
        name: "Aceite Motul 7100 4T",
        description: "Aceite sintético 10W40",
        price: 89.95,
        image: "products/mant2.png",
        featured: true,
        details: "Aceite sintético de alta calidad para motores de 4 tiempos. Excelente protección y rendimiento."
      },
      {
        id: "mt003",
        name: "Kit de Cadena DID VX3",
        description: "Kit de transmisión premium",
        price: 299.95,
        image: "products/mant3.png",
        featured: true,
        details: "Kit completo de cadena, piñón y corona. Alta durabilidad y rendimiento."
      }
    ]
  },
  modelos: {
    category: 'Regalos a Escala',
    description: 'Modelos a escala y coleccionables',
    products: [
      {
        id: "md001",
        name: "Ducati Panigale V4 R 1:12",
        description: "Modelo a escala Maisto",
        price: 99.95,
        image: "products/modelo1.png",
        featured: true,
        details: "Modelo a escala 1:12 de la Ducati Panigale V4 R. Alta calidad y detalles precisos."
      },
      {
        id: "md002",
        name: "Yamaha YZF-R1M 1:18",
        description: "Modelo a escala Tamiya",
        price: 79.95,
        image: "products/modelo2.png",
        featured: true,
        details: "Modelo a escala 1:18 de la Yamaha YZF-R1M. Kit de montaje con piezas detalladas."
      },
      {
        id: "md003",
        name: "BMW S1000RR 1:10",
        description: "Modelo a escala premium",
        price: 149.95,
        image: "products/modelo3.png",
        featured: true,
        details: "Modelo a escala 1:10 de la BMW S1000RR. Acabados premium y partes móviles."
      }
    ]
  }
};

export const categories = [
  { id: 'all', name: 'Todos los productos', icon: 'th-large' },
  { id: 'cascos', name: 'Cascos', icon: 'hard-hat' },
  { id: 'ropa', name: 'Ropa', icon: 'tshirt' },
  { id: 'accesorios', name: 'Accesorios', icon: 'motorcycle' },
  { id: 'mejoras', name: 'Mejoras', icon: 'cogs' },
  { id: 'mantenimiento', name: 'Mantenimiento', icon: 'tools' },
  { id: 'modelos', name: 'Regalos a Escala', icon: 'gift' }
];
