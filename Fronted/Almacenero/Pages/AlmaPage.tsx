import { useState } from 'react';
import AlmcPanel from "../components/AlmcPanel";
import AlmcInc from "../components/AlmcInc";
import AlmcInv from "../components/AlmcInv";
import AlmcEntr from "../components/AlmcEntr";
import AlmcSali from "../components/AlmcSali";

interface AlmaPageProps {
  onLogout?: () => void;
}

export default function AlmaPage({ onLogout }: AlmaPageProps) {
  const [selectedMenu, setSelectedMenu] = useState('inicio');

  const renderContent = () => {
    switch (selectedMenu) {
      case 'inicio':
        return <AlmcInc />;
      case 'inventario':
        return <AlmcInv />;
      case 'entrada':
        return <AlmcEntr />;
      case 'salida':
        return <AlmcSali />;
      default:
        return null;
    }
  };

  return (
    <AlmcPanel
      selectedMenu={selectedMenu}
      onMenuSelect={setSelectedMenu}
      onLogout={onLogout}
    >
      {renderContent()}
    </AlmcPanel>
  );
}
