import { useState } from 'react';
import Gestpr from '../../assets/Administrador/Inventario/Gestpr.svg';
import Excel from '../../assets/Administrador/Inventario/Excel.svg';
import Pdf from '../../assets/Administrador/Inventario/Pdf.svg';
import Mat1 from '../../assets/Administrador/Inventario/Mat1.svg';
import Mat2 from '../../assets/Administrador/Inventario/Mat2.svg';
import Mat3 from '../../assets/Administrador/Inventario/Mat3.svg';
import Mat4 from '../../assets/Administrador/Inventario/Mat4.svg';
import Mat5 from '../../assets/Administrador/Inventario/Mat5.svg';
import Mat6 from '../../assets/Administrador/Inventario/Mat6.svg';

const AdmInv = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSearch, setFilteredSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [locationFilter, setLocationFilter] = useState<string>('Todos');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  // Datos de materiales
  const materials = [
    { id: 1, name: 'Cemento', subtitle: 'Tipo I', category: 'Cemento', location: 'Almacen A', stock: 150, min: 100, status: 'En stock', criticality: 'Alta', image: Mat1 },
    { id: 2, name: 'Ladrillo de', subtitle: 'Arcilla', category: 'Ladrillo', location: 'Almacen B', stock: 110, min: 90, status: 'En stock', criticality: 'Media', image: Mat2 },
    { id: 3, name: 'Arena Fina', subtitle: '', category: 'Agregados', location: 'Almacen B', stock: 80, min: 70, status: 'Bajo stock', criticality: 'Baja', image: Mat3 },
    { id: 4, name: 'Acero de', subtitle: 'Refuerzo\n012mm', category: 'Acero', location: 'Almacen A', stock: 150, min: 110, status: 'En stock', criticality: 'Alta', image: Mat4 },
    { id: 5, name: 'Madera de', subtitle: 'Pino 2 x 4', category: 'Madera', location: 'Almacen C', stock: 140, min: 120, status: 'Bajo stock', criticality: 'Media', image: Mat5 },
    { id: 6, name: 'Clavo 2', subtitle: '', category: 'Ferreteria', location: 'Almacen A', stock: 0, min: 60, status: 'Sin stock', criticality: 'Baja', image: Mat6 }
  ];

  // Filtrar materiales
  const filteredMaterials = materials.filter(material => {
    const fullName = `${material.name} ${material.subtitle}`.toLowerCase();
    const matchesSearch = fullName.includes(filteredSearch.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || material.status === statusFilter;
    const matchesLocation = locationFilter === 'Todos' || material.location === locationFilter;
    return matchesSearch && matchesStatus && matchesLocation;
  });

  // Función para manejar la búsqueda
  const handleSearch = () => {
    setFilteredSearch(searchTerm);
  };

  // Función para manejar Enter en el input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Función para obtener el color del badge de estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En stock': return 'bg-gray-200 text-gray-700';
      case 'Bajo stock': return 'bg-yellow-200 text-yellow-800';
      case 'Sin stock': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  // Función para obtener el color del badge de criticidad
  const getCriticalityColor = (criticality: string) => {
    switch (criticality) {
      case 'Alta': return 'bg-green-200 text-green-800';
      case 'Media': return 'bg-yellow-200 text-yellow-800';
      case 'Baja': return 'bg-orange-200 text-orange-800';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="w-full h-full px-6 pt-3 pb-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-4xl font-bold text-black">Gestion de stock</h1>
        <img src={Gestpr} alt="Gestion de stock" className="w-16 h-16 ml-4" />
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <div className="relative max-w-2xl">
          <input
            type="text"
            placeholder="Buscar nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-2.5 pr-12 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:text-blue-600 transition"
          >
            <svg
              className="w-5 h-5 text-gray-500 hover:text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
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
                  setStatusFilter('En stock');
                  setShowStatusDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                En stock
              </button>
              <button
                onClick={() => {
                  setStatusFilter('Bajo stock');
                  setShowStatusDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Bajo stock
              </button>
              <button
                onClick={() => {
                  setStatusFilter('Sin stock');
                  setShowStatusDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 last:rounded-b-lg"
              >
                Sin stock
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
                  setLocationFilter('Almacen A');
                  setShowLocationDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Almacen A
              </button>
              <button
                onClick={() => {
                  setLocationFilter('Almacen B');
                  setShowLocationDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Almacen B
              </button>
              <button
                onClick={() => {
                  setLocationFilter('Almacen C');
                  setShowLocationDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 last:rounded-b-lg"
              >
                Almacen C
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
              <th className="text-left py-4 px-5 pl-8 font-bold text-gray-800">Vista Previa</th>
              <th className="text-left py-4 px-5 font-bold text-gray-800">Material</th>
              <th className="text-left py-4 px-5 font-bold text-gray-800">Categoria</th>
              <th className="text-left py-4 px-5 font-bold text-gray-800">Ubicacion</th>
              <th className="text-left py-4 px-5 font-bold text-gray-800">Stock</th>
              <th className="text-left py-4 px-5 font-bold text-gray-800">Minimo</th>
              <th className="text-left py-4 px-6 font-bold text-gray-800">Estado</th>
              <th className="text-left py-4 px-6 font-bold text-gray-800">Criticidad</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredMaterials.length > 0 ? (
              filteredMaterials.map((material) => (
                <tr key={material.id} className="hover:bg-gray-50">
                  <td className="py-4 px-5">
                    <div className="w-14 h-14 ml-8">
                      <img src={material.image} alt={material.name} className="w-14 h-14 rounded" />
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    {material.subtitle ? (
                      <div>
                        <p className="font-semibold">{material.name}</p>
                        {material.subtitle.split('\n').map((line, idx) => (
                          <p key={idx} className="text-sm text-gray-500">{line}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="font-semibold">{material.name}</p>
                    )}
                  </td>
                  <td className="py-4 px-5 text-gray-700">{material.category}</td>
                  <td className="py-4 px-5 text-gray-700">{material.location}</td>
                  <td className="py-4 px-5 text-gray-700">{material.stock}</td>
                  <td className="py-4 px-5 text-gray-700">{material.min}</td>
                  <td className="py-4 px-6">
                    <span className={`px-4 py-1.5 ${getStatusColor(material.status)} rounded text-sm font-medium`}>
                      {material.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-4 py-1.5 ${getCriticalityColor(material.criticality)} rounded text-sm font-semibold`}>
                      {material.criticality}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-500">
                  No se encontraron materiales que coincidan con la búsqueda
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación y botones de exportar */}
      <div className="mt-6 flex justify-between items-center max-w-[95%]">
        <div className="flex items-center gap-2">
          {/* Flecha izquierda */}
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Números de página */}
          {currentPage > 2 && (
            <>
              <button onClick={() => setCurrentPage(1)} className="px-3 py-1 rounded hover:bg-gray-200">1</button>
              {currentPage > 3 && <span className="px-2">...</span>}
            </>
          )}

          {[...Array(10)].map((_, idx) => {
            const pageNum = idx + 1;
            // Mostrar página actual y 1 antes y 1 después
            if (pageNum === currentPage || pageNum === currentPage - 1 || pageNum === currentPage + 1) {
              return (
                <button 
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)} 
                  className={`px-3 py-1 rounded ${currentPage === pageNum ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                >
                  {pageNum}
                </button>
              );
            }
            return null;
          })}

          {currentPage < 9 && (
            <>
              {currentPage < 8 && <span className="px-2">...</span>}
              <button onClick={() => setCurrentPage(10)} className="px-3 py-1 rounded hover:bg-gray-200">10</button>
            </>
          )}

          {/* Flecha derecha */}
          <button 
            onClick={() => setCurrentPage(prev => Math.min(10, prev + 1))}
            disabled={currentPage === 10}
            className={`px-3 py-1 rounded ${currentPage === 10 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex gap-3">
          <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition">
            Exportar EXCEL
            <img src={Excel} alt="Excel" className="w-5 h-5" />
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
            Exportar PDF
            <img src={Pdf} alt="PDF" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmInv;




