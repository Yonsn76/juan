// auth.js - Funciones de autenticación simplificadas
import { supabase } from './supabase';
import { parse } from 'cookie';

// Nombre de la cookie de sesión
const SESSION_COOKIE_NAME = 'admin-session';

// Función para iniciar sesión (simplificada para proyecto de fin de semana)
export async function login(email, password) {
  try {
    // Buscar el usuario en la tabla 'users'
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Error al buscar usuario:', error);
      return { user: null, error: 'Error al buscar usuario' };
    }

    if (!user) {
      return { user: null, error: 'Usuario no encontrado' };
    }

    // Verificar la contraseña (sin hash para simplicidad)
    if (user.password !== password) {
      return { user: null, error: 'Contraseña incorrecta' };
    }

    return { user, error: null };
  } catch (err) {
    console.error('Error en login:', err);
    return { user: null, error: err instanceof Error ? err.message : 'Error desconocido' };
  }
}

// Función para crear una cookie de sesión (simplificada)
export function createSessionCookie(user) {
  // Crear un objeto de sesión simple
  const session = {
    id: user.id,
    email: user.email,
    name: user.name || 'Admin',
    timestamp: new Date().toISOString()
  };

  // Convertir a base64 para un almacenamiento simple
  const sessionValue = Buffer.from(JSON.stringify(session)).toString('base64');
  
  // Configurar la cookie con opciones básicas
  return `${SESSION_COOKIE_NAME}=${sessionValue}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`;
}

// Función para verificar la autenticación
export async function checkAuth(request) {
  try {
    // Obtener las cookies de la solicitud
    const cookies = parse(request.headers.get('Cookie') || '');
    const sessionCookie = cookies[SESSION_COOKIE_NAME];

    // Si no hay cookie de sesión, redirigir al login
    if (!sessionCookie) {
      return { user: null, redirect: true };
    }

    // Decodificar la cookie de sesión
    const sessionStr = Buffer.from(sessionCookie, 'base64').toString('utf8');
    const session = JSON.parse(sessionStr);

    // Verificar que la sesión tenga los datos necesarios
    if (!session.id || !session.email) {
      return { user: null, redirect: true };
    }

    // Devolver el usuario de la sesión (sin verificar en base de datos para simplicidad)
    return { user: session, redirect: false };
  } catch (err) {
    console.error('Error al verificar autenticación:', err);
    return { user: null, redirect: true };
  }
}

// Middleware para proteger rutas (simplificado)
export async function authMiddleware(request) {
  const { user, redirect } = await checkAuth(request);

  // Si no hay usuario y se requiere redirección, redirigir al login
  if (!user && redirect) {
    return new Response('', {
      status: 302,
      headers: {
        'Location': '/admin/login'
      }
    });
  }

  // Si hay usuario, establecerlo en locals para que esté disponible en las páginas
  request.locals = request.locals || {};
  request.locals.user = user;
  return null; // Continuar con la solicitud
}
