import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet,useNavigate} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PokemanCard from './components/PokemanCard.jsx';
import Cookies from 'js-cookie';
import PokemonDetail from './components/PokemonDetail';

const ProtectedRoutes = () => {
  const navigate = useNavigate();

  const auth = Cookies.get('auth_token'); // Check for if cookie exists 

    useEffect(() => {
    const interval = setInterval(() => {
      const currentToken = Cookies.get('auth_token');
      
      // If cookie is gone, force logout
      if (!currentToken) {
        localStorage.removeItem("currentUser"); 
        alert("Session Expired. Please login again.");
        navigate('/login');
      }
    }, 1000); 
    return () => clearInterval(interval);
  }, [navigate]);

  return auth ? <Outlet /> : <Navigate to="/login" />;
};
const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        
        <Route element={<ProtectedRoutes />}>  
          <Route path="/pokemon" element={<PokemanCard />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};


export default App;