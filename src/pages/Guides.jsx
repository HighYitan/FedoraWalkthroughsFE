import { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { LanguageContext } from "../context/LanguageContext";
import { TokenContext } from "../context/TokenContext";
import { NavLink } from "react-router-dom";
export default function Guides() {
    const { token, login } = useContext(TokenContext);
    const { languages } = useContext(DataContext);
    const { guides } = useContext(DataContext);
    const { language, setLanguage } = useContext(LanguageContext);
    const [ approvedGuides, setApprovedGuides ] = useState([]);

    useEffect(() => {
        const filteredGuides = guides.filter(guide => guide.aprobada === "Sí");
        setApprovedGuides(filteredGuides);
    }, [guides]);

    return(
        <div className="flex sm:flex-row flex-col justify-between">
            <div className={"flex flex-col h-full justify-between space-x-5 mx-1 w-full bg-gray-800 border-gray-700 border rounded-lg shadow-sm mt-4"}>
                {token ? (
                    <div className="flex justify-center items-center m-0">
                        <div className="px-2 py-2 mb-1 flex flex-col justify-center items-center flex-1">
                            <NavLink to={"/Crear_Guía"} className="font-bold text-sm sm:text-base flex justify-center items-center bg-red-400 border-red-300 my-1 w-full">
                                <div className="font-bold mb-2 text-center">
                                    Crear nueva guía
                                </div>
                            </NavLink>
                        </div>
                    </div>
                ) : ""}
                {approvedGuides.map((guide, index) => (
                    <NavLink key={index} to={"/Guía/" + guide.id} className={"font-bold text-sm sm:text-base flex items-center bg-gray-400 border-gray-300 my-1 w-full"}>
                        <div className="px-2 py-2 mb-1 flex flex-col justify-center items-center flex-1 w-40 h-40">
                            <div className="font-bold mb-2 text-center">
                                {(language === "ES" ? "Título: " : language === "CA" ? "Títol: " : "Title: ") + guide.titulo}
                            </div>
                            <div className="font-bold mb-2 text-center">
                                {(language === "ES" ? "Lanzamiento: " : language === "CA" ? "Llançament: " : "Release: ") + guide.lanzamiento.nombre + " " + guide.lanzamiento.lanzamiento}
                            </div>
                            <div className="font-bold mb-2 text-center">
                                {(language === "ES" ? "Autor: " : language === "CA" ? "Autor: " : "Author: ") + guide.usuario.nombre}
                            </div>
                            <div className="font-bold mb-2 text-center">
                                {(language === "ES" ? "Idioma: " : language === "CA" ? "Llenguatge: " : "Language: ") + guide.idioma.nombre}
                            </div>
                            <div className="font-bold mb-2 text-center">
                                {guide.puntuacion_media && (
                                    <>
                                        {(language === "ES" ? "Puntuación media: " : language === "CA" ? "Puntuació mitjana: " : "Average score: ") + (guide.puntuacion_media && guide.puntuacion_media + "/10")}
                                    </>
                                )}
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}