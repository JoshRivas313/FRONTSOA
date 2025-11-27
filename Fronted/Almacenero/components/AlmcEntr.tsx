

import { useState } from 'react';
import EntrIco from '../../assets/Almacenero/Entrada/EntrIco.svg';
import GurIcon from '../../assets/Almacenero/Entrada/Gur.svg';
import CancelIcon from '../../assets/Almacenero/Entrada/cancel.svg';

export default function AlmcEntr() {
  const materiales = [
    { id: 'MAT-001', nombre: 'Cemento Portland', unidad: 'Bolsa' },
    { id: 'MAT-002', nombre: 'Varillas 3/8"', unidad: 'Unidad' },
    { id: 'MAT-003', nombre: 'Arena fina', unidad: 'm³' },
    { id: 'MAT-004', nombre: 'Ladrillo King Kong', unidad: 'Millar' },
    { id: 'MAT-005', nombre: 'Alambre N°8', unidad: 'kg' },
  ];

  const usuario = 'Efrain Lopez';
  const almacenes = [
    { id: 'ALM-A', nombre: 'Almacen A' },
    { id: 'ALM-B', nombre: 'Almacen B' },
    { id: 'ALM-C', nombre: 'Almacen C' },
    { id: 'ALM-D', nombre: 'Almacen D' },
  ];
  const [searchMaterial, setSearchMaterial] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [selectedAlmacen, setSelectedAlmacen] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [referencia, setReferencia] = useState('');
  interface ProductoItem {
    id: string;
    nombre: string;
    unidad: string;
    cantidad: string;
  }
  const [productos, setProductos] = useState<ProductoItem[]>([]);

  const filteredMateriales = materiales.filter(m =>
    m.nombre.toLowerCase().includes(searchMaterial.toLowerCase()) ||
    m.id.toLowerCase().includes(searchMaterial.toLowerCase())
  );

  const handleAgregarProducto = () => {
    if (!selectedMaterial || !cantidad) {
      alert('Debe seleccionar material y cantidad');
      return;
    }
    const materialObj = materiales.find(m => m.id === selectedMaterial);
    setProductos([
      ...productos,
      {
        id: selectedMaterial,
        nombre: materialObj ? materialObj.nombre : '',
        unidad: materialObj ? materialObj.unidad : '',
        cantidad,
      },
    ]);
    setSearchMaterial('');
    setSelectedMaterial('');
    setCantidad('');
  };

  const handleEliminarProducto = (index: number) => {
    setProductos(productos.filter((_, i) => i !== index));
  };

  const handleRegistrarEntrada = () => {
    if (!selectedAlmacen || !descripcion || !referencia || productos.length === 0) {
      alert('Por favor complete todos los campos obligatorios y agregue al menos un producto');
      return;
    }
    // Simulación de registro
    console.log('Registro:', {
      usuario,
      almacen: selectedAlmacen,
      descripcion,
      referencia,
      productos,
    });
    alert('Ingreso registrado exitosamente');
    setSelectedAlmacen('');
    setDescripcion('');
    setReferencia('');
    setProductos([]);
  };

  return (
    <div className="w-full h-full bg-gray-50 px-4 py-8">
      <div className="max-w-4xl ml-0">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-4xl font-bold text-black">INGRESO DE MATERIALES</h1>
          <img src={EntrIco} alt="Ingreso" className="w-16 h-16 ml-4" />
        </div>
        <div className="bg-white rounded-lg shadow p-10 mb-8 w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Datos de la Entrada</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
              <input
                type="text"
                value={usuario}
                disabled
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Almacén <span className="text-red-500">*</span></label>
              <select
                value={selectedAlmacen}
                onChange={e => setSelectedAlmacen(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar Almacén</option>
                {almacenes.map(a => (
                  <option key={a.id} value={a.id}>{a.nombre}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Sección para agregar productos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Material <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar material..."
                  value={searchMaterial}
                  onChange={e => {
                    setSearchMaterial(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                {searchMaterial && filteredMateriales.length > 0 && showSuggestions && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-auto">
                    {filteredMateriales.map(material => (
                      <div
                        key={material.id}
                        onMouseDown={() => {
                          setSelectedMaterial(material.id);
                          setSearchMaterial(material.nombre);
                          setShowSuggestions(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <div className="font-medium">{material.nombre}</div>
                        <div className="text-xs text-gray-500">{material.id} - {material.unidad}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad <span className="text-red-500">*</span></label>
              <input
                type="number"
                placeholder="0"
                value={cantidad}
                onChange={e => setCantidad(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div className="mb-4 flex justify-start">
            <button
              type="button"
              onClick={handleAgregarProducto}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Agregar Producto
            </button>
          </div>
          {/* Lista de productos agregados */}
          {productos.length > 0 && (
            <div className="mb-6">
              <h3 className="text-md font-bold text-gray-800 mb-2">Productos agregados</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidad</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {productos.map((prod, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{prod.nombre}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{prod.cantidad}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{prod.unidad}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                          <button
                            type="button"
                            onClick={() => handleEliminarProducto(idx)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción <span className="text-red-500">*</span></label>
            <textarea
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              placeholder="Descripción del ingreso..."
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Referencia <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={referencia}
              onChange={e => setReferencia(e.target.value)}
              placeholder="Referencia..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleRegistrarEntrada}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold text-lg flex items-center gap-2"
          >
            Registrar Entrada
            <img src={GurIcon} alt="Guardar" className="w-6 h-6 ml-2" />
          </button>
          <button
            type="button"
            onClick={() => {
              // Limpiar todos los campos y productos
              setSelectedAlmacen('');
              setDescripcion('');
              setReferencia('');
              setProductos([]);
              setSearchMaterial('');
              setSelectedMaterial('');
              setCantidad('');
            }}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-bold text-lg flex items-center gap-2"
          >
            Cancelar
            <img src={CancelIcon} alt="Cancelar" className="w-6 h-6 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
