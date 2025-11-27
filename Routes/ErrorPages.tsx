// src/Routes/ErrorPages.tsx
import React from 'react';

export const AccessDenied: React.FC = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-red-600">403</h1>
        <p className="text-xl text-gray-700 mt-4">Acceso Denegado</p>
        <p className="text-gray-500">No tienes los permisos necesarios para ver esta página.</p>
    </div>
);

export const NotFound: React.FC = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-700 mt-4">Página No Encontrada</p>
        <p className="text-gray-500">La ruta que intentas acceder no existe.</p>
    </div>
);