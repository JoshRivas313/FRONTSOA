import { useState } from 'react';
import InvIcon from '../../assets/Almacenero/Inventario/InvIcon.svg';
import Lupa from '../../assets/Administrador/GestionAlm/lupita.svg';
import Ex from '../../assets/Almacenero/Inventario/Ex.svg';
import Pf from '../../assets/Almacenero/Inventario/Pf.svg';
import flecabajo from '../../assets/Almacenero/Inventario/flecabajo.svg';
import mt1 from '../../assets/Almacenero/Inventario/Vista Previa/mt1.svg';
import mt2 from '../../assets/Almacenero/Inventario/Vista Previa/mt2.svg';
import mt3 from '../../assets/Almacenero/Inventario/Vista Previa/mt3.svg';
import mt4 from '../../assets/Almacenero/Inventario/Vista Previa/mt4.svg';
import mt5 from '../../assets/Almacenero/Inventario/Vista Previa/mt5.svg';
import mt6 from '../../assets/Almacenero/Inventario/Vista Previa/mt6.svg';

interface Material {
  id: number;
  imagen: any;
  nombre: string;
  categoria: string;
  ubicacion: string;
  stock: number;
  minimo: number;
  estado: string;
  criticidad: 'Alta' | 'Media' | 'Baja';
}

export default function AlmcInv() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('all');
  const [filterUbicacion, setFilterUbicacion] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const materials: Material[] = [
    { id: 1, imagen: mt1, nombre: 'Cementerio Tipo I', categoria: 'Cemento', ubicacion: 'Almacen A', stock: 150, minimo: 100, estado: 'En stock', criticidad: 'Alta' },
    { id: 2, imagen: mt2, nombre: 'Ladrillo de Arcilla', categoria: 'Ladrillo', ubicacion: 'Almacen B', stock: 110, minimo: 90, estado: 'En stock', criticidad: 'Media' },
    { id: 3, imagen: mt3, nombre: 'Arena Fina', categoria: 'Agregados', ubicacion: 'Almacen B', stock: 80, minimo: 70, estado: 'En stock', criticidad: 'Baja' },
    { id: 4, imagen: mt4, nombre: 'Acero de Refuerzo', categoria: 'Acero', ubicacion: 'Almacen A', stock: 150, minimo: 110, estado: 'En stock', criticidad: 'Alta' },
    { id: 5, imagen: mt5, nombre: 'Madera de Pino 2 x 4', categoria: 'Madera', ubicacion: 'Almacen C', stock: 140, minimo: 120, estado: 'En stock', criticidad: 'Media' },
    { id: 6, imagen: mt6, nombre: 'Clavo 2', categoria: 'Ferreteria', ubicacion: 'Almacen A', stock: 70, minimo: 60, estado: 'En stock', criticidad: 'Baja' },
  ];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = filterEstado === 'all' || material.criticidad === filterEstado;
    const matchesUbicacion = filterUbicacion === 'all' || material.ubicacion === filterUbicacion;
    return matchesSearch && matchesEstado && matchesUbicacion;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMaterials = filteredMaterials.slice(startIndex, startIndex + itemsPerPage);

  const getCriticidadColor = (criticidad: string) => {
    switch (criticidad) {
      case 'Alta':
        return 'bg-green-500 text-white';
      case 'Media':
        return 'bg-yellow-400 text-black';
      case 'Baja':
        return 'bg-orange-400 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full h-full px-6 pt-3 pb-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-4xl font-bold text-black">INVENTARIO</h1>
        <img src={InvIcon} alt="Inventario" className="w-16 h-16 ml-4" />
      </div>

      {/* Buscador y Filtros */}
      <div className="mb-4">
        {/* Buscador */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Buscar nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-3 bg-gray-200 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
          <img src={Lupa} alt="Buscar" className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5" />
        </div>

        {/* Filtros */}
        <div className="flex gap-4">
          <div className="relative">
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="appearance-none pl-2 pr-8 py-2 bg-blue-200 border-none rounded-lg focus:outline-none cursor-pointer text-sm font-medium"
            >
              <option value="all">Estado</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
            <img src={flecabajo} alt="Flecha" className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={filterUbicacion}
              onChange={(e) => setFilterUbicacion(e.target.value)}
              className="appearance-none pl-2 pr-8 py-2 bg-blue-200 border-none rounded-lg focus:outline-none cursor-pointer text-sm font-medium"
            >
              <option value="all">Ubicacion</option>
              <option value="Almacen A">Almacen A</option>
              <option value="Almacen B">Almacen B</option>
              <option value="Almacen C">Almacen C</option>
            </select>
            <img src={flecabajo} alt="Flecha" className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Tabla de inventario */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-white border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-black">Vista Previa</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-black">Material</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-black">Categoria</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-black">Ubicacion</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-black">Stock</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-black">Minimo</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-black">Estado</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-black">Criticidad</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedMaterials.map((material) => (
                <tr key={material.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 whitespace-nowrap">
                    <div className="w-16 h-16 rounded flex items-center justify-center p-2">
                      <img src={material.imagen} alt={material.nombre} className="w-full h-full object-contain" />
                    </div>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{material.nombre}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{material.categoria}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{material.ubicacion}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900 font-semibold">{material.stock}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{material.minimo}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{material.estado}</td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className={`px-4 py-1 inline-flex text-sm font-semibold rounded-full ${getCriticidadColor(material.criticidad)}`}>
                      {material.criticidad}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedMaterials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron materiales</p>
          </div>
        )}
      </div>

      {/* Paginación y Botones de Exportar */}
      <div className="mt-6 flex items-center justify-between">
        {/* Paginación */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ‹
          </button>
          
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-3 py-1 rounded ${
                currentPage === pageNum
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {pageNum}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, 10))}
            disabled={currentPage >= 10}
            className="px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ›
          </button>
        </div>

        {/* Botones de Exportar */}
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-sm font-medium">Exportar EXCEL</span>
            <img src={Ex} alt="Excel" className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <span className="text-sm font-medium">Exportar PDF</span>
            <img src={Pf} alt="PDF" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
