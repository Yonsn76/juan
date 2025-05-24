/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Definir el tipo de usuario
interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

// Extender el tipo Locals de Astro para incluir el usuario
declare namespace App {
  interface Locals {
    user?: User;
  }
}