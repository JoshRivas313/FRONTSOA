import LogoIcon from '../../assets/Login/Logicon.svg';
import MaqImage from '../../assets/Login/Maq.svg';
import FlechaIcon from '../../assets/Login/Reccontra/Flecha con cuadrado.svg';
import RecoveryForm from './RecoveryForm';

interface RecProps {
  onBack: () => void;
  onSubmit?: () => void;
}

const Rec = ({ onBack, onSubmit }: RecProps) => {
  
  const handleEmailSubmit = (email: string) => {
    console.log('Email enviado:', email);
    if (onSubmit) {
      onSubmit();
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

        <RecoveryForm onSubmit={handleEmailSubmit} />
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

export default Rec;