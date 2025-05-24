// Usar require en lugar de import para Node.js
const { createClient } = require('@supabase/supabase-js');

// Credenciales de Supabase
const supabaseUrl = 'https://cnrhqbbquymnlquuwkbh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNucmhxYmJxdXltbmxxdXV3a2JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NDYwNDksImV4cCI6MjA2MzUyMjA0OX0.uWq6EPQrMOq1vBif4flJVnjHhvKjIlbB-nrnxgRzCbY';

// Crear cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función para verificar y crear el bucket
async function checkAndCreateBucket() {
  try {
    console.log('Verificando buckets existentes...');

    // Listar buckets existentes
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
      console.error('Error al listar buckets:', listError);
      return;
    }

    console.log('Buckets existentes:', buckets);

    // Verificar si el bucket 'products' existe
    const productsBucket = buckets.find(bucket => bucket.name === 'products');

    if (productsBucket) {
      console.log('El bucket "products" ya existe:', productsBucket);
    } else {
      console.log('El bucket "products" no existe, creándolo...');

      // Crear el bucket 'products'
      const { data: newBucket, error: createError } = await supabase.storage.createBucket('products', {
        public: true,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
      });

      if (createError) {
        console.error('Error al crear el bucket:', createError);
      } else {
        console.log('Bucket "products" creado correctamente:', newBucket);
      }
    }

    // Verificar políticas de acceso
    console.log('Verificando políticas de acceso...');

    // Intentar subir una imagen de prueba
    const testFile = new Blob(['test'], { type: 'text/plain' });
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('products')
      .upload('test.txt', testFile, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      console.error('Error al subir archivo de prueba:', uploadError);
    } else {
      console.log('Archivo de prueba subido correctamente:', uploadData);

      // Obtener URL pública
      const { data: publicUrlData } = supabase.storage
        .from('products')
        .getPublicUrl('test.txt');

      console.log('URL pública del archivo de prueba:', publicUrlData);

      // Eliminar archivo de prueba
      const { error: deleteError } = await supabase.storage
        .from('products')
        .remove(['test.txt']);

      if (deleteError) {
        console.error('Error al eliminar archivo de prueba:', deleteError);
      } else {
        console.log('Archivo de prueba eliminado correctamente');
      }
    }
  } catch (error) {
    console.error('Error inesperado:', error);
  }
}

// Ejecutar la función
checkAndCreateBucket();
