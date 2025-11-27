import { useState } from 'react';
import lupitaIcon from '../../assets/Administrador/GestionAlm/lupita.svg';
import DeleteIcon from '../../assets/Administrador/Usuarios/Elim.svg';
import AddUserIcon from '../../assets/Administrador/Usuarios/Agre.svg';
import UserDeleteIcon from '../../assets/Administrador/Usuarios/Xmen.svg';
import HeaderUserIcon from '../../assets/Administrador/Usuarios/CreaUse.svg';
import SaveIcon from '../../assets/Administrador/Usuarios/Guard.svg';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AdmUsProps {
  onNavigateToAdd?: () => void;
  newUsers?: User[];
  onDeleteUser?: (id: number) => void;
}

const AdmUs = ({ onNavigateToAdd, newUsers = [], onDeleteUser }: AdmUsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('Todos');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '' });

  const initialUsers: User[] = [
    { id: 1, name: 'Jimi Del Aguila', email: 'jimi.Del Aguila_bug@gmail.com', role: 'Administrador' },
    { id: 2, name: 'Sofia Ramirez', email: 'sofia.Ram_bug@gmail.com', role: 'Almacenero' },
    { id: 3, name: 'Diego Fernandez', email: 'diego.Fernan_bug@gmail.com', role: 'Almacenero' },
    { id: 4, name: 'Isabel Torres', email: 'isabel.Torr_bug@gmail.com', role: 'Almacenero' },
    { id: 5, name: 'Alejandro Vargas', email: 'alejadro.Var_bug@gmail.com', role: 'Almacenero' },
  ];

  const [users, setUsers] = useState<User[]>([...initialUsers, ...newUsers]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'Todos' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCheckboxChange = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDeleteClick = () => {
    if (selectedUsers.length > 0) {
      setShowDeleteModal(true);
    }
  };

  const handleConfirmDelete = () => {
    // Eliminar de la lista local
    setUsers(users.filter(user => !selectedUsers.includes(user.id)));
    
    // Eliminar usuarios nuevos del estado global
    selectedUsers.forEach(userId => {
      if (userId > 5 && onDeleteUser) {
        onDeleteUser(userId);
      }
    });
    
    setSelectedUsers([]);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setEditForm({ name: user.name, email: user.email, role: user.role });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, name: editForm.name, email: editForm.email, role: editForm.role }
          : user
      ));
      setShowEditModal(false);
      setEditingUser(null);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingUser(null);
  };

  return (
    <div className="w-full h-full bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <h1 className="text-5xl font-bold text-gray-900">Creacion de Usuarios</h1>
        <img src={HeaderUserIcon} alt="Users" className="w-14 h-14" />
      </div>

      {/* Search and Filter Section */}
      <div className="flex items-center gap-5 mb-8">
        {/* Search Bar */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-4 pr-14 bg-white border-2 border-blue-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-700 placeholder-gray-400"
          />
          <img 
            src={lupitaIcon} 
            alt="Search" 
            className="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          />
        </div>

        {/* Role Filter Dropdown */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-8 py-4 bg-white border-2 border-blue-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer text-gray-700 font-medium transition-all hover:border-blue-300"
        >
          <option value="Todos">Almacenero</option>
          <option value="Administrador">Administrador</option>
          <option value="Almacenero">Almacenero</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b-2 border-gray-200">
              <th className="px-8 py-5 text-left text-sm font-bold text-gray-800">Nombre de Usuario</th>
              <th className="px-8 py-5 text-left text-sm font-bold text-gray-800">Email Organizacional</th>
              <th className="px-8 py-5 text-left text-sm font-bold text-gray-800">Rol Actual</th>
              <th className="px-8 py-5 text-left text-sm font-bold text-blue-600">Acciones</th>
              <th className="px-8 py-5 text-center text-sm font-bold text-gray-800"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id} className={`border-b border-gray-100 hover:bg-gray-100 transition-all duration-200 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}>
                <td className="px-8 py-5 text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-8 py-5 text-sm text-blue-600 hover:text-blue-800 underline cursor-pointer">{user.email}</td>
                <td className="px-8 py-5">
                  <span className={`inline-block px-5 py-2 rounded-full text-sm font-medium shadow-sm ${
                    user.role === 'Administrador' 
                      ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                      : 'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <button 
                    onClick={() => handleEditClick(user)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-semibold hover:underline transition-all"
                  >
                    Editar Rol
                  </button>
                </td>
                <td className="px-8 py-5 text-center">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                    className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-5">
        <button
          onClick={handleDeleteClick}
          disabled={selectedUsers.length === 0}
          className={`flex items-center gap-3 px-8 py-4 bg-white border-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg group ${
            selectedUsers.length === 0 
              ? 'border-gray-200 opacity-50 cursor-not-allowed' 
              : 'border-gray-300 hover:bg-red-50 hover:border-red-300'
          }`}
        >
          <span className={`font-semibold ${
            selectedUsers.length === 0 ? 'text-gray-400' : 'text-gray-700 group-hover:text-red-600'
          }`}>
            Eliminar Usuario {selectedUsers.length > 0 && `(${selectedUsers.length})`}
          </span>
          <img src={DeleteIcon} alt="Delete" className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
        <button 
          onClick={onNavigateToAdd}
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <span className="font-semibold">Agregar Usuario</span>
          <img src={AddUserIcon} alt="Add" className="w-6 h-6 brightness-0 invert" />
        </button>
      </div>

      {/* Edit User Side Panel */}
      {showEditModal && editingUser && (
        <>
          <style>
            {`
              @keyframes slideInFromRight {
                from {
                  transform: translateX(100%);
                }
                to {
                  transform: translateX(0);
                }
              }
              .slide-in-right {
                animation: slideInFromRight 0.3s ease-out;
              }
            `}
          </style>
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50" onClick={handleCancelEdit}></div>
          <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 slide-in-right">
            <div className="h-full flex flex-col p-8">
              {/* Close Button */}
              <button
                onClick={handleCancelEdit}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Editar Usuario</h2>

              {/* Form */}
              <div className="flex-1 space-y-6">
                {/* Nombre de Usuario */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre de Usuario
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Nombre de Usuario"
                    className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400"
                  />
                </div>

                {/* Email Organizacional */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Organizacional
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    placeholder="Gmail"
                    className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400"
                  />
                </div>

                {/* Rol Actual */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rol Actual
                  </label>
                  <input
                    type="text"
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    placeholder="Rol"
                    className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold shadow-lg"
                >
                  <img src={SaveIcon} alt="Save" className="w-5 h-5 brightness-0 invert" />
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-10 max-w-md w-full mx-4 shadow-2xl border-2 border-red-500 transform animate-fadeIn">
            <div className="text-center mb-6">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <img src={UserDeleteIcon} alt="User Delete" className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">
                ¿Estas Seguro de Eliminar {selectedUsers.length > 1 ? 'estos usuarios' : 'este usuario'}?
              </h2>
              <p className="text-red-100 text-lg">
                Se eliminarán {selectedUsers.length} {selectedUsers.length === 1 ? 'usuario' : 'usuarios'} permanentemente
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-6 py-4 bg-white text-gray-700 rounded-xl hover:bg-gray-100 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-6 py-4 bg-red-900 text-white rounded-xl hover:bg-red-950 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmUs;
