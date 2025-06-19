import {useContext, useState, useEffect} from "react";
import { TokenContext } from "../context/TokenContext";
import { DataContext } from "../context/DataContext";
import { LanguageContext } from "../context/LanguageContext";
import axios from "axios";
export default function Title(){
    const { language } = useContext(LanguageContext);
    const { route } = useContext(TokenContext); // Show Register, Authenticate, and Highlights if user login token does not exist (Not logged)
    const { games } = useContext(DataContext);
    const [ nombreLanzamiento, setNombreLanzamiento ] = useState("");
    const [ tituloGuia, setTituloGuia ] = useState("");
    const [ title, setTitle ] = useState("");
    const apiRoute = import.meta.env.VITE_API_URL;
    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        if(nombreLanzamiento){
            setTitle(nombreLanzamiento);
        }
        else {
            {language === "ES" && setTitle("Lanzamiento")}
            {language === "CA" && setTitle("Llançament")}
            {language === "EN" && setTitle("Release")}
        }
    }, [nombreLanzamiento]); //Cada vez que se cambie la ruta, se actualiza el título.

    useEffect(() => {
        if(tituloGuia){
            setTitle(tituloGuia);
        }
        else {
            {language === "ES" && setTitle("Guía")}
            {language === "CA" && setTitle("Guia")}
            {language === "EN" && setTitle("Guide")}
        }
    }, [tituloGuia]); //Cada vez que se cambie la ruta, se actualiza el título.
    const decodedRoute = decodeURIComponent(route);

    function updateTitle(){
        const gameMatch = route.match(/^\/Juego\/(.+)/); //Match the route with the game route
        if (gameMatch) {
            console.log(gameMatch);
            const nombre_inicial = decodeURIComponent(gameMatch[1]);
            console.log(nombre_inicial);
            const juego = games.find(game => game.nombre_inicial === nombre_inicial);
            if (juego) {
                setTitle(juego.nombre_inicial); //Set the title to the game name
            } else {
                {language === "ES" && setTitle("Juego")}
                {language === "CA" && setTitle("Joc")}
                {language === "EN" && setTitle("Game")}
            }
            return;
        }
        const releaseMatch = route.match(/^\/Lanzamiento\/(.+)/); //Match the route with the release route
        if (releaseMatch) {
            console.log(releaseMatch);
            const id = releaseMatch[1];
            axios.get(apiRoute + "gameRelease/" + id, {
                headers: {
                    "x-api-key": apiKey,
                    "Accept": "application/json"
                }
            })
            .then(response => {
                setNombreLanzamiento(response.data.data.nombre);
            })
            .catch(error => {
                console.error(error);
            })
            return;
        }
        const guideMatch = decodedRoute.match(/^\/Guía\/(.+)/); //Match the route with the guide route
        if (guideMatch) {
            console.log(guideMatch);
            const id = guideMatch[1];
            axios.get(apiRoute + "guide/" + id, {
                headers: {
                    "x-api-key": apiKey,
                    "Accept": "application/json"
                }
            })
            .then(response => {
                setTituloGuia(response.data.data.titulo);
            })
            .catch(error => {
                console.error(error);
            })
            return;
        }
        switch (decodedRoute) {
            case "/":
                language === "ES" && setTitle("¡Bienvenido a Fedora Walkthroughs!")
                language === "CA" && setTitle("Benvingut a Fedora Walkthroughs!")
                language === "EN" && setTitle("Welcome to Fedora Walkthroughs!")
                break;
            case "/Registro":
                language === "CA" && setTitle("Registre")
                language === "ES" && setTitle("Registro")
                language === "EN" && setTitle("Sign Up")
                break;
            case "/Autenticar":
                language === "CA" && setTitle("Autenticació")
                language === "ES" && setTitle("Autenticación")
                language === "EN" && setTitle("Log In")
                break;
            case "/Perfil":
                (language === "CA" || language === "ES") && setTitle("Perfil")
                language === "EN" && setTitle("Profile")
                break;
            case "/Juegos":
                language === "ES" && setTitle("Videojuegos")
                language === "CA" && setTitle("Videojocs")
                language === "EN" && setTitle("Videogames")
                break;
            case "/Guías":
                language === "ES" && setTitle("Guías")
                language === "CA" && setTitle("Guies")
                language === "EN" && setTitle("Guides")
                break;
            case "/Crear_Guía":
                language === "ES" && setTitle("Crea una Guía")
                language === "CA" && setTitle("Crea una Guia")
                language === "EN" && setTitle("Create a Guide")
                break;
            case "/Noticias":
                language === "ES" && setTitle("Noticias")
                language === "CA" && setTitle("Notícies")
                language === "EN" && setTitle("News")
                break;
            default: //No hace falta el default para dar el pego en el título mientras carga porque tengo una pantalla de carga en App.jsx aunque lo pondré igual por si alguien tiene un ordenador muy lento.
                language === "ES" && setTitle("¡Bienvenido a Fedora Walkthroughs!")
                language === "CA" && setTitle("Benvingut a Fedora Walkthroughs!")
                language === "EN" && setTitle("Welcome to Fedora Walkthroughs!")
                break;
        }
    }
    useEffect(() => {
        updateTitle();
    }, [route, language]); //Cada vez que se cambie la ruta, se actualiza el título.
    return(
        <h1 className={"text-center text-3xl font-bold italic flex-grow my-2 text-white"}>
            {title}
        </h1>
    )
}