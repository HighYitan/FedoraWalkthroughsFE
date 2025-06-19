import { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { LanguageContext } from "../context/LanguageContext";
import { TokenContext } from "../context/TokenContext";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import Alert from "../components/Alert";
import axios from "axios";

export default function Guide() {
    const { id } = useParams();
    const { token, login } = useContext(TokenContext);
    const { guides, setGuides } = useContext(DataContext);
    const [ guide, setGuide ] = useState();
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
        axios.get(apiRoute + "guide/" + id, {
            headers: {
                "x-api-key": apiKey,
                "Accept": "application/json"
            }
        })
        .then(response => {
            setGuide(response.data.data);
        })
        .catch(error => {
            console.error(error);
        })
    }, [guides]);

    useEffect(() => {
        //console.log("AAAAAAAAAAAAAAAA", guide);
        console.log(login);
        if (guide) { // Ensure `guide` is updated before accessing it
            console.log("AAAAAAAAAAAAAAAA", guide);
            const userGuideScore = login.puntuaciones_guias && login.puntuaciones_guias.find(
                // No lo encontraría por id porque cada vez que se llama a guía se cambia el resultado de encriptación aunque el valor inicial sea el mismo.
                (score) => score.guia.id === guide.id || (score.guia.titulo === guide.titulo && score.guia.usuario.correo === guide.usuario.correo)
            );
            console.log("User Guide Score:", userGuideScore);
            console.log(userGuideScore);
            if (userGuideScore) {
                setUserScore(userGuideScore);
            }
        }
    }, [guide, login]); // Run when `guide` or `login` changes

    useEffect(() => {
        console.log(newScore);
        submitted && axios.post(apiRoute + "guideRating", { // POST request to the API to submit the score
            puntuacion: newScore.score,
            guia: guide.id,
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
            axios.get(apiRoute + "guide", {
                headers: {
                    Authorization: "Bearer " + token,
                    "Accept": "application/json"
                }
            })
            .then(response => {
                setGuides(response.data.data);
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
                {guide && (
                    <>
                        <div className="flex sm:flex-row flex-col justify-between">
                            <div className={"flex flex-col h-full justify-between space-x-5 mx-1 w-full lg:w-5/10 rounded-lg shadow-sm mt-4 border bg-gray-800 border-gray-700"}>
                                <div className="px-6 pb-2 mb-1 text-white">
                                    <div className="font-bold mb-2">
                                        {(language === "ES" ? "Autor: " : language === "CA" ? "Autor: " : "Author: ") + guide.usuario.nombre}
                                    </div>
                                    <div className="font-bold mb-2">
                                        {(language === "ES" ? "Lanzamiento: " : language === "CA" ? "Llançament: " : "Release: ") + guide.lanzamiento.nombre + " " + guide.lanzamiento.lanzamiento}
                                    </div>
                                    <div className="font-bold mb-2">
                                        {(language === "ES" ? "Idioma: " : language === "CA" ? "Llenguatge: " : "Language: ") + guide.idioma.nombre}
                                    </div>
                                    <div className="font-bold text-justify mb-2">
                                        {guide.puntuacion_media && (
                                            <>
                                                {(language === "ES" ? "Puntuación media: " : language === "CA" ? "Puntuació mitjana: " : "Average score: ") + (guide.puntuacion_media && guide.puntuacion_media + "/10")}
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
                                                id="guideForm"
                                                className="flex flex-col justify-center items-center"
                                                onSubmit={handleScore}
                                            >
                                                <label htmlFor="score" className={"m-4 font-bold text-white"}>
                                                    {
                                                        (language === "ES" ? ("Puntuar la guía") :
                                                        language === "CA" ? ("Puntuar la guia") :
                                                        ("Rate the guide"))
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
                                </div>
                            </div>
                            <div className={"flex flex-col h-full justify-between space-x-5 mx-1 w-full lg:w-5/10"}>
                                <div className="bg-gray-800 border-gray-700 border rounded-lg shadow-sm mt-4 mx-0">
                                    <div className="font-bold mb-2">
                                        <h1 className={"text-center font-bold py-2 text-4xl text-white"}>
                                            {(language === "ES" ?
                                                ("índice de la guía") :
                                            language === "CA" ?
                                                ("índex de la guia") :
                                                ("Guide Index"))}
                                        </h1>
                                    </div>
                                    {guide.contenidos.map((contenido, index) => (
                                        <div key={index} className="font-bold text-sm sm:text-xl flex items-center bg-gray-400 border-gray-300 my-1 w-full">
                                            <br></br>
                                            <div key={index} className="font-bold mb-2 text-center w-full">
                                                {contenido.nombre}
                                            </div>
                                            <br></br>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="container w-full sm:mx-auto pt-5">
                            <div className="grid grid-cols-1 gap-1 justify-items-center">
                                <div className="font-bold mb-2">
                                    <h1 className={"text-center font-bold py-2 text-3xl text-white"}>
                                        {(language === "ES" ?
                                            ("Noticia más reciente") :
                                        language === "CA" ?
                                            ("Notícia més recent") :
                                            ("Latest News"))}
                                    </h1>
                                </div>
                                <div className={"font-bold text-sm sm:text-xl flex items-center"}>
                                    <div className="w-full border rounded-lg shadow-sm mt-4 text-white bg-gray-900 border-white">
                                        <div className="px-6 pb-6 mb-1 text-white">
                                            {guide.contenidos.map((contenido, index) => (
                                                <div key={index}>
                                                    <div className="font-bold text-center text-3xl my-2">
                                                        {contenido.nombre}
                                                    </div>
                                                    <div className="font-bold text-justify mb-2">
                                                        {contenido.contenido}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}