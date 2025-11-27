import { useState } from 'react';
import type { ReactNode } from 'react';
import SiderbardLog from '../../assets/Siderbard/SiderbarLog.svg';
import PerfilIcon from '../../assets/Siderbard/Perfil.svg';
import CuadradoSalida from '../../assets/Siderbard/Cuadrado de Salida.svg';
import InvenIcon from '../../assets/Siderbard/inven.svg';
import GestaIcon from '../../assets/Siderbard/gesta.svg';
import UserIcon from '../../assets/Siderbard/user.svg';
import MovIcon from '../../assets/Siderbard/mov.svg';
import GestProIcon from '../../assets/Siderbard/gestpro.svg';

interface AdminPanelProps {
  children: ReactNode;
  selectedMenu: string;
  onMenuSelect: (menu: string) => void;
  onLogout?: () => void;
}

const AdminPanel = ({ children, selectedMenu, onMenuSelect, onLogout }: AdminPanelProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  console.log('selectedMenu:', selectedMenu); // Debug

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <div className={`w-96 bg-white shadow-lg flex flex-col transition-all duration-500 ease-in-out ${!showSidebar ? '-ml-96 opacity-0' : 'ml-0 opacity-100'}`}>
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-center">
            <img src={SiderbardLog} alt="Bugatti Logo" className="h-20 w-auto" />
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-6">
          <ul className="space-y-1 px-6">
            {/* INICIO */}
            <li>
              <button
                onClick={() => onMenuSelect('inicio')}
                style={selectedMenu === 'inicio' ? { backgroundColor: '#EFF6FF', color: '#1C639F' } : {}}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  selectedMenu === 'inicio'
                    ? ''
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="font-medium">INICIO</span>
              </button>
            </li>

            {/* INVENTARIO */}
            <li>
              <button
                onClick={() => onMenuSelect('inventario')}
                style={selectedMenu === 'inventario' ? { backgroundColor: '#EFF6FF', color: '#1C639F' } : {}}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  selectedMenu === 'inventario'
                    ? ''
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <img src={InvenIcon} alt="Inventario" className="w-5 h-5" />
                <span className="font-medium">INVENTARIO</span>
              </button>
            </li>

            {/* GESTIÓN DE ALMACÉN */}
            <li>
              <button
                onClick={() => onMenuSelect('almacen')}
                style={selectedMenu === 'almacen' ? { backgroundColor: '#EFF6FF', color: '#1C639F' } : {}}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  selectedMenu === 'almacen'
                    ? ''
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <img src={GestaIcon} alt="Gestión de Almacén" className="w-5 h-5" />
                <span className="font-medium">GESTIÓN DE ALMACÉN</span>
              </button>
            </li>

            {/* USUARIOS */}
            <li>
              <button
                onClick={() => onMenuSelect('usuarios')}
                style={selectedMenu === 'usuarios' ? { backgroundColor: '#EFF6FF', color: '#1C639F' } : {}}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  selectedMenu === 'usuarios'
                    ? ''
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <img src={UserIcon} alt="Usuarios" className="w-5 h-5" />
                <span className="font-medium">USUARIOS</span>
              </button>
            </li>

            {/* MOVIMIENTOS */}
            <li>
              <button
                onClick={() => onMenuSelect('movimientos')}
                style={selectedMenu === 'movimientos' ? { backgroundColor: '#EFF6FF', color: '#1C639F' } : {}}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  selectedMenu === 'movimientos'
                    ? ''
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <img src={MovIcon} alt="Movimientos" className="w-5 h-5" />
                <span className="font-medium">MOVIMIENTOS</span>
              </button>
            </li>

            {/* GESTIÓN DE PRODUCTOS */}
            <li>
              <button
                onClick={() => onMenuSelect('productos')}
                style={selectedMenu === 'productos' ? { backgroundColor: '#EFF6FF', color: '#1C639F' } : {}}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  selectedMenu === 'productos'
                    ? ''
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <img src={GestProIcon} alt="Gestión de Productos" className="w-5 h-5" />
                <span className="font-medium">GESTIÓN DE PRODUCTOS</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Ayuda Section */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Ayuda</span>
          </button>
        </div>
        </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm px-8 py-10 flex items-center justify-between">
          {/* Hamburger Button */}
          <button 
            onClick={() => setShowSidebar(!showSidebar)}
            className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 hover:bg-gray-100 rounded-lg transition-all duration-500 group"
          >
            <span className={`w-7 h-0.5 bg-gray-700 transition-all duration-500 ease-in-out ${!showSidebar ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-7 h-0.5 bg-gray-700 transition-all duration-500 ease-in-out ${!showSidebar ? 'opacity-0' : ''}`}></span>
            <span className={`w-7 h-0.5 bg-gray-700 transition-all duration-500 ease-in-out ${!showSidebar ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
          
          {/* User Profile */}
          <div className="flex items-center gap-4 mr-1">
            <div className="text-right">
              <p className="text-base font-medium text-gray-900">Hola, Jimmy Del Aguila</p>
              <p className="text-sm text-gray-500">Administrador</p>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              <img src={PerfilIcon} alt="Perfil" className="w-full h-full object-cover" />
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <svg className={`w-6 h-6 text-gray-700 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                  <button 
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <img src={CuadradoSalida} alt="Cerrar sesión" className="w-5 h-5" />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
