import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { TokenContext } from "../context/TokenContext";
import { LanguageContext } from "../context/LanguageContext";
import Alert from "./Alert";
export default function EditProfile(){
    const { language } = useContext(LanguageContext);
    const { token, login, setLogin, correo, setCorreo } = useContext(TokenContext);
    const [errors, setErrors] = useState({ // Initialize errors object with empty arrays
        nombre: [],
        //cognom: [],
        correo: [],
        //telèfon: [],
        contraseña: []
    });
    const [updated, setUpdated] = useState(false);
    // Retrieve existing loginCache from localStorage
    const existingLoginCache = JSON.parse(localStorage.getItem('loginCache')) || {};
    const apiRoute = import.meta.env.VITE_API_URL;

    function handleUpdate(event) {
        event.preventDefault();

        const formData = { // Create formData object with form values
            nombre: event.target.name.value,
            //cognom: event.target.surname.value,
            correo: event.target.email.value,
            //telèfon: event.target.phone.value,
            contraseña: event.target.password.value
        };
        axios.put(apiRoute + "user/" + login.correo, formData, { // Update user data
            headers: {
                Authorization: "Bearer " + token, // Send user token in request header
                "Accept": "application/json",
            },
        })
        .then(response => {
            console.log("Update successful:", response.data);

            // Merge existing loginCache with new values
            const updatedLoginCache = {
                ...existingLoginCache,
                nombre: response.data.data.nombre,
                //cognom: response.data.data.cognom,
                correo: response.data.data.correo,
                //telèfon: response.data.data.telèfon
            };
            // Save updated loginCache to localStorage
            localStorage.setItem('correoCache', JSON.stringify(login.correo));
            localStorage.setItem('loginCache', JSON.stringify(updatedLoginCache));

            setCorreo(login.correo);
            setLogin(prevLogin => ({
                ...prevLogin,
                nombre: response.data.data.nombre,
                //cognom: response.data.data.cognom,
                correo: response.data.data.correo,
                //telèfon: response.data.data.telèfon
            }));

            setErrors({
                nombre: [],
                //cognom: [],
                correo: [],
                //telèfon: [],
                contraseña: []
            });

            setUpdated(true); // Set updated to true to display success message
            console.log("Formulario enviado");
        })
        .catch(error => {
            console.error("Error updating:", error.response.data.errors);
            setErrors({ // Set errors object with error messages
                nombre: error.response.data.errors.nombre,
                //cognom: error.response.data.errors.cognom,
                correo: error.response.data.errors.correo,
                //telèfon: error.response.data.errors.telèfon,
                contraseña: error.response.data.errors.contraseña
            });
            console.log(errors);
        });
    }

    return(
        <>
            <h1 className={"flex justify-center items-center text-2xl rounded-lg shadow-sm font-bold py-2 mx-1 mt-4 text-white"}>
                {(language === "CA" || language === "ES") ? "Editar Perfil" : "Edit Profile"}
            </h1>
            <form
                className="flex flex-col justify-center items-center"
                onSubmit={handleUpdate}
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
                    defaultValue={login.nombre}
                    className="w-9/10 sm:w-19/20 p-1 bg-white"
                />
                {errors.nombre && errors.nombre.length > 0 && <Alert type="danger" errors={errors.nombre}/>}
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
                    defaultValue={login.cognom}
                    className="w-9/10 sm:w-19/20 p-1 bg-white"
                />*/}
                {/*errors.cognom && errors.cognom.length > 0 && <Alert type="danger" errors={errors.cognom}/>*/}
                <label htmlFor="email" className={"m-4 font-bold text-white"}>
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={login.correo}
                    className="w-9/10 sm:w-19/20 p-1 bg-white"
                />
                {errors.correo && errors.correo.length > 0 && <Alert type="danger" errors={errors.correo}/>}
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
                    defaultValue={login.telèfon}
                    className="w-9/10 sm:w-19/20 p-1 bg-white"
                />*/}
                {/*errors.telèfon && errors.telèfon.length > 0 && <Alert type="danger" errors={errors.telèfon}/>*/}
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
                {errors.contraseña && errors.contraseña.length > 0 && <Alert type="danger" errors={errors.contraseña}/>}
                <button
                    id="update"
                    className={"text-center font-bold w-9/10 sm:w-19/20 py-2 my-4 rounded bg-red-950 text-white"}
                    type="submit"
                >
                    {
                        (language === "CA" ? ("Actualitzar perfil") :
                        language === "ES" ? ("Actualizar perfil") :
                        ("Update profile"))
                    }
                </button>
                {(updated && errors.nombre && errors.nombre.length === 0 && errors.correo.length === 0 && errors.contraseña.length === 0) && <Alert type="success" errors={language === "CA" ? ["Actualització satisfactòria"] : language === "ES" ? ["Actualización satisfactoria"] : ["Update successful"]}/>}
            </form>
        </>
    )
}