// src/models/IAlmacen.ts

// ----------------------------------------------------
// Almacén
// ----------------------------------------------------

export interface AlmacenRequest {
  nombre: string;
  codigo: string;
  ubicacion: string; 
  responsableId: number; // ID del usuario Almacenero
  capacidad: number;
  telefono: string;
  activo: boolean; 
}

export interface AlmacenResponse extends AlmacenRequest {
  id: number;
  responsableNombre: string; 
}

// ----------------------------------------------------
// Inventario (AlmacenMaterial)
// ----------------------------------------------------

export interface AlmacenMaterialRequest {
  idAlmacen: number;
  idMaterial: number;
  cantidad: number;
  ubicacionDetallada?: string;
}

export interface AlmacenMaterialResponse extends AlmacenMaterialRequest {
  id: {
    idAlmacen: number;
    idMaterial: number;
  };
  nombreMaterial: string;
  nombreAlmacen: string;
}

// ----------------------------------------------------
// Movimientos
// ----------------------------------------------------

export type TipoMovimiento = 'ENTRADA' | 'SALIDA' | 'TRANSFERENCIA';

export interface MovimientoRequest {
  idAlmacen: number;
  idMaterial: number;
  tipo: TipoMovimiento;
  cantidad: number;
  fecha: Date | string;
  usuarioId: number; 
  notas?: string;
}

export interface MovimientoResponse extends MovimientoRequest {
  id: number;
  nombreUsuario: string; 
  nombreMaterial: string;
}