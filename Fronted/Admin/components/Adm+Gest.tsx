import { useState } from 'react';
import Agralmc from '../../assets/Administrador/GestionAlm/Agralmc.svg';
import Guda from '../../assets/Administrador/GestionAlm/Guda.svg';

interface AdmAddGestProps {
  onCancel?: () => void;
  onSave?: (warehouse: any) => void;
}

const AdmAddGest = ({ onCancel, onSave }: AdmAddGestProps) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    location: '',
    manager: '',
    phone: '',
    size: '',
    status: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleSave = () => {
    // Validar que los campos requeridos estén llenos
    if (!formData.code || !formData.name || !formData.location || !formData.manager || !formData.phone || !formData.size || !formData.status) {
      alert('Por favor complete todos los campos');
      return;
    }

    // Crear nuevo almacén
    const newWarehouse = {
      id: Date.now(),
      code: formData.code,
      name: formData.name,
      location: formData.location,
      manager: formData.manager,
      phone: formData.phone,
      capacity: formData.size,
      status: formData.status
    };

    if (onSave) {
      onSave(newWarehouse);
    }
  };

  return (
    <div className="w-full h-full p-8 bg-gray-50">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Agregar Almacen</h1>
          <img src={Agralmc} alt="Almacen" className="w-16 h-16" />
        </div>

        {/* Formulario */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Codigo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Codigo</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="Codigo del Almacen"
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nombre de almacen"
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Ubicacion */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ubicacion</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Direccion del Almacen"
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Persona Responsable */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Persona Responsables</label>
              <input
                type="text"
                name="manager"
                value={formData.manager}
                onChange={handleInputChange}
                placeholder="Nombre del responsable"
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Telefono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Numero de Contacto"
              className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Tamaño */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tamaño</label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                placeholder="Metros cuadrados"
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecionar</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
          >
            Cancelar
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
          >
            Guardar
            <img src={Guda} alt="Guardar" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmAddGest;
