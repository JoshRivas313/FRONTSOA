import { useState } from 'react';
import SaveIcon from '../../assets/Administrador/Usuarios/Guard.svg';
import CancelIcon from '../../assets/Administrador/GestionAlm/canc.svg';
import HeaderIcon from '../../assets/Administrador/Usuarios/AgresIco.svg';

interface AdmAddUsProps {
  onCancel?: () => void;
  onSave?: (user: any) => void;
}

const AdmAddUs = ({ onCancel, onSave }: AdmAddUsProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      alert('Por favor complete todos los campos');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: formData.role
    };

    if (onSave) {
      onSave(newUser);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="w-full h-full bg-gray-50 p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <h1 className="text-5xl font-bold text-gray-900">Agregar Usuario</h1>
          <img src={HeaderIcon} alt="Add User" className="w-14 h-14" />
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl">
          <div className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Nombre
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Introducir Nombre"
                className="w-full px-5 py-4 bg-blue-50 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-blue-300"
              />
            </div>

            {/* Correo */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Correo
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Introducir Correo"
                className="w-full px-5 py-4 bg-blue-50 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-blue-300"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Introducir Contraseña"
                className="w-full px-5 py-4 bg-blue-50 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-blue-300"
              />
            </div>

            {/* Rol */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Rol
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-5 py-4 bg-blue-50 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 cursor-pointer"
              >
                <option value="">Seleccionar Rol</option>
                <option value="Administrador">Administrador</option>
                <option value="Almacenero">Almacenero</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-5 mt-10">
            <button
              onClick={handleCancel}
              className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <span className="text-gray-700 font-semibold">Cancelar</span>
              <img src={CancelIcon} alt="Cancel" className="w-6 h-6" />
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span className="font-semibold">Guardar</span>
              <img src={SaveIcon} alt="Save" className="w-6 h-6 brightness-0 invert" />
            </button>
          </div>
        </div>
    </div>
  );
};

export default AdmAddUs;
