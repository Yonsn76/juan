import { createClient } from '@supabase/supabase-js';

// Crear cliente de Supabase
const supabaseUrl = 'https://cnrhqbbquymnlquuwkbh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNucmhxYmJxdXltbmxxdXV3a2JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NDYwNDksImV4cCI6MjA2MzUyMjA0OX0.uWq6EPQrMOq1vBif4flJVnjHhvKjIlbB-nrnxgRzCbY';
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
