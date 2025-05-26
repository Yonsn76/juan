import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async ({ request, locals, redirect }, next) => {
  // Continuar con la solicitud sin verificar autenticación
  return next();
});
