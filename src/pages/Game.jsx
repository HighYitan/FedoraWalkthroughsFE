import { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { LanguageContext } from "../context/LanguageContext";
import { TokenContext } from "../context/TokenContext";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import Alert from "../components/Alert";
import axios from "axios";

export default function Game() {
    const { nombre_inicial } = useParams();
    const { token, login } = useContext(TokenContext);
    const { games, setGames } = useContext(DataContext);
    const [ game, setGame ] = useState();
    const { language, setLanguage } = useContext(LanguageContext);
    const [submitted, setSubmitted] = useState(false); // State to check if the form has been submitted
    const [errors, setErrors] = useState({message:[]});
    const [newScore, setNewScore] = useState({
        score: ""
    });
    const apiRoute = import.meta.env.VITE_API_URL;
    const apiKey = import.meta.env.VITE_API_KEY;
    const [ userScore, setUserScore ] = useState(0);
    const langIndex = language === "ES" ? 0 : language === "CA" ? 1 : language === "EN" ? 2 : 0;

    useEffect(() => {
        //const foundGame = games.find(g => g.nombre_inicial === nombre_inicial);
        axios.get(apiRoute + "game/" + nombre_inicial, {
            headers: {
                "x-api-key": apiKey,
                "Accept": "application/json"
            }
        })
        .then(response => {
            setGame(response.data.data);
        })
        .catch(error => {
            console.error(error);
        })
        //setGame(foundGame);
    }, [games]);

    useEffect(() => {
        console.log(game);
        console.log(login);
        if (game) { // Ensure `game` is updated before accessing it
            const userGameScore = login.puntuaciones_juegos && login.puntuaciones_juegos.find(
                (score) => score.videojuego.nombre_inicial === game.nombre_inicial
            );
            console.log(userGameScore);
            if (userGameScore) {
                setUserScore(userGameScore);
            }
        }
    }, [game, login]); // Run when `game` or `login` changes

    useEffect(() => {
        console.log(newScore);
        submitted && axios.post(apiRoute + "gameRating", { // POST request to the API to submit the score
            puntuacion: newScore.score,
            videojuego: game.nombre_inicial,
            usuario: login.correo
        },
        {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(response => {
            console.log("Rating successful:", response.data);
            setSubmitted(false);
            setErrors({message:[]});
            console.log("Formulario enviado");
            axios.get(apiRoute + "game", {
                headers: {
                    Authorization: "Bearer " + token,
                    "Accept": "application/json"
                }
            })
            .then(response => {
                setGames(response.data.data);
            })
            .catch(error => {
                console.error("Error renovando los datos:", error);
                setErrors({
                    message: [error.response.data.message],
                });
            });
        })
        .catch(error => {
            console.error("Error:", error);
            setErrors({
                message: [error.response.data.message],
            });
            setSubmitted(false);
            setNewScore({
                puntuacion: 0,
            });
        });
    }, [newScore]);

    function handleScore(event) {
        event.preventDefault();

        const formData = new FormData(event.target); // Create a new FormData object
        const formJson = Object.fromEntries(formData.entries()); // Convert the FormData object to a JSON object

        setSubmitted(true);
        console.log("Form submitted with data:", formJson);
        setNewScore({
            score: Number(formJson.score).toFixed(2),
        });
    }
    console.log(login);
    return (
        <div className="flex sm:flex-row flex-col justify-between">
            <div className={"flex flex-col h-full justify-between space-x-5 mx-1 w-full bg-gray-800 border-gray-700 border rounded-lg shadow-sm mt-4"}>
                {game && (
                    <div className="w-full border rounded-lg shadow-sm mt-4 text-white bg-gray-900 border-white">
                        <img
                            className="p-3 max-h-500 w-full rounded-lg"
                            src={game.imagen}
                            alt={game.titulo}
                        />
                        <div className="px-6 pb-2 mb-1 text-white">
                            <div className="font-bold text-justify mb-2">
                                {game.puntuacion_media && (
                                    <>
                                        {(language === "ES" ? "Puntuación media: " : language === "CA" ? "Puntuació mitjana: " : "Average score: ") + (game.puntuacion_media && game.puntuacion_media + "/10")}
                                    </>
                                )}
                            </div>
                            {!token ? (
                                <div className="font-bold text-justify mb-2">
                                    {(language === "ES" ? "¡Inicia sesión y puntúa!" : language === "CA" ? "Inicia sessió i puntua!" : "Log in and rate!")}
                                </div>
                            ) : (
                                <>
                                    {userScore ? (
                                        <div className="font-bold text-justify mb-2">
                                            {(language === "ES" ? "Tu puntuación: " : language === "CA" ? "La teva puntuació: " : "Your score: ") + (userScore && (userScore.puntuacion + "/10"))}
                                        </div>
                                    ) : ""}
                                    <form
                                        id="gameForm"
                                        className="flex flex-col justify-center items-center"
                                        onSubmit={handleScore}
                                    >
                                        <label htmlFor="score" className={"m-4 font-bold text-white"}>
                                            {
                                                (language === "ES" ? ("Puntuar el videojuego") :
                                                language === "CA" ? ("Puntuar el videojoc") :
                                                ("Rate the game"))
                                            }
                                        </label>
                                        <input
                                            name="score"
                                            type="number"
                                            placeholder="9.50"
                                            min="0.00"
                                            max="10.00"
                                            step="0.01"
                                            className="w-2/10 p-1 bg-white text-black"
                                            value={newScore.score}
                                            onChange={(e) => setNewScore({ ...newScore, score: e.target.value })}
                                        />
                                        <button
                                            id="scoreButton"
                                            className={"text-center font-bold w-3/10 sm:w-2/10 py-2 my-4 rounded bg-red-950 text-white"}
                                            type="submit"
                                        >
                                            {
                                                (language === "CA" ? ("Puntuar") :
                                                language === "ES" ? ("Puntuar") :
                                                ("Rate"))
                                            }
                                        </button>
                                        {errors.message.length > 0 && <Alert type="danger" errors={errors.message}/>}
                                    </form>
                                </>
                            )}
                            <div className="font-bold text-justify mb-2">
                                {(language === "ES" ? "Géneros: " : language === "CA" ? "Gèneres: " : "Genres: ")}
                                {game.generos.map((genero, index) => (
                                    <>
                                        {(genero.traducciones[langIndex].nombre && genero.traducciones[langIndex].nombre + " ")}
                                    </>
                                ))}
                            </div>
                            <div className="font-bold text-justify mb-2">
                                {(language === "ES" ? "Descripción: " : language === "CA" ? "Descripció: " : "Description: ")}
                                {game.traducciones.map((traduccion, index) => (
                                    <>
                                        {(game.traducciones[langIndex] && game.traducciones[langIndex].descripcion)}
                                    </>
                                ))}
                            </div>
                            <div className="font-bold text-justify mb-2 break-all">
                                {game.web && (
                                    <NavLink to={game.web} target="_blank">
                                        {language === "ES" ? "Página web: " : language === "CA" ? "Pàgina web: " : "Website: "}
                                        {game.web}
                                    </NavLink>
                                )}
                            </div>
                            <div className="font-bold text-justify mb-2 break-all">
                                {game.video && (
                                    <NavLink to={game.video} target="_blank">
                                        {language === "ES" ? "Vídeo: " : language === "CA" ? "Vídeo: " : "Video: "}
                                        {game.video}
                                    </NavLink>
                                )}
                            </div>
                            <div className="font-bold text-justify mb-2">
                                {(language === "ES" ? "Lanzamientos: " : language === "CA" ? "Lanzamiento: " : "Releases: ")}
                                {game.lanzamientos.map((lanzamiento, index) => (
                                    <NavLink key={index} to={"/Lanzamiento/" + lanzamiento.id} className={"font-bold text-sm sm:text-xl flex items-center bg-gray-400 border-gray-300 my-1 w-full"}>
                                        <div className="px-2 py-2 mb-1 flex flex-col justify-center items-center flex-1 w-40 h-40">
                                            <div className="font-bold mb-2 text-center">
                                                {lanzamiento.nombre}
                                            </div>
                                            <div className="font-bold mb-2 text-center">
                                                {lanzamiento.lanzamiento}
                                            </div>
                                            <div className="font-bold mb-2 text-center">
                                                {lanzamiento.region.traducciones[langIndex].region}
                                            </div>
                                        </div>
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}