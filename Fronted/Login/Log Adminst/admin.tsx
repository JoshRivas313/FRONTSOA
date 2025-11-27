import LogoIcon from '../../assets/Login/Logicon.svg';
import MaqImage from '../../assets/Login/Maq.svg';
import LoginForm from '../LogG/LoginForm';
import FlechaIcon from '../../assets/Login/Reccontra/Flecha con cuadrado.svg';

interface AdminProps {
  onForgotPassword?: () => void;
  onBack?: () => void;
  onLoginSuccess?: () => void;
}

const Admin = ({ onForgotPassword, onBack, onLoginSuccess }: AdminProps) => {
  
  const handleLogin = (username: string, password: string) => {
    console.log('Admin login:', username, password);
    
    // Aquí puedes agregar tu lógica de autenticación para admin
    // Por ahora, validación simple de ejemplo
    if (username && password) {
      // Simular validación exitosa
      console.log('Login exitoso para administrador');
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } else {
      alert('Por favor ingrese usuario y contraseña');
    }
  };

  const handleHelpClick = () => {
    console.log('Help clicked for admin');
    // Aquí puedes agregar tu lógica de ayuda
  };

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
        {/* Botón Volver arriba izquierda */}
        {onBack && (
          <button 
            type="button"
            onClick={onBack}
            className="absolute top-8 left-8 flex items-center gap-2 text-sm md:text-base text-[#1C639F] hover:text-white bg-gray-100 hover:bg-[#1C639F] hover:shadow-[0_0_20px_rgba(28,99,159,0.6)] px-4 py-2 rounded-lg transition-all duration-300 group"
          >
            <img src={FlechaIcon} alt="Volver" className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:invert" />
            Volver
          </button>
        )}
        
        <LoginForm 
          title="Iniciar Sesión"
          userLabel="Usuario"
          passwordLabel="Contraseña"
          submitButtonText="Acceder"
          forgotPasswordText="¿Olvidaste tu clave?"
          helpLinkText="¿Necesitas soporte técnico?"
          onForgotPassword={onForgotPassword}
          onSubmit={handleLogin}
          onHelpClick={handleHelpClick}
        />
      </div>
    </div>
  );
};

export default Admin;
