import { defineMiddleware } from 'astro:middleware';
import { checkAuth } from './lib/auth';

export const onRequest = defineMiddleware(async ({ request, locals, redirect }, next) => {
  // Obtener la URL actual
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Rutas públicas que no requieren autenticación
  const publicPaths = [
    '/admin/login',
    '/admin/logout',
    '/admin/index_admin'
  ];
  
  // Si la ruta es de administración y no es una ruta pública
  if (path.startsWith('/admin') && !publicPaths.includes(path)) {
    // Verificar autenticación
    const { user, redirect: shouldRedirect } = await checkAuth(request);
    
    // Si no hay usuario autenticado, redirigir a login
    if (shouldRedirect) {
      return redirect('/admin/login');
    }
    
    // Guardar el usuario en locals para que esté disponible en las páginas
    locals.user = user;
  }
  
  // Continuar con la solicitud
  return next();
});
