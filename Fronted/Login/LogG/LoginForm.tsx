import { useState } from 'react';

interface LoginFormProps {
  title?: string;
  userLabel?: string;
  passwordLabel?: string;
  submitButtonText?: string;
  forgotPasswordText?: string;
  helpLinkText?: string;
  onForgotPassword?: () => void;
  onSubmit?: (username: string, password: string) => void;
  onHelpClick?: () => void;
}

const LoginForm = ({
  title = "Iniciar Sesión",
  userLabel = "Usuario",
  passwordLabel = "Contraseña",
  submitButtonText = "Entrar",
  forgotPasswordText = "¿Has olvidado tu contraseña?",
  helpLinkText = "¿Necesitas ayuda?",
  onForgotPassword,
  onSubmit,
  onHelpClick
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showUser, setShowUser] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      const formData = new FormData(e.currentTarget);
      const username = formData.get('username') as string;
      const password = formData.get('password') as string;
      onSubmit(username, password);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
        {title}
      </h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Campo Usuario */}
        <div>
          <label className="block text-base md:text-lg font-medium text-gray-800 mb-2">
            {userLabel}
          </label>
          <div className="relative">
            <input
              type={showUser ? 'text' : 'password'}
              name="username"
              className="w-full text-base md:text-lg px-4 py-2.5 pr-10 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#1C639F] transition-colors"
              placeholder=""
              required
            />
            <button
              type="button"
              onClick={() => setShowUser(!showUser)}
              aria-label={showUser ? 'Ocultar usuario' : 'Mostrar usuario'}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {/* Icono usuario único */}
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Campo Contraseña */}
        <div>
          <label className="block text-base md:text-lg font-medium text-gray-800 mb-2">
            {passwordLabel}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full text-base md:text-lg px-4 py-2.5 pr-10 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#1C639F] transition-colors"
              placeholder=""
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                /* ojo abierto: mostrar contraseña */
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                /* ojo cerrado (eye-off) - versión más estándar */
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 012.402-3.637" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.1 6.1A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.967 9.967 0 01-4.132 5.06" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Link olvidaste contraseña */}
        {onForgotPassword && (
          <div className="flex justify-end pt-1 pr-45">
            <button 
              type="button"
              onClick={onForgotPassword}
              className="text-sm md:text-base text-red-600 hover:text-red-700 bg-transparent border-none cursor-pointer"
            >
              {forgotPasswordText}
            </button>
          </div>
        )}

        {/* Botón Entrar */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-[60%] mx-auto block bg-[#1C639F] text-white py-3 rounded-md font-medium text-lg hover:bg-[#155080] transition-colors duration-200"
          >
            {submitButtonText}
          </button>
        </div>
      </form>

      {/* Link necesitas ayuda - moved to bottom of panel */}
      {(helpLinkText || onHelpClick) && (
        <div className="absolute bottom-8 right-12">
          <button
            type="button"
            onClick={onHelpClick}
            className="text-base text-blue-600 hover:text-blue-700 bg-transparent border-none cursor-pointer"
          >
            {helpLinkText}
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
