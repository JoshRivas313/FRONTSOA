import { useState } from 'react';
import Alcico from '../../assets/Administrador/GestionAlm/Alcico.svg';
import Sum from '../../assets/Administrador/GestionAlm/sum.svg';
import Edit from '../../assets/Administrador/GestionAlm/Edit.svg';
import Pif from '../../assets/Administrador/GestionAlm/Pif.svg';
import Guda from '../../assets/Administrador/GestionAlm/Guda.svg';

interface AdmGestProps {
  onNavigateToAdd?: () => void;
  newWarehouses?: any[];
  onDeleteWarehouse?: (id: number) => void;
}

const AdmGest = ({ onNavigateToAdd, newWarehouses = [], onDeleteWarehouse }: AdmGestProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [locationFilter, setLocationFilter] = useState<string>('Todos');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [warehouseToDelete, setWarehouseToDelete] = useState<any>(null);

  // Datos de almacenes (ahora con useState para poder modificarlos)
  const initialWarehouses = [
    { id: 1, code: 'Alc1', name: 'Almacen A', location: 'Villa Maria', manager: 'Efrain Lopez', phone: '984657124', capacity: '550 m²', status: 'Activo' },
    { id: 2, code: 'Alc2', name: 'Almacen B', location: 'Bellamar', manager: 'Ismael Perez', phone: '9672849741', capacity: '420 m²', status: 'Activo' },
    { id: 3, code: 'Alc3', name: 'Almacen C', location: 'Pepao', manager: 'Diego Paz', phone: '942197454', capacity: '320 m²', status: 'Activo' },
    { id: 4, code: 'Alc4', name: 'Almacen D', location: 'Villa España', manager: 'Mar Liezo', phone: '952389764', capacity: '420 m²', status: 'Inactivo' }
  ];

  const [warehouses, setWarehouses] = useState([...initialWarehouses, ...newWarehouses]);

  // Filtrar almacenes
  const filteredWarehouses = warehouses.filter(warehouse => {
    const matchesSearch = warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          warehouse.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || warehouse.status === statusFilter;
    const matchesLocation = locationFilter === 'Todos' || warehouse.location === locationFilter;
    return matchesSearch && matchesStatus && matchesLocation;
  });

  // Funciones para manejar la edición
  const handleEdit = (warehouse: any) => {
    setEditingWarehouse({ ...warehouse });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    // Actualizar el almacén en el array de warehouses
    setWarehouses(warehouses.map(warehouse => 
      warehouse.id === editingWarehouse.id ? editingWarehouse : warehouse
    ));
    setShowEditModal(false);
    setEditingWarehouse(null);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingWarehouse(null);
  };

  // Funciones para manejar la eliminación
  const handleDeleteClick = (warehouse: any) => {
    setWarehouseToDelete(warehouse);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    // Eliminar de la lista local
    setWarehouses(warehouses.filter(warehouse => warehouse.id !== warehouseToDelete.id));
    
    // Si es un almacén agregado (id > 4), también eliminarlo del estado global
    if (warehouseToDelete.id > 4 && onDeleteWarehouse) {
      onDeleteWarehouse(warehouseToDelete.id);
    }
    
    setShowDeleteModal(false);
    setWarehouseToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setWarehouseToDelete(null);
  };

  return (
    <div className="w-full h-full px-6 pt-3 pb-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 max-w-6xl">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold text-black">Almacenes</h1>
          <img src={Alcico} alt="Almacen" className="w-16 h-16 ml-4" />
        </div>
        <button 
          onClick={onNavigateToAdd}
          className="px-6 py-2 bg-blue-200 text-gray-800 rounded-lg flex items-center gap-2 hover:bg-blue-300 transition font-semibold"
        >
          Nuevo Almacen
          <img src={Sum} alt="Agregar" className="w-5 h-5" />
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6 max-w-6xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar nombre o codigo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pr-12 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <div className="relative">
          <button 
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            className="px-6 py-2 bg-blue-200 text-gray-800 rounded-lg flex items-center gap-2 hover:bg-blue-300 transition"
          >
            {statusFilter === 'Todos' ? 'Estado' : statusFilter}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showStatusDropdown && (
            <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <button
                onClick={() => {
                  setStatusFilter('Todos');
                  setShowStatusDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg"
              >
                Todos
              </button>
              <button
                onClick={() => {
                  setStatusFilter('Activo');
                  setShowStatusDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Activo
              </button>
              <button
                onClick={() => {
                  setStatusFilter('Inactivo');
                  setShowStatusDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 last:rounded-b-lg"
              >
                Inactivo
              </button>
            </div>
          )}
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            className="px-6 py-2 bg-blue-200 text-gray-800 rounded-lg flex items-center gap-2 hover:bg-blue-300 transition"
          >
            {locationFilter === 'Todos' ? 'Ubicacion' : locationFilter}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showLocationDropdown && (
            <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <button
                onClick={() => {
                  setLocationFilter('Todos');
                  setShowLocationDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg"
              >
                Todos
              </button>
              <button
                onClick={() => {
                  setLocationFilter('Villa Maria');
                  setShowLocationDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Villa Maria
              </button>
              <button
                onClick={() => {
                  setLocationFilter('Bellamar');
                  setShowLocationDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Bellamar
              </button>
              <button
                onClick={() => {
                  setLocationFilter('Pepao');
                  setShowLocationDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Pepao
              </button>
              <button
                onClick={() => {
                  setLocationFilter('Villa España');
                  setShowLocationDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 last:rounded-b-lg"
              >
                Villa España
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow overflow-hidden max-w-[95%]">
        <table className="w-full">
          <thead className="bg-white border-b-2 border-gray-200">
            <tr>
              <th className="text-left py-3 pl-6 pr-5 font-bold text-gray-800">Codigo</th>
              <th className="text-left py-3 pl-6 pr-5 font-bold text-gray-800">Nombre</th>
              <th className="text-left py-3 pl-6 pr-5 font-bold text-gray-800">Ubicacion</th>
              <th className="text-left py-3 pl-6 pr-5 font-bold text-gray-800">Persona Responsable</th>
              <th className="text-left py-3 pl-6 pr-5 font-bold text-gray-800">Telefono</th>
              <th className="text-left py-3 pl-6 pr-5 font-bold text-gray-800">Capacidad</th>
              <th className="text-left py-3 pl-6 pr-5 font-bold text-gray-800">Estado</th>
              <th className="text-left py-3 pl-6 pr-5 font-bold text-gray-800"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredWarehouses.length > 0 ? (
              filteredWarehouses.map((warehouse) => (
                <tr key={warehouse.id} className="hover:bg-gray-50">
                  <td className="py-4 pl-6 pr-5 text-gray-700 font-semibold">{warehouse.code}</td>
                  <td className="py-4 pl-6 pr-5 text-gray-700">{warehouse.name}</td>
                  <td className="py-4 pl-6 pr-5 text-gray-700">{warehouse.location}</td>
                  <td className="py-4 pl-6 pr-5 text-gray-700">{warehouse.manager}</td>
                  <td className="py-4 pl-6 pr-5 text-gray-700">{warehouse.phone}</td>
                  <td className="py-4 pl-6 pr-5 text-gray-700">{warehouse.capacity}</td>
                  <td className="py-4 pl-6 pr-5">
                    <span className={`px-3 py-1 rounded text-sm font-medium ${
                      warehouse.status === 'Activo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {warehouse.status}
                    </span>
                  </td>
                  <td className="py-4 pl-6 pr-5">
                    <div className="flex gap-2">
                      {/* Botón Editar */}
                      <button 
                        onClick={() => handleEdit(warehouse)}
                        className="p-1.5 hover:bg-gray-100 rounded transition"
                      >
                        <img src={Edit} alt="Editar" className="w-5 h-5" />
                      </button>
                      {/* Botón Copiar */}
                      <button className="p-1.5 hover:bg-gray-100 rounded transition">
                        <img src={Pif} alt="Copiar" className="w-5 h-5" />
                      </button>
                      {/* Botón Eliminar */}
                      <button 
                        onClick={() => handleDeleteClick(warehouse)}
                        className="p-1.5 hover:bg-red-50 rounded transition"
                      >
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-500">
                  No se encontraron almacenes que coincidan con la búsqueda
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Edición */}
      {showEditModal && editingWarehouse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300">
          <div 
            className="fixed right-0 top-0 h-full bg-white shadow-2xl w-full max-w-md transform transition-transform duration-300 ease-out translate-x-0"
            style={{ animation: 'slideInFromRight 0.3s ease-out' }}
          >
            <div className="p-8 h-full overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Editar Almacen</h2>
              
              <div className="space-y-4">
                {/* Código */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Codigo</label>
                  <input
                    type="text"
                    value={editingWarehouse.code}
                    onChange={(e) => setEditingWarehouse({ ...editingWarehouse, code: e.target.value })}
                    className="w-full px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    value={editingWarehouse.name}
                    onChange={(e) => setEditingWarehouse({ ...editingWarehouse, name: e.target.value })}
                    className="w-full px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Ubicación */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ubicacion</label>
                  <input
                    type="text"
                    value={editingWarehouse.location}
                    onChange={(e) => setEditingWarehouse({ ...editingWarehouse, location: e.target.value })}
                    className="w-full px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Persona Responsable */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Persona Responsable</label>
                  <input
                    type="text"
                    value={editingWarehouse.manager}
                    onChange={(e) => setEditingWarehouse({ ...editingWarehouse, manager: e.target.value })}
                    className="w-full px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
                  <input
                    type="text"
                    value={editingWarehouse.phone}
                    onChange={(e) => setEditingWarehouse({ ...editingWarehouse, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Capacidad */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Capacidad</label>
                  <input
                    type="text"
                    value={editingWarehouse.capacity}
                    onChange={(e) => setEditingWarehouse({ ...editingWarehouse, capacity: e.target.value })}
                    className="w-full px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Estado */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <select
                    value={editingWarehouse.status}
                    onChange={(e) => setEditingWarehouse({ ...editingWarehouse, status: e.target.value })}
                    className="w-full px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={handleCancelEdit}
                  className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
                >
                  Cancelar
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                >
                  Guardar
                  <img src={Guda} alt="Guardar" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {showDeleteModal && warehouseToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-red-100 rounded-lg shadow-xl p-8 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">¿Estas Seguro de Elimarlo?</h2>
            
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleConfirmDelete}
                className="px-8 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-50 transition font-semibold border border-gray-300"
              >
                SI
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-8 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-50 transition font-semibold border border-gray-300"
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Estilos CSS para la animación */}
      <style>{`
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AdmGest;
