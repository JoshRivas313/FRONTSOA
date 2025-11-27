interface RecoveryFormProps {
  title?: string;
  emailLabel?: string;
  submitButtonText?: string;
  helpText?: string;
  helpTextHighlight?: string;
  onSubmit?: (email: string) => void;
}

const RecoveryForm = ({
  title = "Recuperar contraseña",
  emailLabel = "Correo",
  submitButtonText = "Enviar",
  helpText = "Contáctanos.",
  helpTextHighlight = "¿No puedes recuperar tu clave?",
  onSubmit
}: RecoveryFormProps) => {
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      onSubmit(email);
    }
  };

  return (
    <div className="w-full max-w-xl -mt-10">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-left tracking-wide">
        {title}
      </h1>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Campo Email */}
        <div>
          <label className="block text-base md:text-lg font-medium text-gray-800 mb-3">
            {emailLabel}
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
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

        {/* Botón Enviar */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-[50%] mx-auto block bg-[#1C639F] text-white py-3 rounded-md font-medium text-lg hover:bg-[#155080] transition-colors duration-200"
          >
            {submitButtonText}
          </button>
        </div>
      </form>

      {/* Texto ayuda abajo izquierda */}
      <div className="absolute bottom-8 left-8">
        <p className="text-base md:text-lg text-gray-600">
          <span className="text-[#1C639F]">{helpTextHighlight}</span> {helpText}
        </p>
      </div>
    </div>
  );
};

export default RecoveryForm;
