import { useState } from 'react';
import ProdIco from '../../assets/Administrador/GestPro/ProdIco.svg';

interface AdmAddProdProps {
  onCancel?: () => void;
  onSave?: (prod: any) => void;
}

export default function AdmAddProd({ onCancel, onSave }: AdmAddProdProps) {
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [stock, setStock] = useState<number | ''>('');
  const [estado, setEstado] = useState('stock');
  // ahora usamos solo URL para la imagen; `imgPreview` contendrá la URL

  // ya no se usa generación automática desde UI; el campo código es manual

  const handleSave = () => {
    // validaciones basicas
    if (!nombre.trim()) return alert('El nombre es obligatorio');
    if (stock === '' || Number(stock) < 0) return alert('Stock inválido');

    const prod = {
      img: imgPreview || '',
      codigo: codigo || 'PROD-XXXX',
      nombre,
      categoria,
      stock: Number(stock),
      estado: estado === 'stock' ? 'EN STOCK' : 'AGOTADO',
    };

    onSave?.(prod);
    onCancel?.();
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Agregar Producto</h1>
        <img src={ProdIco} alt="ProdIco" className="w-10 h-10" />
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 flex flex-col items-center">
            <div className="w-40 h-40 rounded-lg bg-gray-50 border flex items-center justify-center overflow-hidden">
              {imgPreview ? (
                <img src={imgPreview} alt="preview" className="object-contain w-full h-full" />
              ) : (
                <div className="text-center text-gray-400">Preview<br/>Imagen</div>
              )}
            </div>
            <div className="mt-3 w-full">
              <label className="text-sm text-gray-600">Imagen (URL)</label>
              <input
                type="text"
                value={imgPreview || ''}
                onChange={(e) => setImgPreview(e.target.value ? e.target.value : null)}
                placeholder="https://example.com/imagen.png"
                className="w-full mt-1 px-3 py-2 border rounded"
              />
              <div className="mt-2">
                <button type="button" onClick={() => setImgPreview(null)} className="px-4 py-2 bg-red-50 text-red-600 border rounded hover:bg-red-100">Quitar</button>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Código</label>
                <div className="mt-1">
                  <input value={codigo} onChange={(e) => setCodigo(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="PROD-000" />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Categoría</label>
                <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded">
                  <option value="">Seleccionar</option>
                  <option value="Material de construcción">Material de construcción</option>
                  <option value="Herramientas de construcción">Herramientas de construcción</option>
                  <option value="Insumos">Insumos</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm text-gray-600">Nombre del producto</label>
              <input value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded" placeholder="Nombre del producto" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Stock</label>
                <input type="number" value={stock} onChange={(e) => setStock(e.target.value === '' ? '' : Number(e.target.value))} className="w-full mt-1 px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="text-sm text-gray-600">Estado</label>
                <select value={estado} onChange={(e) => setEstado(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded">
                  <option value="stock">EN STOCK</option>
                  <option value="agotado">AGOTADO</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => onCancel?.()} className="px-4 py-2 bg-white border rounded shadow-sm hover:bg-gray-50">Cancelar</button>
              <button onClick={handleSave} className="px-5 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">Guardar producto</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
