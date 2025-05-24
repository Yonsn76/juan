import { createClient } from '@supabase/supabase-js';

// Credenciales de Supabase directamente en el código
const supabaseUrl = 'https://cnrhqbbquymnlquuwkbh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNucmhxYmJxdXltbmxxdXV3a2JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NDYwNDksImV4cCI6MjA2MzUyMjA0OX0.uWq6EPQrMOq1vBif4flJVnjHhvKjIlbB-nrnxgRzCbY';

// Crear el cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función para probar la conexión
async function testConnection() {
  try {
    // Intentar obtener las categorías
    const { data, error } = await supabase
      .from('categories')
      .select('*');
    
    if (error) {
      console.error('Error al conectar con Supabase:', error);
    } else {
      console.log('Conexión exitosa con Supabase');
      console.log('Categorías:', data);
    }
  } catch (err) {
    console.error('Error inesperado:', err);
  }
}

// Ejecutar la prueba
testConnection();
