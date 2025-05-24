import type { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  personalizacion: {
    id: 'personalizacion',
    name: 'Personalizaciones',
    description: 'Transformaciones únicas que reflejan tu estilo personal',
    projects: [
      {
        id: 'p001',
        title: 'Personalización Honda CBR',
        category: 'personalizacion',
        categoryLabel: 'Personalización',
        description: 'Transformación completa de una Honda CBR con pintura personalizada, escape Akrapovič y suspensiones Öhlins.',
        image: 'trabajos/honda-cbr-custom.jpg',
        fullDescription: 'Proyecto de personalización integral que incluyó una completa transformación estética y mejoras significativas en rendimiento. El cliente buscaba una moto única que destacara tanto en estética como en prestaciones.',
        specs: [
          'Pintura personalizada con diseño exclusivo',
          'Sistema de escape Akrapovič completo',
          'Suspensiones Öhlins ajustables',
          'Kit de carenado personalizado',
          'Asiento de competición tapizado a medida',
          'Manillar y controles ergonómicos'
        ],
        beforeImages: ['trabajos/honda-cbr-before-1.jpg', 'trabajos/honda-cbr-before-2.jpg'],
        afterImages: ['trabajos/honda-cbr-after-1.jpg', 'trabajos/honda-cbr-after-2.jpg'],
        completionDate: '2023-08-15',
        duration: '6 semanas'
      }
    ]
  },
  restauracion: {
    id: 'restauracion',
    name: 'Restauraciones',
    description: 'Devolvemos la vida y el esplendor a motos clásicas',
    projects: [
      {
        id: 'r001',
        title: 'Restauración Kawasaki Z900',
        category: 'restauracion',
        categoryLabel: 'Restauración',
        description: 'Restauración meticulosa de una Kawasaki Z900 clásica, respetando su esencia pero mejorando su rendimiento.',
        image: 'trabajos/honda-cb750-restored.jpg',
        fullDescription: 'Proyecto de restauración completa que implicó el desmontaje total de la moto, restauración del motor, renovación del sistema eléctrico y acabado con pintura original.',
        specs: [
          'Restauración completa del motor',
          'Sistema eléctrico renovado',
          'Pintura con códigos originales',
          'Cromados restaurados',
          'Tapicería recreada según original',
          'Piezas originales restauradas'
        ],
        beforeImages: ['trabajos/kawasaki-before-1.jpg', 'trabajos/kawasaki-before-2.jpg'],
        afterImages: ['trabajos/kawasaki-after-1.jpg', 'trabajos/kawasaki-after-2.jpg'],
        completionDate: '2023-06-20',
        duration: '3 meses'
      }
    ]
  },
  rendimiento: {
    id: 'rendimiento',
    name: 'Mejoras de Rendimiento',
    description: 'Optimizamos el rendimiento de tu moto al máximo nivel',
    projects: [
      {
        id: 'm001',
        title: 'Mejora Ducati Monster',
        category: 'rendimiento',
        categoryLabel: 'Mejora de rendimiento',
        description: 'Mejora de rendimiento en una Ducati Monster con reprogramación de centralita y sistema de escape completo.',
        image: 'trabajos/ducati-track.jpg',
        fullDescription: 'Proyecto de mejora de rendimiento que incluyó una reprogramación completa de la ECU, instalación de sistema de escape racing y optimización de la admisión.',
        specs: [
          'Reprogramación ECU personalizada',
          'Sistema de escape completo racing',
          'Filtro de aire de alto flujo',
          'Optimización de admisión',
          'Ajuste de suspensiones',
          'Calibración en banco de potencia'
        ],
        beforeImages: ['trabajos/ducati-before-1.jpg', 'trabajos/ducati-before-2.jpg'],
        afterImages: ['trabajos/ducati-after-1.jpg', 'trabajos/ducati-after-2.jpg'],
        completionDate: '2023-09-05',
        duration: '2 semanas'
      }
    ]
  }
};
