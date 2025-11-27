import LogoIcon from '../../assets/Login/Logicon.svg';
import MaqImage from '../../assets/Login/Maq.svg';

interface LoggProps {
  onSelectAdmin: () => void;
  onSelectAlmacenero: () => void;
}

const Logg = ({ onSelectAdmin, onSelectAlmacenero }: LoggProps) => {

  return (
  <div className="flex h-screen w-full overflow-hidden">
      {/* Lado Izquierdo*/}
      <div className="w-5/12 bg-[#1C639F] flex flex-col items-center justify-between py-12 px-8">
        <div className="flex items-center gap-3 text-white pt-32">
          <img src={LogoIcon} alt="Logo Bugatti" className="w-96 h-auto" />
        </div>

        {/* Ilustración de la ciudad */}
        <div className="flex items-center justify-center w-full pb-32">
          <img src={MaqImage} alt="Maquinaria" className="w-full max-w-lg" />
        </div>

        <div></div>
      </div>

      {/* Lado Derecho - Blanco con formulario */}
      <div className="w-8/12 -ml-24 bg-white flex items-center justify-center px-20 py-24 min-h-[90vh] rounded-l-[60px] rounded-r-none shadow-lg relative z-10">
        <div className="w-full max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
            Inicio de sesión
          </h1>

          {/* Selección de tipo de trabajador */}
          <div className="mb-8">
            <p className="text-lg font-medium text-gray-800 mb-6 text-center">
              Seleccione Tipo de trabajador
            </p>
            
            <div className="flex justify-center gap-12">
              {/* Círculo Administrador */}
              <button
                type="button"
                onClick={onSelectAdmin}
                className="flex flex-col items-center gap-3 transition-all duration-300 hover:scale-110"
              >
                <div className="w-32 h-32 rounded-full flex items-center justify-center border-4 bg-white border-gray-300 hover:border-[#1C639F] hover:bg-[#1C639F] hover:shadow-lg transition-all duration-300 group">
                  <svg className="w-16 h-16 text-gray-500 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-base font-medium text-gray-700 group-hover:text-[#1C639F] transition-colors duration-300">
                  Administrador
                </span>
              </button>

              {/* Círculo Almacenero */}
              <button
                type="button"
                onClick={onSelectAlmacenero}
                className="flex flex-col items-center gap-3 transition-all duration-300 hover:scale-110"
              >
                <div className="w-32 h-32 rounded-full flex items-center justify-center border-4 bg-white border-gray-300 hover:border-[#1C639F] hover:bg-[#1C639F] hover:shadow-lg transition-all duration-300 group">
                  <svg className="w-16 h-16 text-gray-500 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <span className="text-base font-medium text-gray-700 group-hover:text-[#1C639F] transition-colors duration-300">
                  Almacenero
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logg;
