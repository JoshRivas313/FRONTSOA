// Modelo para un Almacén (GET /almacenes)
export interface Warehouse {
  id: number;
  name: string;
  location: string; // Ej: "Planta Baja", "Bodega B"
  capacity?: number; // Capacidad opcional
}

// Modelo de Inventario: Stock de un Material en un Almacén (GET /almacen-material/almacen/{idA})
export interface WarehouseMaterial {
  id: number;
  warehouseId: number;
  materialId: number;
  stock: number; // Cantidad actual
  
  // Puedes incrustar la información del material para la tabla de inventario
  material?: Material; 
}

// Modelo para la solicitud de Creación/Actualización de stock (POST /almacen-material)
export interface WarehouseMaterialPayload {
  warehouseId: number;
  materialId: number;
  stock: number; // La cantidad de stock a establecer/actualizar
}