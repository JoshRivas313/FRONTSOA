import { Routes, Route, useNavigate } from 'react-router-dom';
import LogPage from '../Fronted/Login/Pages/LogPage';
import AdminPage from '../Fronted/Admin/Pages/AdminPage';
import AlmPage from '../Fronted/Almacenero/Pages/AlmaPage';

function RoutesComponent() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<LogPage/>} />

      <Route path="/admin" element={<AdminPage onLogout={() => navigate('/')} />} />

      <Route path="/almacenero" element={<AlmPage onLogout={() => navigate('/')} />} />
    </Routes>
  );
}
export default RoutesComponent;