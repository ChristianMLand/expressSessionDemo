import { Routes, Route } from 'react-router-dom';
import { Home, Dashboard, NotFound } from '~/views';
import { AuthContext } from './components';

export default function App() {
  return (
    <AuthContext>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </AuthContext>
  );
}
