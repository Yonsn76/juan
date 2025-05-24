import { supabase } from './supabase';

/**
 * Intenta autenticar a un usuario con email y contraseña
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<{user: Object|null, error: string|null}>} - Usuario autenticado o error
 */
export async function login(email, password) {
  try {
    console.log('Intentando iniciar sesión con:', { email });

    // Primero, verificar si el usuario existe por email
    console.log('Verificando si el usuario existe...');
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (userError) {
      console.error('Error al buscar usuario:', userError);
      return { user: null, error: 'Error al buscar usuario: ' + userError.message };
    }

    console.log('Resultado de búsqueda de usuario:', userData ? 'Usuario encontrado' : 'Usuario no encontrado');

    // Si no se encuentra el usuario, devolver error
    if (!userData) {
      return { user: null, error: 'Usuario no encontrado' };
    }

    // Verificar la contraseña
    console.log('Verificando contraseña...');
    if (userData.password !== password) {
      console.log('Contraseña incorrecta');
      return { user: null, error: 'Contraseña incorrecta' };
    }

    console.log('Inicio de sesión exitoso para:', userData.email);

    // No devolver la contraseña al cliente
    const { password: _, ...userWithoutPassword } = userData;

    return { user: userWithoutPassword, error: null };
  } catch (err) {
    console.error('Error inesperado al iniciar sesión:', err);
    return { user: null, error: 'Error al iniciar sesión' };
  }
}

/**
 * Cierra la sesión del usuario actual
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
export async function logout() {
  // En una implementación real con supabase auth, usaríamos:
  // return await supabase.auth.signOut();

  // Para nuestro ejemplo simplificado, solo devolvemos éxito
  return { success: true, error: null };
}

/**
 * Verifica si hay un usuario autenticado en la sesión
 * @param {Object} request - Objeto de solicitud de Astro
 * @returns {Promise<{user: Object|null, redirect: boolean}>}
 */
export async function checkAuth(request) {
  try {
    console.log('Verificando autenticación...');

    // Obtener la cookie de sesión
    const cookies = request.headers.get('cookie') || '';
    console.log('Cookies recibidas:', cookies);

    const sessionCookie = cookies
      .split(';')
      .find(c => c.trim().startsWith('session='));

    if (!sessionCookie) {
      console.log('No se encontró cookie de sesión');
      return { user: null, redirect: true };
    }

    console.log('Cookie de sesión encontrada:', sessionCookie);

    try {
      // Decodificar la cookie (en formato JSON)
      const sessionValue = sessionCookie.split('=')[1].trim();
      console.log('Valor de la cookie:', sessionValue);

      const sessionData = decodeURIComponent(sessionValue);
      console.log('Datos decodificados:', sessionData);

      const session = JSON.parse(sessionData);
      console.log('Sesión parseada:', session);

      if (!session || !session.userId) {
        console.log('Sesión inválida: no contiene userId');
        return { user: null, redirect: true };
      }

      console.log('ID de usuario en sesión:', session.userId);

      // Verificar que el usuario existe en la base de datos
      const { data: user, error } = await supabase
        .from('users')
        .select('id, email, name, role, created_at, updated_at')
        .eq('id', session.userId)
        .single();

      if (error) {
        console.error('Error al obtener usuario de la base de datos:', error);
        return { user: null, redirect: true };
      }

      if (!user) {
        console.log('Usuario no encontrado en la base de datos');
        return { user: null, redirect: true };
      }

      console.log('Usuario autenticado:', user.email);
      return { user, redirect: false };
    } catch (parseErr) {
      console.error('Error al parsear la cookie de sesión:', parseErr);
      return { user: null, redirect: true };
    }
  } catch (err) {
    console.error('Error al verificar autenticación:', err);
    return { user: null, redirect: true };
  }
}

/**
 * Crea una cookie de sesión para el usuario
 * @param {Object} user - Datos del usuario
 * @returns {string} - String de cookie para establecer en la respuesta
 */
export function createSessionCookie(user) {
  try {
    console.log('Creando cookie de sesión para usuario:', user.id);

    const session = {
      userId: user.id,
      role: user.role,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 horas
    };

    const sessionJson = JSON.stringify(session);
    console.log('Datos de sesión:', sessionJson);

    const cookieValue = encodeURIComponent(sessionJson);
    const cookie = `session=${cookieValue}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${24 * 60 * 60}`;

    console.log('Cookie generada correctamente');
    return cookie;
  } catch (err) {
    console.error('Error al crear cookie de sesión:', err);
    // Devolver una cookie básica en caso de error
    return `session=error; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600`;
  }
}

/**
 * Crea una cookie para eliminar la sesión
 * @returns {string} - String de cookie para establecer en la respuesta
 */
export function createLogoutCookie() {
  return 'session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0';
}
