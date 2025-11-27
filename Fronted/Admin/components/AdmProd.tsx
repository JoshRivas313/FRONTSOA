import ProdIcon from '../../assets/Administrador/GestPro/ProdIco.svg';

import { useState } from 'react';

import CementIcon from '../../assets/Administrador/GestPro/ImgdeMate/cement.svg';
import VariIcon from '../../assets/Administrador/GestPro/ImgdeMate/acero.svg';
import TalaIcon from '../../assets/Administrador/GestPro/ImgdeMate/talad.svg';
import LadrilloIcon from '../../assets/Administrador/GestPro/ImgdeMate/lad.svg';
import CascoIcon from '../../assets/Administrador/GestPro/ImgdeMate/casc.svg';
import PinturaIcon from '../../assets/Administrador/GestPro/ImgdeMate/pint.svg';
import AmoladoraIcon from '../../assets/Administrador/GestPro/ImgdeMate/amol.svg';
import LuIcon from '../../assets/Administrador/GestPro/lu.svg';
import EditIcon from '../../assets/Administrador/GestPro/Editin.svg';

interface AdmProdProps {
  onNavigateToAdd?: () => void;
}

const AdmProd = ({ onNavigateToAdd }: AdmProdProps) => {
  const initialProducts = [
    {
      img: CementIcon,
      codigo: 'PROD-001',
      nombre: 'Cemento Portland Tipo I - 42.5kg',
      categoria: 'Material de construcción',
      stock: 850,
      estado: 'EN STOCK',
    },
    {
      img: VariIcon,
      codigo: 'PROD-002',
      nombre: 'Varilla de Acero Corrugado 1/2" x 9m',
      categoria: 'Material de construcción',
      stock: 450,
      estado: 'EN STOCK',
    },
    {
      img: TalaIcon,
      codigo: 'PROD-003',
      nombre: 'Taladro Percutor 850W + Accesorios',
      categoria: 'Herramientas de construcción',
      stock: 42,
      estado: 'EN STOCK',
    },
    {
      img: LadrilloIcon,
      codigo: 'PROD-004',
      nombre: 'Ladrillo King Kong 18 Huecos',
      categoria: 'Material de construcción',
      stock: 0,
      estado: 'AGOTADO',
    },
    {
      img: CascoIcon,
      codigo: 'PROD-005',
      nombre: 'Casco de Seguridad con Barbiquejo',
      categoria: 'Insumos',
      stock: 320,
      estado: 'EN STOCK',
    },
    {
      img: PinturaIcon,
      codigo: 'PROD-006',
      nombre: 'Pintura Látex Premium 5 Galones',
      categoria: 'Insumos',
      stock: 95,
      estado: 'EN STOCK',
    },
    {
      img: AmoladoraIcon,
      codigo: 'PROD-007',
      nombre: 'Amoladora Angular 7" 2200W',
      categoria: 'Herramientas de construcción',
      stock: 28,
      estado: 'EN STOCK',
    },
  ];

  const [products, setProducts] = useState(initialProducts);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStock, setSelectedStock] = useState('');
  const itemsPerPage = 6;

  // Modal / edición
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<any>(null);

  const openEdit = (prod: any) => {
    // crear copia editable
    setModalProduct({ ...prod });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalProduct(null);
  };

  const saveModal = () => {
    if (!modalProduct) return closeModal();

    // Actualizar la lista de productos en estado
    setProducts((prev: any[]) =>
      prev.map((p) => {
        if (p.codigo === modalProduct.codigo) {
          const updated = { ...p, ...modalProduct };
          // sincronizar estado legible
          updated.estado = updated.stock > 0 ? 'EN STOCK' : 'AGOTADO';
          return updated;
        }
        return p;
      })
    );

    closeModal();
  };

  // Filtrado según búsqueda, categoría y estado de stock
  const filteredProducts = products.filter((prod) => {
    const term = searchTerm.trim().toLowerCase();

    if (term) {
      const matchesTerm = [prod.nombre, prod.codigo, prod.categoria]
        .join(' ')
        .toLowerCase()
        .includes(term);
      if (!matchesTerm) return false;
    }

    if (selectedCategory) {
      if (prod.categoria !== selectedCategory) return false;
    }

    if (selectedStock) {
      if (selectedStock === 'stock' && prod.stock <= 0) return false;
      if (selectedStock === 'agotado' && prod.stock > 0) return false;
    }

    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));

  const goToPage = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  const goPrev = () => goToPage(currentPage - 1);
  const goNext = () => goToPage(currentPage + 1);

  // Helper: devuelve un array de páginas y 'DOTS' para renderizar la paginación compacta
  const getPagination = (current: number, total: number, siblingCount = 1) => {
    const DOTS = 'DOTS';

    const range = (start: number, end: number) => {
      const length = end - start + 1;
      return Array.from({ length }, (_, i) => start + i);
    };

    const totalPageNumbers = siblingCount * 2 + 5;

    if (total <= totalPageNumbers) {
      return range(1, total);
    }

    const leftSiblingIndex = Math.max(current - siblingCount, 2);
    const rightSiblingIndex = Math.min(current + siblingCount, total - 1);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < total - 1;

    const firstPageIndex = 1;
    const lastPageIndex = total;

    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, lastPageIndex];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(total - rightItemCount + 1, total);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return [] as (number | string)[];
  };

  return (
    <div className="w-full h-full bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <h1 className="text-5xl font-bold text-gray-900">GESTION DE PRODUCTOS</h1>
        <img src={ProdIcon} alt="Gestión"  className="w-14 h-14" />
      </div>

      <div className="w-full max-w-7xl mx-auto ml-0 px-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-start mb-6">
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-[520px]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Buscar producto por nombre, código o categoría"
                className="w-full px-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <img src={LuIcon} alt="buscar" className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
            <div className="relative w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full md:w-72 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10"
              >
                <option value="">Todas las categorías</option>
                <option value="Material de construcción">Material de construcción</option>
                <option value="Herramientas de construcción">Herramientas de construcción</option>
                <option value="Insumos">Insumos</option>
              </select>
              <svg className="w-4 h-4 absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-600" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="relative w-full md:w-auto">
              <select
                value={selectedStock}
                onChange={(e) => {
                  setSelectedStock(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full md:w-44 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10"
              >
                <option value="">Estado del stock</option>
                <option value="stock">En stock</option>
                <option value="agotado">Agotado</option>
              </select>
              <svg className="w-4 h-4 absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-600" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <button onClick={() => onNavigateToAdd?.()} className="mt-4 md:mt-0 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 shadow ml-0 md:ml-4">
            <span className="text-lg font-bold">+ Agregar producto</span>
          </button>
        </div>
        <div className="w-full max-w-7xl mx-auto my-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 mb-0">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">IMAGEN</th>
                  <th className="px-5 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">CÓDIGO</th>
                  <th className="px-5 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">NOMBRE DEL PRODUCTO</th>
                  <th className="px-5 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">CATEGORÍA</th>
                  <th className="px-5 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">STOCK</th>
                  <th className="px-5 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">ESTADO</th>
                  <th className="px-5 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">ACCIONES</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {(() => {
                  const start = (currentPage - 1) * itemsPerPage;
                  const paginated = filteredProducts.slice(start, start + itemsPerPage);
                  return paginated.map((prod, idx) => (
                    <tr key={start + idx} className={`transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}>
                    <td className="px-5 py-3 whitespace-nowrap text-sm align-middle">
                      <img
                        src={prod.img}
                        alt={prod.nombre}
                        className="w-12 h-12 rounded object-contain bg-white p-1 shadow-sm"
                        onError={(e) => {
                          // fallback to ProdIcon if the specific svg fails to load
                          // @ts-ignore
                          e.currentTarget.src = ProdIcon;
                        }}
                      />
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-sm font-semibold text-gray-700 align-middle">{prod.codigo}</td>
                    <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900 align-middle">{prod.nombre}</td>
                    <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-500 align-middle">{prod.categoria}</td>
                    <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900 align-middle">{prod.stock}</td>
                    <td className="px-5 py-3 whitespace-nowrap text-sm align-middle">
                      {prod.stock > 0 ? (
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold flex items-center gap-1">● EN STOCK</span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-1">● AGOTADO</span>
                      )}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-sm flex gap-2 align-middle">
                      <button onClick={() => openEdit(prod)} className="w-9 h-9 flex items-center justify-center rounded-md bg-white border shadow-sm hover:shadow-md transition-transform hover:scale-105 text-blue-600">
                        <img src={EditIcon} alt="Editar" className="w-4 h-4" />
                      </button>
                      <button className="w-9 h-9 flex items-center justify-center rounded-md bg-white border shadow-sm hover:shadow-md transition-transform hover:scale-105 text-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))})()}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center items-center mt-8">
          <nav className="inline-flex items-center bg-gray-100 rounded-full p-2 shadow-sm" aria-label="Pagination">
            <button
              onClick={goPrev}
              disabled={currentPage === 1}
              className={`w-10 h-10 flex items-center justify-center rounded-full mr-2 ${currentPage === 1 ? 'bg-gray-100 text-gray-300 pointer-events-none' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              aria-label="Previous page"
            >&lt;</button>

            {getPagination(currentPage, totalPages).map((item) => {
              if (item === 'DOTS') {
                return (
                  <span key={Math.random()} className="w-10 h-10 flex items-center justify-center bg-transparent text-gray-500">&hellip;</span>
                );
              }

              const page = item as number;
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-10 h-10 flex items-center justify-center mx-1 rounded-md border ${isActive ? 'bg-white text-blue-600 font-bold shadow' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={goNext}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 flex items-center justify-center rounded-full ml-2 ${currentPage === totalPages ? 'bg-gray-100 text-gray-300 pointer-events-none' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              aria-label="Next page"
            >&gt;</button>
          </nav>
        </div>
      </div>

      {/* Right-side edit panel */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-full md:w-96 bg-white shadow-2xl transform transition-transform duration-300 ${isModalOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!isModalOpen}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">Editar producto</h3>
            <div className="flex items-center gap-2">
              <button onClick={closeModal} className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">Cerrar</button>
              <button onClick={saveModal} className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Guardar</button>
            </div>
          </div>

          <div className="p-4 overflow-auto">
            {!modalProduct ? (
              <div className="text-gray-500">Selecciona un producto para editar.</div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img src={modalProduct.img} alt={modalProduct.nombre} className="w-20 h-20 rounded p-1 bg-white shadow-sm object-contain" />
                  <div>
                    <div className="text-sm text-gray-600">Código</div>
                    <div className="font-medium">{modalProduct.codigo}</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-600">Nombre</label>
                  <input
                    value={modalProduct.nombre}
                    onChange={(e) => setModalProduct({ ...modalProduct, nombre: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Categoría</label>
                  <input
                    value={modalProduct.categoria}
                    onChange={(e) => setModalProduct({ ...modalProduct, categoria: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Stock</label>
                    <input
                      type="number"
                      value={modalProduct.stock}
                      onChange={(e) => setModalProduct({ ...modalProduct, stock: Number(e.target.value) })}
                      className="w-full mt-1 px-3 py-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Estado</label>
                    <select
                      value={modalProduct.stock > 0 ? 'stock' : 'agotado'}
                      onChange={(e) => setModalProduct({ ...modalProduct, stock: e.target.value === 'stock' ? (modalProduct.stock || 1) : 0 })}
                      className="w-full mt-1 px-3 py-2 border rounded"
                    >
                      <option value="stock">EN STOCK</option>
                      <option value="agotado">AGOTADO</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmProd;
