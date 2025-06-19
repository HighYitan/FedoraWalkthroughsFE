import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TokenContext } from "../../context/TokenContext";
import { LanguageContext } from "../../context/LanguageContext";
import Alert from "../../components/Alert";
import ResetPassword from "../../components/ResetPassword";
export default function Login(){
    const { setToken, setLogin } = useContext(TokenContext);
    const { language } = useContext(LanguageContext);
    const redirect = useNavigate(); // Hook to get the current route and be able to get back to the previous one.
    const [errors, setErrors] = useState({message:[]});
    const [reset, setReset] = useState(false);
    const apiRoute = import.meta.env.VITE_API_URL;

    function handleLogin(event) {
        event.preventDefault();

        axios.post(apiRoute + "login", {
            correo: event.target.email.value,
            contraseña: event.target.password.value
        })
        .then(response => {
            console.log("Login successful:", response.data);
            if(response.data.baneado === "N"){
                setLogin( // Set the user's email in the context.
                    response.data.correo
                );
                localStorage.setItem('tokenCache', JSON.stringify(response.data.token_acceso)); // Save the token in localStorage.
                setToken(response.data.token_acceso);
                console.log("Formulario enviado");
                redirect("/");
            }
            else{
                console.error("User is banned:", response.data);
                setErrors({
                    message: ["El usuario está baneado. No puede iniciar sesión."],
                });
                //redirect("/");
            }
        })
        .catch(error => {
            console.error("Error logging:", error);
            setErrors({
                message: [error.response.data.message],
            });
        });
    }
    return(
        <>
            {reset ? <ResetPassword setReset={setReset} /> :
                <div className="flex justify-center">
                    <div className={"w-9/10 rounded-lg shadow-sm mt-4 border bg-gray-800 border-gray-700"}>
                        <form
                            className="flex flex-col justify-center items-center"
                            onSubmit={handleLogin}
                        >
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
                            {errors.message.length > 0 && <Alert type="danger" errors={errors.message}/>}
                            <div className="flex justify-between w-9/10 sm:w-19/20">
                                <button
                                    id="reset"
                                    className={"text-center font-bold w-1/2 py-2 my-6 rounded mr-2 bg-red-950 text-white"}
                                    type="button"
                                    onClick={() => setReset(true)}
                                >
                                    {
                                        (language === "CA" ? ("Contrasenya oblidada?") :
                                        language === "ES" ? ("¿Contraseña olvidada?") :
                                        ("Forgot password?"))
                                    }
                                </button>
                                <button
                                    id="login"
                                    className={"text-center font-bold w-1/2 py-2 my-6 rounded ml-2 bg-red-950 text-white"}
                                    type="submit"
                                >
                                    {
                                        (language === "CA" ? ("Autenticar-se") :
                                        language === "ES" ? ("Autenticarse") :
                                        ("Log in"))
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}