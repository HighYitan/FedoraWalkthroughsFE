import {createContext, useContext, useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import { DataContext } from './DataContext';

export const TokenContext = createContext();

export const TokenContextProvider = ({children}) => {
    const apiRoute = import.meta.env.VITE_API_URL;
    const tokenCache = localStorage.getItem('tokenCache');
    const [token, setToken] = useState(tokenCache !== null ? JSON.parse(tokenCache) : null); // State to verify if the user is logged in
    const loginCache = localStorage.getItem('loginCache');
    const [login, setLogin] = useState(loginCache !== null ? JSON.parse(loginCache) : null); // State to store the user's information
    const correoCache = localStorage.getItem('correoCache');
    const [correo, setCorreo] = useState(correoCache !== null ? JSON.parse(correoCache) : null); // State to store the user's information
    const routes = useLocation(); // Hook to get the current route
    const [route, setRoute] = useState(); // State to store the current route
    const { games } = useContext(DataContext);
    const { guides } = useContext(DataContext);
    useEffect(() => {
        console.log(login);
        console.log(correo);
        if(typeof login !== 'object'){ // If login is still a string, it will replace it with the full information of the logged User, null is a type of object
            axios.get(apiRoute + "user/" + login, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            .then(response => {
                localStorage.setItem('correoCache', JSON.stringify(login));
                localStorage.setItem('loginCache', JSON.stringify(response.data.data));
                setCorreo(login);
                setLogin(response.data.data);
                console.log(response.data.data);
            })
            .catch(error => {
                console.error(error);
            })
        }
        else if (correo){
            axios.get(apiRoute + "user/" + correo, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            .then(response => {
                localStorage.setItem('correoCache', JSON.stringify(login.correo));
                localStorage.setItem('loginCache', JSON.stringify(response.data.data));
                setCorreo(login.correo);
                setLogin(response.data.data);
                console.log(response.data.data);
            })
            .catch(error => {
                console.error(error);
            })
        }
    }, [token, route, games, guides]); //Añadir route si no se actualiza el usuario al añadir puntuación, cuando se actualice una lista, debe incluirse aquí para actualizar las puntuaciones del usuario
    useEffect(() => {
        setRoute(routes.pathname);
    }, [routes.pathname]); //Cada vez que se cambie la ruta, se actualiza el título.
    console.log(route);

    return (
        <TokenContext.Provider value={{ token, setToken, login, setLogin, route, setRoute }}>
            {children}
        </TokenContext.Provider>
    )
}