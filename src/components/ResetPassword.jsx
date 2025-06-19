import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { LanguageContext } from "../context/LanguageContext";
import Alert from "./Alert"; 
export default function ResetPassword({setReset}){
    const [errors, setErrors] = useState({message:[]});
    const { language } = useContext(LanguageContext);
    const [form, setForm] = useState({ // Form fields
        nombre: "",
        //cognom: "",
        correo: "",
        //telèfon: "",
        contraseña: ""
    });
    const [user, setUser] = useState([]); // User data

    const apiKey = import.meta.env.VITE_API_KEY; // API key for the backend to reset the password
    const apiRoute = import.meta.env.VITE_API_URL;

    function handleUpdate() {
        console.log(user.correo);
        console.log(form);
        axios.put(apiRoute + "user/" + user.correo, form, { // Update the user data
            headers: {
                "x-api-key": apiKey,
                "Accept": "application/json",
            },
        })
        .then(response => {
            console.log("Update successful:", response.data);

            setErrors({ // Reset errors
                message: [],
            });
            console.log("Formulario enviado");
            setReset(false);
        })
        .catch(error => {
            //console.log(error.response.data.errors);
            console.log(error);
            setErrors({ // Set the errors
                message: error.response.data.errors.contraseña,
            });
        });
    }
    useEffect(() => {
        if(user.correo){ // If the user data is loaded
            if(user.nombre === form.nombre && user.correo === form.correo){
                handleUpdate(); // Update the user data
            }
            else{ // If the user data is not correct
                setErrors({ message: ((language === "CA") ? ["Les credencials no són vàlides"] : (language === "ES") ? ["Las credenciales no son válidas"] : ["The credentials are not valid"])});
            }
        }
    }, [user, language]);

    function handleReset(event){
        event.preventDefault();
        const formData = { // Get the form data
            nombre: event.target.name.value,
            //cognom: event.target.surname.value,
            correo: event.target.email.value,
            //telèfon: event.target.phone.value,
            contraseña: event.target.password.value
        };
        axios.get(apiRoute + "user/" + formData.correo, { // Get the user data from the database
            headers: {
                "x-api-key": apiKey,
                "Accept": "application/json"
            }
        })
        .then(response => {
            setForm(formData); // Set the form data
            setUser(response.data.data); // Set the user data
        })
        .catch(error => {
            setErrors({ message: ((language === "CA") ? ["Les credencials no són vàlides"] : (language === "ES") ? ["Las credenciales no son válidas"] : ["The credentials are not valid"])});
            console.error(error);
        })
    }
    return(
        <div className="flex justify-center">
            <div className={"w-9/10 rounded-lg shadow-sm mt-4 border bg-gray-800 border-gray-700"}>
                <h1 className={"text-center font-bold py-2 mx-2 text-2xl text-white"}>
                    {
                        (language === "CA" ? ("Respon aquestes preguntes de seguretat correctament per restablir la teva contrasenya") :
                        language === "ES" ? ("Responde estas preguntas de seguridad correctamente para reestablecer tu contraseña") :
                        ("Answer these security questions correctly to reset your password"))
                    }
                </h1>
                <form
                    className="flex flex-col justify-center items-center"
                    onSubmit={handleReset}
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
                    <h1 className={"text-center font-bold py-2 mx-2 text-2xl text-white"}>
                    {
                        (language === "CA" ? ("Si has respost correctament a les preguntes de seguretat, introdueix la teva nova contrasenya i prem el botó de reset") :
                        language === "ES" ? ("Si has respondido correctamente a las preguntas de seguridad, introduce tu nueva contraseña y pulsa el botón de reset") :
                        ("If you have answered the security questions correctly, enter your new password and press the reset button"))
                    }
                    </h1>
                    <label htmlFor="password" className={"m-4 font-bold text-white"}>
                        {
                            (language === "CA" ? ("Nova Contrasenya") :
                            language === "ES" ? ("Nueva Contraseña") :
                            ("New Password"))
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
                            id="cancel"
                            className={"text-center font-bold w-1/2 py-2 my-6 rounded mr-2 bg-red-950 text-white"}
                            type="button"
                            onClick={() => setReset(false)}
                        >
                            {
                            (language === "CA" ? ("Cancel·lar") :
                            language === "ES" ? ("Cancelar") :
                            ("Cancel"))
                            }
                        </button>
                        <button
                            id="resetPassword"
                            className={"text-center font-bold w-1/2 py-2 my-6 rounded ml-2 bg-red-950 text-white"}
                            type="submit"
                        >
                            {
                            (language === "CA" ? ("Reset contrasenya") :
                            language === "ES" ? ("Reset contraseña") :
                            ("Reset password"))
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}