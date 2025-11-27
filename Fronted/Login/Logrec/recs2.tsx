import LogoIcon from '../../assets/Login/Logicon.svg';
import MaqImage from '../../assets/Login/Maq.svg';
import FlechaIcon from '../../assets/Login/Reccontra/Flecha con cuadrado.svg';

interface Recs2Props {
  onBack: () => void;
}

const Recs2 = ({ onBack }: Recs2Props) => {
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    
    if (password === confirmPassword) {
      console.log('Nueva contraseña establecida:', password);
      // Aquí puedes agregar tu lógica para cambiar la contraseña
    } else {
      console.log('Las contraseñas no coinciden');
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden animate-fadeIn">
      {/* Lado Izquierdo - Blanco con formulario */}
      <div className="w-8/12 -mr-24 bg-white flex items-center justify-center px-20 py-16 min-h-[90vh] rounded-r-[60px] rounded-l-none shadow-lg relative z-10">
        {/* Botón Volver arriba izquierda */}
        <button 
          type="button"
          onClick={onBack}
          className="absolute top-8 left-8 flex items-center gap-2 text-sm md:text-base text-[#1C639F] hover:text-white bg-gray-100 hover:bg-[#1C639F] hover:shadow-[0_0_20px_rgba(28,99,159,0.6)] px-4 py-2 rounded-lg transition-all duration-300 group"
        >
          <img src={FlechaIcon} alt="Volver" className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:invert" />
          Volver al inicio de sesión
        </button>

        <div className="w-full max-w-xl -mt-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-left tracking-wide">
            Nueva contraseña
          </h1>

          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Campo Nueva Contraseña */}
            <div>
              <label className="block text-base md:text-lg font-medium text-gray-800 mb-3">
                Ingresa tu nueva contraseña
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  className="w-full text-base md:text-lg px-4 py-2.5 pr-10 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#1C639F] transition-colors"
                  placeholder=""
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Campo Confirmar Contraseña */}
            <div>
              <label className="block text-base md:text-lg font-medium text-gray-800 mb-3">
                Vuelva a escribir la nueva contraseña
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full text-base md:text-lg px-4 py-2.5 pr-10 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#1C639F] transition-colors"
                  placeholder=""
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Botón Confirmar */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-[50%] mx-auto block bg-[#1C639F] text-white py-3 rounded-md font-medium text-lg hover:bg-[#155080] transition-colors duration-200"
              >
                Confirmar
              </button>
            </div>
          </form>

          {/* Texto ayuda abajo izquierda */}
          <div className="absolute bottom-8 left-8">
            <p className="text-base md:text-lg text-gray-600">
              <span className="text-[#1C639F]">¿Problemas para cambiar tu contraseña?</span> Contáctanos.
            </p>
          </div>
        </div>
      </div>

      {/* Lado Derecho - Azul con logo y maquinaria */}
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
    </div>
  );
};

export default Recs2;
