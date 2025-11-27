import Inicpr from '../../assets/Administrador/Inicio/Inicpr.svg';
import Stoc from '../../assets/Administrador/Inicio/Stoc.svg';
import Matago from '../../assets/Administrador/Inicio/Matago.svg';
import Carreter from '../../assets/Administrador/Inicio/Carreter.svg';
import Alert from '../../assets/Administrador/Inicio/Alert.svg';

const AdmInc = () => {
  return (
    <div className="w-full h-full px-6 pt-3 pb-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-4xl font-bold text-black">INICIO</h1>
        <img src={Inicpr} alt="Inicio" className="w-16 h-16 ml-4" />
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 max-w-6xl">
        {/* Stock Total */}
        <div className="bg-white rounded-lg shadow p-5 border border-gray-200 hover:bg-green-50 hover:border-green-300 transition-all duration-300 cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-gray-600 font-semibold mb-2 text-lg">Stock Total</h3>
              <p className="text-4xl font-bold text-black">1,250</p>
            </div>
            <div className="bg-transparent p-3">
              <img src={Stoc} alt="Stock" className="w-12 h-12" />
            </div>
          </div>
          <p className="text-sm text-gray-500">Unidades totales de materiales</p>
        </div>

        {/* Materiales Agotados */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-300 cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-gray-600 font-semibold mb-2 text-lg">Materiales Agotados</h3>
              <p className="text-4xl font-bold text-black">15</p>
            </div>
            <div className="bg-transparent p-3">
              <img src={Matago} alt="Materiales Agotados" className="w-12 h-12" />
            </div>
          </div>
          <p className="text-sm text-gray-500">Materiales debajo del stock mínimo</p>
        </div>

        {/* Movimientos hoy */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:bg-red-50 hover:border-red-300 transition-all duration-300 cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-gray-600 font-semibold mb-2 text-lg">Movimientos hoy</h3>
              <p className="text-4xl font-bold text-black">+5</p>
            </div>
            <div className="bg-transparent p-3">
              <img src={Carreter} alt="Movimientos" className="w-12 h-12" />
            </div>
          </div>
          <p className="text-sm text-gray-500">Entradas y salidas registradas</p>
        </div>
      </div>

      {/* Sección de Tendencias de Inventario */}
      <h2 className="text-3xl font-bold text-black mb-6 mt-10">Tendencias de Inventario</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Movimientos Recientes */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-black mb-2">Movimientos Recientes</h3>
              <p className="text-sm text-gray-500">Un registro de los movimientos de los últimos 5 materiales</p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
              Ver Todo
            </button>
          </div>

          <div className="mb-4">
            <p className="font-semibold text-gray-700">Entradas y Salidas</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Material</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Tipo de Movimiento</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Cantidad</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Hora</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3">Barra de acero</td>
                  <td className="py-2 px-3">Entrada</td>
                  <td className="py-2 px-3">1000</td>
                  <td className="py-2 px-3">10:30<br/><span className="text-xs text-gray-500">a.m.</span></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3">Piezas de madera</td>
                  <td className="py-2 px-3">Salida</td>
                  <td className="py-2 px-3">50</td>
                  <td className="py-2 px-3">11:15<br/><span className="text-xs text-gray-500">a.m.</span></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3">Envolturas plásticas</td>
                  <td className="py-2 px-3">Entrada</td>
                  <td className="py-2 px-3">2000</td>
                  <td className="py-2 px-3">12:45<br/><span className="text-xs text-gray-500">p.m.</span></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3">Soportes metálicos</td>
                  <td className="py-2 px-3">Salida</td>
                  <td className="py-2 px-3">150</td>
                  <td className="py-2 px-3">2:00<br/><span className="text-xs text-gray-500">p.m.</span></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-3">Cajas de cartón</td>
                  <td className="py-2 px-3">Entrada</td>
                  <td className="py-2 px-3">500</td>
                  <td className="py-2 px-3">3:33<br/><span className="text-xs text-gray-500">p.m.</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Alertas de Inventario */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-black mb-2">Alertas de Inventario</h3>
            <p className="text-sm text-gray-500">Alertas de stock que necesitan su atención</p>
          </div>

          <div className="space-y-5">
            {/* Material X - Amarillo */}
            <div className="flex gap-4 p-5 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex-shrink-0">
                <div className="bg-yellow-300 w-12 h-12 rounded-lg flex items-center justify-center">
                  <img src={Alert} alt="Alerta" className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-black mb-1">Material X</h4>
                <p className="text-sm text-gray-600">El material 'fierro corrugado 1/2' esta por debajo del stock mínimo. Stock actual: 45, mínimo 100</p>
              </div>
            </div>

            {/* Material Y - Rojo */}
            <div className="flex gap-4 p-5 bg-red-50 rounded-lg border border-red-200">
              <div className="flex-shrink-0">
                <div className="bg-red-400 w-12 h-12 rounded-lg flex items-center justify-center">
                  <img src={Alert} alt="Alerta" className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-black mb-1">Material Y</h4>
                <p className="text-sm text-gray-600">El material 'Pintura latex Blanca' esta por debajo de stock mínimo. Stock actual: 8, mínimo 20</p>
              </div>
            </div>

            {/* Material Z - Naranja */}
            <div className="flex gap-4 p-5 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex-shrink-0">
                <div className="bg-orange-300 w-12 h-12 rounded-lg flex items-center justify-center">
                  <img src={Alert} alt="Alerta" className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-black mb-1">Material Z</h4>
                <p className="text-sm text-gray-600">El material 'Tuberia PVC 4' esta por debajo del stock mínimo. Stock actual: 20, mínimo 100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmInc;
