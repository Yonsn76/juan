export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  featured: boolean;
  details: string;
  category_id: string;
  discount?: number; // Porcentaje de descuento (opcional)
  categories?: {
    name: string;
  };
}


export interface CategoryData {
  category: string;
  description: string;
  products: Product[];
}

export interface CatalogData {
  [key: string]: CategoryData;
}
