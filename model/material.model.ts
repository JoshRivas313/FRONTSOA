// Modelo para un Tipo de Material (GET /tipo-materiales)
export interface MaterialType {
  id: number;
  name: string; // Ej: "Consumible", "Herramienta", "Repuesto"
}

// Modelo completo de un Material o Producto (GET /materiales)
export interface Material {
  id: number;
  name: string;
  code: string;
  description: string;
  // Relación con MaterialType: enviada como ID en la creación, puede incluir el objeto en el GET
  materialTypeId: number; 
  materialType?: MaterialType; 
  
  imageUrl?: string; // Para la imagen del producto
}

// Modelo para el cuerpo de la solicitud de creación de material (POST /materiales)
export interface MaterialCreatePayload {
    name: string;
    code: string;
    description?: string;
    materialTypeId: number;
    // stock no se envía aquí si lo maneja el Microservicio ALMACÉN
    imageUrl?: string; 
}