-- Schema para la base de datos de Casa Biker en Supabase

-- Tabla de categorías
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de productos
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image TEXT,
  featured BOOLEAN DEFAULT false,
  details TEXT,
  discount INTEGER,
  category_id TEXT REFERENCES categories(id) ON DELETE CASCADE,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar categorías iniciales basadas en el catálogo actual
INSERT INTO categories (id, name, description, icon) VALUES
('cascos', 'Cascos', 'Protección y estilo para tu cabeza con los mejores cascos del mercado', 'hard-hat'),
('ropa', 'Ropa', 'Equipamiento de protección y ropa para motociclistas', 'tshirt'),
('accesorios', 'Accesorios', 'Complementos y accesorios para tu moto', 'motorcycle'),
('mejoras', 'Mejoras', 'Mejoras y actualizaciones para tu moto', 'cogs'),
('mantenimiento', 'Mantenimiento', 'Productos para el mantenimiento de tu moto', 'tools'),
('modelos', 'Regalos a Escala', 'Modelos a escala y coleccionables', 'gift');

-- Función para actualizar el timestamp de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar el timestamp en la tabla de productos
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Trigger para actualizar el timestamp en la tabla de categorías
CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON categories
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Políticas de seguridad (RLS)
-- Habilitar RLS en ambas tablas
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Crear políticas para permitir acceso de lectura a todos
CREATE POLICY "Permitir lectura pública de categorías" ON categories
FOR SELECT USING (true);

CREATE POLICY "Permitir lectura pública de productos" ON products
FOR SELECT USING (true);

-- Crear políticas para permitir escritura solo a usuarios autenticados
CREATE POLICY "Permitir escritura de categorías a usuarios autenticados" ON categories
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Permitir escritura de productos a usuarios autenticados" ON products
FOR ALL USING (auth.role() = 'authenticated');

-- Índices para mejorar el rendimiento
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_featured ON products(featured);
