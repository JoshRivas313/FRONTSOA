import { useState } from 'react';
import AdminPanel from "../components/AdminPanel";
import AdmInc from "../components/AdmInc";
import AdmInv from "../components/AdmInv";
import AdmGest from "../components/AdmGest";
import AdmAddGest from "../components/Adm+Gest";
import AdmUs from "../components/AdmUs";
import AdmAddUs from "../components/Adm+Us";
import AdmMov from "../components/AdmMov";
import AdmProd from "../components/AdmProd";
import AdmAddProd from "../components/Adm+Prod";

interface AdminPageProps {
  onLogout?: () => void;
}

export default function AdminPage({ onLogout }: AdminPageProps) {
  const [selectedMenu, setSelectedMenu] = useState('inicio');
  const [newWarehouses, setNewWarehouses] = useState<any[]>([]);
  const [newUsers, setNewUsers] = useState<any[]>([]);

  const handleSaveWarehouse = (warehouse: any) => {
    setNewWarehouses(prev => [...prev, warehouse]);
    setSelectedMenu('almacen');
  };

  const handleCancelAdd = () => {
    setSelectedMenu('almacen');
  };

  const handleDeleteWarehouse = (id: number) => {
    setNewWarehouses(prev => prev.filter(warehouse => warehouse.id !== id));
  };

  const handleSaveUser = (user: any) => {
    setNewUsers(prev => [...prev, user]);
    setSelectedMenu('usuarios');
  };

  const handleCancelAddUser = () => {
    setSelectedMenu('usuarios');
  };

  const handleDeleteUser = (id: number) => {
    setNewUsers(prev => prev.filter(user => user.id !== id));
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'inicio':
        return <AdmInc />;
      case 'inventario':
        return <AdmInv />;
      case 'almacen':
        return <AdmGest onNavigateToAdd={() => setSelectedMenu('agregar-almacen')} newWarehouses={newWarehouses} onDeleteWarehouse={handleDeleteWarehouse} />;
      case 'agregar-almacen':
        return <AdmAddGest onCancel={handleCancelAdd} onSave={handleSaveWarehouse} />;
      case 'usuarios':
        return <AdmUs onNavigateToAdd={() => setSelectedMenu('agregar-usuario')} newUsers={newUsers} onDeleteUser={handleDeleteUser} />;
      case 'agregar-usuario':
        return <AdmAddUs onCancel={handleCancelAddUser} onSave={handleSaveUser} />;
      case 'movimientos':
        return <AdmMov />;
      case 'productos':
        return <AdmProd onNavigateToAdd={() => setSelectedMenu('agregar-producto')} />;
      case 'agregar-producto':
        return <AdmAddProd onCancel={() => setSelectedMenu('productos')} />;
      default:
        return null;
    }
  };

  return (
    <AdminPanel
      selectedMenu={selectedMenu}
      onMenuSelect={setSelectedMenu}
      onLogout={onLogout}
    >
      {renderContent()}
    </AdminPanel>
  );
}
