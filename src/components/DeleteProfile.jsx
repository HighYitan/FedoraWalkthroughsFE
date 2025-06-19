import { useState, useContext } from "react";
import { TokenContext } from "../context/TokenContext";
import { LanguageContext } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
export default function DeleteProfile(){
    const { language } = useContext(LanguageContext);
    const { token, setToken, login, setLogin } = useContext(TokenContext);
    const [showModal, setShowModal] = useState(false);
    const redirect = useNavigate();
    const apiRoute = import.meta.env.VITE_API_URL;
    console.log(login);

    const headers = {
        Authorization: "Bearer " + token
    };

    function handleDelete(){
        axios.delete(apiRoute + "user/" + login.correo, {headers}) //Put and Delete on Axios only works with parameters in this way
        .then(response => {
            console.log("Delete successful:", response.data);
        })
        .catch(error => {
            console.log(token);
            console.error("Error deleting user:", error);
        });
        setToken(null);
        setLogin(null);
        localStorage.removeItem("tokenCache");
        localStorage.removeItem("loginCache");
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
                    (language === "CA" ? ("Borrar compte") :
                    language === "ES" ? ("Borrar cuenta") :
                    ("Delete account"))
                }
            </div>
            {showModal && <Modal onSubmit={handleDelete} onClose={() => setShowModal(false)} mode={"delete"}/>}
        </>
    )
}