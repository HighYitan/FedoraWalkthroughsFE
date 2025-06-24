import './assets/css/App.css'
import { useContext } from 'react';
import fedora from "./assets/img/Fedora Team.png";
import Header from './components/Header';
//import Comments from '../pages/Comments';
//import Title from './Title';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DataContext } from './context/DataContext';
import { TokenContext } from './context/TokenContext';
//import {FilterContextProvider} from './context/FilterContext';
import Footer from './components/Footer';
import Loading from './components/Loading';
import Index from './pages/Index';
import Games from './pages/Games';
import Game from './pages/Game';
import Title from './components/Title';
import News from './pages/News';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import Profile from './pages/user/Profile';
import Guides from './pages/Guides';
import Guide from './pages/Guide';
import CreateGuide from './pages/CreateGuide';

export default function App() {
  const { loading } = useContext(DataContext); // Loading data from the API.
  const { token } = useContext(TokenContext); // Redirect to Index if the user is not logged.
  return (
    <>
      {loading ? <Loading /> :
        <div className="min-h-screen h-full w-full bg-violet-950">
          <Header />
          <Title />
          <main className="pb-20 mb-20">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/Juegos" element={<Games />} />
              <Route path="/Juego/:nombre_inicial" element={<Game />} />
              <Route path="/Guías" element={<Guides />} />
              <Route path="/Guía/:id" element={<Guide />} />
              <Route path="/Noticias" element={<News />} />
              {!token ? ( // If the user is not logged, allow the routes to Register and Login.
                  <>
                      <Route path="/Registro" element={<Register />} />
                      <Route path="/Autenticar" element={<Login />} />
                  </>
                  ) : ( // If the user is logged, allow the routes to Profile
                  <>
                      <Route path="/Perfil" element={<Profile />}/>
                      <Route path="/Crear_Guía" element={<CreateGuide />} />
                  </>)
              }
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      }
    </>
  )
}