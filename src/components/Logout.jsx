import { useState, useContext } from "react";
import { TokenContext } from "../context/TokenContext";
import { LanguageContext } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
export default function Logout(){
    const { token, setToken, login, setLogin, correo, setCorreo } = useContext(TokenContext);
    const { language } = useContext(LanguageContext);
    const [showModal, setShowModal] = useState(false);
    const redirect = useNavigate();
    const apiRoute = import.meta.env.VITE_API_URL;
    
    console.log(login);
    function handleLogout(){
        axios.post(apiRoute + "logout", {
            correo: login.email
        }, 
        {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
        .then(response => {
            console.log("Logout successful:", response.data);
        })
        .catch(error => {
            console.error("Error logging out:", error);
        });
        setToken(null);
        setLogin(null);
        setCorreo(null);
        localStorage.removeItem("tokenCache");
        localStorage.removeItem("loginCache");
        localStorage.removeItem("correoCache");
        //setShowModal(false); // This line is not necessary because the page is redirected to the home page
        redirect("/");
    };
    return(
        <>
            <div 
                className={"flex justify-center items-center h-16 text-center text-xs sm:text-base rounded-lg shadow-sm font-bold py-2 m-1 text-white hover:text-gray-900 bg-black hover:bg-white"}
                onClick={() => setShowModal(true)}
            >
                {
                    (language === "CA" ? ("Sortir del compte") :
                    language === "ES" ? ("Salir de la cuenta") :
                    ("Logout"))
                }
            </div>
            {showModal && <Modal onSubmit={handleLogout} onClose={() => setShowModal(false)} mode={"logout"}/>}
        </>
    )
}