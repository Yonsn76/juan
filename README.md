# Casa Biker Astro

Este proyecto es un sitio web para una mecánica de motos totalmente administrable por el usuario. Utiliza [Astro](https://astro.build/) y [Supabase](https://supabase.com/) como backend.

## Requisitos

- Node.js 18 o superior
- Una cuenta de Supabase con las tablas y buckets configurados

## Instalación

1. Clona el repositorio y entra en la carpeta:

```bash
npm install
```

2. Copia el archivo `.env.example` a `.env` y rellena tus claves de Supabase.

3. Inicia el entorno de desarrollo:

```bash
npm run dev
```

## Scripts disponibles

- `npm run dev` inicia Astro en modo desarrollo.
- `npm run build` genera la versión estática del sitio en `dist/`.
- `npm run preview` sirve la versión construida para pruebas.

## Despliegue

El proyecto se genera como sitio estático, por lo que puede desplegarse en cualquier hosting que sirva archivos estáticos.

## Estructura básica

- `src/` contiene el código fuente dividido en componentes, páginas, scripts y estilos.
- `public/` almacena recursos estáticos como imágenes.

Para cualquier duda adicional revisa los comentarios dentro del código.
