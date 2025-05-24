-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insertar usuario administrador por defecto
INSERT INTO users (email, password, name, role)
VALUES ('admin@casabiker.com', 'admin123', 'Administrador', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insertar usuario normal por defecto
INSERT INTO users (email, password, name, role)
VALUES ('usuario@casabiker.com', 'usuario123', 'Usuario Normal', 'user')
ON CONFLICT (email) DO NOTHING;

-- Crear índice para búsquedas por email
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Nota: En una aplicación real, las contraseñas deberían estar hasheadas.
-- Este es un ejemplo simplificado para fines educativos.
