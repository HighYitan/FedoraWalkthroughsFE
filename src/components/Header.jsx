import {useContext, useState, useEffect} from "react";
import fedora from "../assets/img/Fedora Team.png";
import {NavLink} from "react-router-dom";
import { TokenContext } from "../context/TokenContext";
import { LanguageContext } from "../context/LanguageContext";
import Language from "./Language";

export default function Header() {
    const { language, setLanguage } = useContext(LanguageContext);
    const { token, route } = useContext(TokenContext); // Show Register, Authenticate if user login token does not exist (Not logged)
    return (
        <header className="w-full">
            <nav className="flex flex-col md:flex-row justify-between items-center h-full px-4 md:px-8 sticky top-0 bg-gray-900 border-b-2 border-white">
                <NavLink to="/" className="font-bold text-xl">
                    <img src={fedora} alt="Fedora Team" className="h-24 object-contain" />
                </NavLink>
                <div className={"flex flex-col md:flex-row justify-start items-center h-full space-x-4 text-white"}>
                    <NavLink to="/Juegos" className="font-bold text-xl p-2 text-center flex">
                        {language === "ES" && "Juegos"}
                        {language === "CA" && "Jocs"}
                        {language === "EN" && "Games"}
                    </NavLink>
                    <NavLink to="/Guías" className="font-bold text-xl p-2 text-center flex">
                        {language === "ES" && "Guías"}
                        {language === "CA" && "Guies"}
                        {language === "EN" && "Guides"}
                    </NavLink>
                    <NavLink to="/Noticias" className="font-bold text-xl p-2 text-center flex">
                        {language === "ES" && "Noticias"}
                        {language === "CA" && "Notícies"}
                        {language === "EN" && "News"}
                    </NavLink>
                    {!token ? ( // Show Register, Authenticate if user login token does not exist (Not logged)
                    <>
                        {route !== "/Registro" && ( // Show Register if route is not /Registro
                            <NavLink to="/Registro" className={"font-bold text-xl p-2 text-center flex"}>
                                {language === "CA" && ("Registrar-se")}
                                {language === "ES" && ("Registrarse")}
                                {language === "EN" && ("Sign Up")}
                            </NavLink>
                        )}
                        {route !== "/Autenticar" && ( // Show Authenticate if route is not /Autenticar
                            <NavLink to="/Autenticar" className={"font-bold text-xl p-2 text-center flex"}>
                                {language === "CA" && ("Autenticar-se")}
                                {language === "ES" && ("Autenticarse")}
                                {language === "EN" && ("Log In")}
                            </NavLink>
                        )}
                    </>
                    ) : ( // Show Profile, Spaces, and Comments if user login token exists (Logged)
                    <>
                        {route !== "/Perfil" && ( // Show Profile if route is not /Perfil
                            <NavLink to="/Perfil" className={"font-bold text-xl p-2 text-center flex"}>
                                {(language === "CA" || language === "ES") && "Perfil"}
                                {language === "EN" && ("Profile")}
                            </NavLink>
                        )}
                    </>
                    )}
                </div>
            </nav>
            <div className="flex flex-row justify-between items-center md:space-y-0 md:space-x-4 mt-1">
                <Language />
            </div>
        </header>
    );
}