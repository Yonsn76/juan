import { createClient } from '@supabase/supabase-js';

// Credenciales obtenidas de variables de entorno para mayor seguridad
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Crear el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Funciones para interactuar con la tabla de productos
export const productService = {
  // Obtener todos los productos
  async getAllProducts() {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(name)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Obtener productos por categoría
  async getProductsByCategory(categoryId) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(name)
      `)
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Obtener un producto por ID
  async getProductById(id) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(name)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Crear un nuevo producto
  async createProduct(product) {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select();

    if (error) throw error;
    return data[0];
  },

  // Actualizar un producto existente
  async updateProduct(id, product) {
    const { data, error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  },

  // Eliminar un producto
  async deleteProduct(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  // Obtener productos destacados
  async getFeaturedProducts() {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(name)
      `)
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};

// Funciones para interactuar con la tabla de categorías
export const categoryService = {
  // Obtener todas las categorías
  async getAllCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Obtener una categoría por ID
  async getCategoryById(id) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Crear una nueva categoría
  async createCategory(category) {
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select();

    if (error) throw error;
    return data[0];
  },

  // Actualizar una categoría existente
  async updateCategory(id, category) {
    const { data, error } = await supabase
      .from('categories')
      .update(category)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  },

  // Eliminar una categoría
  async deleteCategory(id) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  // Contar productos por categoría
  async getProductCountByCategory() {
    const { data, error } = await supabase
      .from('products')
      .select('category_id, count')
      .group('category_id');

    if (error) throw error;
    return data;
  }
};

// Funciones para manejar la autenticación
export const authService = {
  // Iniciar sesión con correo y contraseña
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  },

  // Cerrar sesión
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  },

  // Obtener el usuario actual
  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },

  // Verificar si el usuario está autenticado
  async isAuthenticated() {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  }
};

// Funciones para manejar el almacenamiento de imágenes
export const storageService = {
  // Subir una imagen
  async uploadImage(file, path) {
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = `${path}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('products')
      .upload(filePath, file);

    if (error) throw error;

    // Obtener la URL pública de la imagen
    const { data: publicUrlData } = supabase.storage
      .from('products')
      .getPublicUrl(filePath);

    return {
      path: filePath,
      url: publicUrlData.publicUrl
    };
  },

  // Eliminar una imagen
  async deleteImage(path) {
    const { error } = await supabase.storage
      .from('products')
      .remove([path]);

    if (error) throw error;
    return true;
  }
};
