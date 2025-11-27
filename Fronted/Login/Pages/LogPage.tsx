import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logg from '../LogG/logg';
import Admin from '../Log Adminst/admin';
import Almc from '../Log Almc/almc';
import Rec from '../Logrec/rec';
import Recs1 from '../Logrec/recs1';
import Recs2 from '../Logrec/recs2';


export default function LogPage() {
  const [currentView, setCurrentView] = useState<'login' | 'admin' | 'almacenero' | 'recovery' | 'recovery-step2' | 'recovery-step3'>('login');
  const navigate = useNavigate();

  return (
    <>
      {currentView === 'login' && (
        <Logg 
          onSelectAdmin={() => setCurrentView('admin')} 
          onSelectAlmacenero={() => setCurrentView('almacenero')} 
        />
      )}
      {currentView === 'admin' && (
        <Admin 
          onBack={() => setCurrentView('login')} 
          onForgotPassword={() => setCurrentView('recovery')}
          onLoginSuccess={() => navigate('/admin')} 
        />
      )}
      {currentView === 'almacenero' && (
        <Almc 
          onBack={() => setCurrentView('login')} 
          onForgotPassword={() => setCurrentView('recovery')}
          onLoginSuccess={() => navigate('/almacenero')} 
        />
      )}
      {currentView === 'recovery' && (
        <Rec 
          onBack={() => setCurrentView('login')} 
          onSubmit={() => setCurrentView('recovery-step2')} 
        />
      )}
      {currentView === 'recovery-step2' && (
        <Recs1 
          onBack={() => setCurrentView('login')} 
          onSubmit={() => setCurrentView('recovery-step3')} 
        />
      )}
      {currentView === 'recovery-step3' && (
        <Recs2 onBack={() => setCurrentView('login')} />
      )}
    </>
  );
}
