import {useContext} from "react";
import { NavLink } from "react-router-dom";
import { TokenContext } from "../context/TokenContext";
//import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";
export default function Footer() {
    //const { theme } = useContext(ThemeContext);
    const { language } = useContext(LanguageContext);
    const { route } = useContext(TokenContext);
    function handleGoingTop(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    return(
        <footer className={"fixed bottom-0 w-full py-4 bg-black text-white"}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h5 className="flex text-sm font-bold">
                            © 2025 Fedora Team.
                            {language === "CA" && (" Tots els drets reservats.")}
                            {language === "ES" && (" Todos los derechos reservados.")}
                            {language === "EN" && (" All rights reserved.")}
                        </h5>
                    </div>
                    <div className="flex space-x-4 items-center">
                        {/*route !== "/Nosaltres" && (
                            <NavLink to="/Nosaltres" className={"text-sm font-bold hover:underline"}>
                                {language === "CA" && ("Qui Som?")}
                                {language === "ES" && ("¿Quienes Somos?")}
                                {language === "EN" && ("Who are We?")}
                            </NavLink>
                        )}
                        {route !== "/Contacte" && (
                            <NavLink to="/Contacte" className={"text-sm font-bold hover:underline"}>
                                {language === "CA" && ("Contacta'ns")}
                                {language === "ES" && ("Contáctanos")}
                                {language === "EN" && ("Contact Us")}
                            </NavLink>
                        )*/}
                        {/* Scroll to Top Button */}
                        <button
                            id="scrollToTopButton"
                            className={"font-bold text-3xl py-3 px-6 rounded-full bg-violet-950 text-white"}
                            onClick={handleGoingTop}
                        >
                            ↑
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}