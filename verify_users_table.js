import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Crear cliente de Supabase usando variables de entorno
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verifyUsersTable() {
  try {
    console.log('Verificando tabla users...');
    
    // Verificar si la tabla users existe
    const { data: tablesData, error: tablesError } = await supabase
      .from('users')
      .select('count(*)', { count: 'exact', head: true });
    
    if (tablesError) {
      console.error('Error al verificar tabla users:', tablesError);
    } else {
      console.log('Tabla users existe, contiene:', tablesData);
    }
    
    // Obtener todos los usuarios
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*');
    
    if (usersError) {
      console.error('Error al obtener usuarios:', usersError);
    } else {
      console.log('Usuarios encontrados:', users);
    }
  } catch (err) {
    console.error('Error inesperado:', err);
  }
}

verifyUsersTable();
