// Importar la biblioteca de Supabase
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Credenciales de Supabase tomadas de variables de entorno
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

// Crear cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función para listar los buckets existentes
async function listBuckets() {
  try {
    console.log('Listando buckets existentes...');

    // Listar buckets
    const { data, error } = await supabase.storage.listBuckets();

    if (error) {
      console.error('Error al listar buckets:', error);
    } else {
      console.log('Buckets existentes:', data);
    }

    return { data, error };
  } catch (error) {
    console.error('Error inesperado al listar buckets:', error);
    return { data: null, error };
  }
}

// Función para crear el bucket
async function createBucket() {
  try {
    console.log('Verificando si el bucket "products" ya existe...');

    // Primero, listar los buckets existentes
    const { data: buckets, error: listError } = await listBuckets();

    if (listError) {
      console.error('No se pudo verificar si el bucket ya existe.');
      return;
    }

    // Verificar si el bucket ya existe
    const productsBucket = buckets.find(bucket => bucket.name === 'products');

    if (productsBucket) {
      console.log('El bucket "products" ya existe, no es necesario crearlo.');
      return;
    }

    console.log('Creando bucket "products"...');

    // Crear el bucket
    const { data, error } = await supabase.storage.createBucket('products', {
      public: true
    });

    if (error) {
      console.error('Error al crear el bucket:', error);
    } else {
      console.log('Bucket creado correctamente:', data);
    }
  } catch (error) {
    console.error('Error inesperado al crear bucket:', error);
  }
}

// Ejecutar la función y luego salir
createBucket().then(() => {
  console.log('Proceso completado.');
  process.exit(0);
}).catch(error => {
  console.error('Error en el proceso principal:', error);
  process.exit(1);
});
