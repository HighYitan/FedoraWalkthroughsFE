import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../context/DataContext";
import { TokenContext } from "../context/TokenContext";
import { LanguageContext } from "../context/LanguageContext";
import Alert from "../components/Alert";
export default function CreateGuide() {
    const { setToken, setLogin } = useContext(TokenContext);
    const { token, login } = useContext(TokenContext);
    const { language } = useContext(LanguageContext);
    const { gameReleases } = useContext(DataContext);
    const { languages } = useContext(DataContext);
    const redirect = useNavigate(); // Hook to get the current route and be able to get back to the previous one.
    const [errors, setErrors] = useState({
        titulo: [],
        correo: [],
        contraseña: []
    });
    const apiRoute = import.meta.env.VITE_API_URL;
    const [contenidos, setContenidos] = useState([{ nombre: "", contenido: "" }]);

    const addContenido = () => {
        setContenidos([...contenidos, { nombre: "", contenido: "" }]);
    };

    const removeContenido = () => {
        if (contenidos.length > 1) {
            setContenidos(contenidos.slice(0, -1));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            titulo: event.target.titulo.value,
            lanzamiento_id: event.target.lanzamiento_id.value,
            idioma: event.target.idioma.value,
            contenidos: contenidos, // Pass the contenidos array
            correo: event.target.correo.value
        };

        console.log("Form data to be sent:", formData);

        axios.post(apiRoute + "guide", formData,
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Accept": "application/json"
                }
            }
        )
            .then((response) => {
                console.log("Guide created successfully:", response.data);
            })
            .catch((error) => {
                console.error("Error creating guide:", error);
            });
    };

    function handleRegister(event) {
        event.preventDefault();

        axios.post(apiRoute + "register", {
            titulo: event.target.titulo.value,
            
            lanzamiento_id: event.target.lanzamiento_id.value,
            idioma: event.target.idioma.value,
            correo: event.target.correo.value,
        })
        .then(response => {
            if(response.data.token_acceso){
                console.log("Registration successful:", response.data);
                localStorage.setItem('tokenCache', JSON.stringify(response.data.token_acceso));
                setToken(response.data.token_acceso);
                setLogin(
                    response.data.correo
                );
                console.log("Formulario enviado");
                redirect("/");
            }
            else{
                console.error("Error registering:", response.data);
                setErrors({
                    titulo: response.data.titulo,
                    correo: response.data.correo,
                    contraseña: response.data.contraseña
                });
                console.log(errors);
            }
        })
        .catch(error => {
            console.error("Error registering:", error);
            setErrors({
                titulo: response.data.titulo,
                correo: response.data.correo,
                contraseña: response.data.contraseña
            });
            console.log(errors);
        });
    }

    return(
        <div className="flex justify-center pb-4 mb-4">
            <div className={"w-9/10 rounded-lg shadow-sm mt-4 border bg-gray-800 border-gray-700"}>
                <form
                    className="flex flex-col justify-center items-center"
                    onSubmit={handleSubmit}
                >
                    <input type="hidden" name="correo" value={login.correo} />
                    <label htmlFor="titulo" className={"m-4 font-bold text-white"}>
                        {
                            (language === "CA" ? ("Títol") :
                            language === "ES" ? ("Título") :
                            ("Title"))
                        }
                    </label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        placeholder="Guía de..."
                        className="w-9/10 sm:w-19/20 p-1 bg-white"
                    />
                    {errors.titulo.length > 0 && <Alert type="danger" errors={errors.titulo}/>}
                    <label htmlFor="lanzamiento_id" className="m-4 font-bold text-white">
                        {
                            (language === "CA" ? ("Llançament") :
                            language === "ES" ? ("Lanzamiento") :
                            ("Release"))
                        }
                    </label>
                    <select name="lanzamiento_id" className="w-9/10 sm:w-19/20 p-1 bg-white">
                        {gameReleases.map((gameRelease, index) => (
                            <option key={index} value={gameRelease.id}>
                                {gameRelease.nombre}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="idioma" className="m-4 font-bold text-white">
                        {
                            (language === "CA" ? ("Idioma de la guia") :
                            language === "ES" ? ("Idioma de la guía") :
                            ("Guide language"))
                        }
                    </label>
                    <select name="idioma" className="w-9/10 sm:w-19/20 p-1 bg-white">
                        {languages.map((language, index) => (
                            <option key={index} value={language.abreviatura}>
                                {language.nombre}
                            </option>
                        ))}
                    </select>
                    {contenidos.map((item, index) => (
                        <div key={index} className="flex flex-col gap-2 mb-2 w-full items-center justify-center">
                            <label className="m-4 font-bold text-white">Sección</label>
                            <input
                                type="text"
                                name={`contenidos[${index}][nombre]`}
                                placeholder="Nombre"
                                value={item.nombre}
                                onChange={(e) => {
                                    const updatedContenidos = [...contenidos];
                                    updatedContenidos[index].nombre = e.target.value;
                                    setContenidos(updatedContenidos);
                                }}
                                className="w-9/10 sm:w-19/20 p-1 bg-white"
                            />
                            <label className="m-4 font-bold text-white">Contenido</label>
                            <textarea
                                name={`contenidos[${index}][contenido]`}
                                placeholder="Contenido"
                                value={item.contenido}
                                onChange={(e) => {
                                    const updatedContenidos = [...contenidos];
                                    updatedContenidos[index].contenido = e.target.value;
                                    setContenidos(updatedContenidos);
                                }}
                                className="w-9/10 sm:w-19/20 p-1 bg-white"
                                rows="5"
                            ></textarea>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addContenido}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold px-2 py-1 my-2 rounded"
                    >
                        Añadir contenido
                    </button>
                    <button
                        type="button"
                        onClick={removeContenido}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 my-2 rounded"
                    >
                        Eliminar contenido
                    </button>
                    <button
                        id="crear"
                        className={"text-center font-bold w-9/10 sm:w-19/20 py-2 my-6 rounded bg-red-950 text-white"}
                        type="submit"
                    >
                        {
                            (language === "CA" ? ("Crear") :
                            language === "ES" ? ("Crear") :
                            ("Create"))
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}