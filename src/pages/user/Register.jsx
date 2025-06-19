import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TokenContext } from "../../context/TokenContext";
import { LanguageContext } from "../../context/LanguageContext";
import Alert from "../../components/Alert";
export default function Register(){
    const { setToken, setLogin } = useContext(TokenContext);
    const { language } = useContext(LanguageContext);
    const redirect = useNavigate(); // Hook to get the current route and be able to get back to the previous one.
    const [errors, setErrors] = useState({
        nombre: [],
        correo: [],
        contraseña: []
    });
    const apiRoute = import.meta.env.VITE_API_URL;

    function handleRegister(event) {
        event.preventDefault();

        axios.post(apiRoute + "register", {
            nombre: event.target.name.value,
            correo: event.target.email.value,
            contraseña: event.target.password.value
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
                    nombre: response.data.nombre,
                    correo: response.data.correo,
                    contraseña: response.data.contraseña
                });
                console.log(errors);
            }
        })
        .catch(error => {
            console.error("Error registering:", error);
            setErrors({
                nombre: response.data.nombre,
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
                    onSubmit={handleRegister}
                >
                    <label htmlFor="name" className={"m-4 font-bold text-white"}>
                        {
                            (language === "CA" ? ("Nom") :
                            language === "ES" ? ("Nombre") :
                            ("Name"))
                        }
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Máximo"
                        className="w-9/10 sm:w-19/20 p-1 bg-white"
                    />
                    {errors.nombre.length > 0 && <Alert type="danger" errors={errors.nombre}/>}
                    {/*<label htmlFor="surname" className={"m-4 font-bold text-white"}>
                        {
                            (language === "CA" ? ("Cognom") :
                            language === "ES" ? ("Apellido") :
                            ("Surname"))
                        }
                    </label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        placeholder="Red Tepes"
                        className="w-9/10 sm:w-19/20 p-1 bg-white"
                    />*/}
                    {/*errors.cognom.length > 0 && <Alert type="danger" errors={errors.cognom}/>*/}
                    <label htmlFor="email" className={"m-4 font-bold text-white"}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="maximo@protonmail.com"
                        className="w-9/10 sm:w-19/20 p-1 bg-white"
                    />
                    {errors.correo.length > 0 && <Alert type="danger" errors={errors.correo}/>}
                    {/*<label htmlFor="phone" className={"m-4 font-bold text-white"}>
                        {
                            (language === "CA" ? ("Telèfon") :
                            language === "ES" ? ("Teléfono") :
                            ("Phone"))
                        }
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="+34 666333999"
                        className="w-9/10 sm:w-19/20 p-1 bg-white"
                    />*/}
                    {/*errors.telèfon.length > 0 && <Alert type="danger" errors={errors.telèfon}/>*/}
                    <label htmlFor="password" className={"m-4 font-bold text-white"}>
                        {
                            (language === "CA" ? ("Contrasenya") :
                            language === "ES" ? ("Contraseña") :
                            ("Password"))
                        }
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Kek12?"
                        className="w-9/10 sm:w-19/20 p-1 bg-white"
                    />
                    {errors.contraseña.length > 0 && <Alert type="danger" errors={errors.contraseña}/>}
                    <button
                        id="register"
                        className={"text-center font-bold w-9/10 sm:w-19/20 py-2 my-6 rounded bg-red-950 text-white"}
                        type="submit"
                    >
                        {
                            (language === "CA" ? ("Registrar-se") :
                            language === "ES" ? ("Registrarse") :
                            ("Sign Up"))
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}