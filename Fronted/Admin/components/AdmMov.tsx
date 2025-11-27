import { useState } from 'react';
import MovimIcon from '../../assets/Administrador/Movin/Movim.svg';
import ExcelIcon from '../../assets/Administrador/Movin/Exc.svg';
import PdfIcon from '../../assets/Administrador/Movin/Paf.svg';

interface Movement {
  id: number;
  material: string;
  type: string;
  quantity: number;
  date: string;
  time: string;
  warehouseManager: string;
  warehouse: string;
}

const AdmMov = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const movements: Movement[] = [
    { id: 1, material: 'Cementerio Tipo I', type: 'Entrada', quantity: 100, date: '2024-01-15', time: '10:00', warehouseManager: 'Efrain Lopez', warehouse: 'Almacen A' },
    { id: 2, material: 'Ladrillo de Arcilla', type: 'Salida', quantity: 50, date: '2024-01-16', time: '14:30', warehouseManager: 'Ismael Perez', warehouse: 'Almacen B' },
    { id: 3, material: 'Arena Fina', type: 'Entrada', quantity: 75, date: '2024-01-17', time: '09:15', warehouseManager: 'Diego Paz', warehouse: 'Almacen C' },
    { id: 4, material: 'Acero de Refuerzo 012mm', type: 'Salida', quantity: 25, date: '2024-01-18', time: '11:45', warehouseManager: 'Ismael Perez', warehouse: 'Almacen B' },
    { id: 5, material: 'Madera de Pino 2 x 4', type: 'Entrada', quantity: 120, date: '2024-01-19', time: '16:00', warehouseManager: 'Efrain Lopez', warehouse: 'Almacen A' },
    { id: 6, material: 'Clavo 2', type: 'Salida', quantity: 40, date: '2024-01-20', time: '13:30', warehouseManager: 'Mar Liezo', warehouse: 'Almacen D' },
    { id: 7, material: 'Ladrillo de Arcilla', type: 'Entrada', quantity: 90, date: '2024-01-21', time: '08:50', warehouseManager: 'Diego Paz', warehouse: 'Almacen C' },
  ];

  return (
    <div className="w-full h-full bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <h1 className="text-5xl font-bold text-gray-900">Movimientos</h1>
        <img src={MovimIcon} alt="Movements" className="w-14 h-14" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 border-2 border-gray-100">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
              <th className="px-6 py-6 text-left text-sm font-bold text-gray-800">Material</th>
              <th className="px-6 py-6 text-left text-sm font-bold text-gray-800">Tipo de Movimiento</th>
              <th className="px-6 py-6 text-center text-sm font-bold text-gray-800">Cantidad</th>
              <th className="px-6 py-6 text-center text-sm font-bold text-gray-800">Fecha</th>
              <th className="px-6 py-6 text-center text-sm font-bold text-gray-800">Hora</th>
              <th className="px-6 py-6 text-left text-sm font-bold text-gray-800">Almacenero</th>
              <th className="px-6 py-6 text-left text-sm font-bold text-gray-800">Almacen</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement, index) => (
              <tr key={movement.id} className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-300 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
              }`}>
                <td className="px-6 py-5 text-sm font-semibold text-gray-900">{movement.material}</td>
                <td className="px-6 py-5">
                  <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${
                    movement.type === 'Entrada' 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    {movement.type}
                  </span>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-lg font-bold text-sm">
                    {movement.quantity}
                  </span>
                </td>
                <td className="px-6 py-5 text-center text-sm font-medium text-gray-700">{movement.date}</td>
                <td className="px-6 py-5 text-center">
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-lg font-medium text-sm">
                    {movement.time}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm font-medium text-gray-800">{movement.warehouseManager}</td>
                <td className="px-6 py-5">
                  <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-lg font-medium text-sm border border-orange-200">
                    {movement.warehouse}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination and Export Buttons */}
      <div className="flex items-center justify-between">
        {/* Pagination */}
        <div className="flex items-center gap-3">
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg transition-all duration-200 ${
              currentPage === 1 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Generar páginas visibles dinámicamente */}
          {(() => {
            let pagesToShow = [];
            
            if (currentPage <= 3) {
              // Mostrar 1, 2, 3, ..., 10
              pagesToShow = [1, 2, 3];
            } else if (currentPage >= totalPages - 2) {
              // Mostrar 1, ..., 8, 9, 10
              pagesToShow = [totalPages - 2, totalPages - 1, totalPages];
            } else {
              // Mostrar 1, ..., currentPage-1, currentPage, currentPage+1, ..., 10
              pagesToShow = [currentPage - 1, currentPage, currentPage + 1];
            }
            
            return (
              <>
                {currentPage > 3 && (
                  <>
                    <button 
                      onClick={() => setCurrentPage(1)}
                      className="px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-sm bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    >
                      1
                    </button>
                    <span className="px-2 text-gray-400 font-bold">...</span>
                  </>
                )}
                
                {pagesToShow.map((page) => (
                  <button 
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-sm ${
                      currentPage === page 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105' 
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                {currentPage < totalPages - 2 && (
                  <>
                    <span className="px-2 text-gray-400 font-bold">...</span>
                    <button 
                      onClick={() => setCurrentPage(totalPages)}
                      className="px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-sm bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </>
            );
          })()}
          
          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg transition-all duration-200 ${
              currentPage === totalPages 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-4">
          <button className="flex items-center gap-3 px-7 py-3.5 bg-white border-2 border-green-300 rounded-xl hover:bg-green-50 hover:border-green-400 transition-all duration-200 shadow-md hover:shadow-xl group">
            <span className="text-gray-700 font-bold group-hover:text-green-700">Exportar EXCEL</span>
            <img src={ExcelIcon} alt="Excel" className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          <button className="flex items-center gap-3 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5">
            <span className="font-bold">Exportar PDF</span>
            <img src={PdfIcon} alt="PDF" className="w-6 h-6 brightness-0 invert" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmMov;
