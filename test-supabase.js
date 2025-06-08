import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Credenciales de Supabase desde variables de entorno
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

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
