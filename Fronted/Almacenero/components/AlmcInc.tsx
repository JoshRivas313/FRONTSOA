import InicIcoAlm from '../../assets/Almacenero/Inicio/InicIcoAlm.svg';
import Perf1 from '../../assets/Almacenero/Perfiles/Perf1.svg';

export default function AlmcInc() {
  const alertas = [
    {
      id: 1,
      material: 'Material X',
      descripcion: 'El material "Hierro corrugado 1/2" esta por debajo del stock minimo. Stock actual: 45, minimo 100',
      color: 'yellow',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-400'
    },
    {
      id: 2,
      material: 'Material Y',
      descripcion: 'El material "Pintura latex Blanca" esta por debajo de stock minimo. Stock actual: 8, minimo 20',
      color: 'red',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-400'
    },
    {
      id: 3,
      material: 'Material Z',
      descripcion: 'El material "Tuberia PVC 4" esta por debajo del stock minimo. Stock actual: 20, minimo 100',
      color: 'orange',
      bgColor: 'bg-orange-100',
      borderColor: 'border-orange-400'
    },
    {
      id: 4,
      material: 'Material X',
      descripcion: 'El material "Hierro corrugado 1/2" esta por debajo del stock minimo. Stock actual: 45, minimo 100',
      color: 'yellow',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-400'
    },
    {
      id: 5,
      material: 'Material Y',
      descripcion: 'El material "Pintura latex Blanca" esta por debajo de stock minimo. Stock actual: 8, minimo 20',
      color: 'red',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-400'
    }
  ];

  return (
    <div className="w-full h-full px-6 pt-3 pb-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-4xl font-bold text-black">INICIO</h1>
        <img src={InicIcoAlm} alt="Inicio" className="w-16 h-16 ml-4" />
      </div>

      {/* Contenedor principal con dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl">
        {/* Panel Izquierdo - Bienvenido Almacenero */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-black mb-6">Bienvenido Almacenero</h2>
          
          {/* Foto del almacenero */}
          <div className="flex justify-center mb-6">
            <div className="w-48 h-48 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
              <img 
                src={Perf1} 
                alt="Almacenero" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Información del almacenero */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre:</label>
              <div className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900">
                Efrain Lopez
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Telefono:</label>
              <div className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900">
                +51 965656963
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Correo:</label>
              <div className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-blue-600">
                jimi.Del Aguila_bug@gmail.com
              </div>
            </div>
          </div>
        </div>

        {/* Panel Derecho - Alertas de Inventario */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-black mb-4">Alertas de Inventario</h2>
          <p className="text-sm text-gray-600 mb-6">Alertas de stock que necesitan su atencion</p>

          {/* Lista de alertas con scroll */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {alertas.map((alerta) => (
              <div 
                key={alerta.id}
                className={`flex gap-4 p-4 rounded-lg border-2 ${alerta.bgColor} ${alerta.borderColor}`}
              >
                {/* Icono de alerta */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${alerta.bgColor} border-2 ${alerta.borderColor} flex items-center justify-center`}>
                  <svg 
                    className={`w-6 h-6 ${alerta.color === 'yellow' ? 'text-yellow-600' : alerta.color === 'red' ? 'text-red-600' : 'text-orange-600'}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Contenido de alerta */}
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{alerta.material}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{alerta.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
