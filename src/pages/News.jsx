import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { LanguageContext } from "../context/LanguageContext";
export default function News() {
    //const { userInterfaces } = useContext(DataContext);
    const { language } = useContext(LanguageContext);
    const { news } = useContext(DataContext);
    const langIndex = language === "ES" ? 0 : language === "CA" ? 1 : language === "EN" ? 2 : 0;

    return (
        <div className="container w-full sm:mx-auto pt-5">
            <div className="grid grid-cols-1 gap-1 justify-items-center">
                {news && news.map((noticia, index) => (
                    /*<div className="flex justify-center">
                        <div className={"w-full max-w-sm border rounded-lg shadow-sm mt-4 text-white bg-gray-900 border-white"}>
                            <img
                                className="p-4 w-full h-48 object-cover rounded-lg"
                                src={noticia.traducciones[langIndex].imagen}
                                alt={noticia.traducciones[langIndex].titulo}
                            />
                            <div className={"px-6 pb-6 mb-1 text-white"}>
                                <h5 className="text-xl text-center font-semibold tracking-tight mb-1">
                                    {noticia.traducciones[langIndex].titulo}
                                </h5>
                                <div className="flex justify-center mt-2 sm:mt-0 mb-4">
                    
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-center line-clamp-3">
                                        {noticia.traducciones[langIndex].contenido}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>*/
                    <div key={index} className={"w-full border rounded-lg shadow-sm mt-4 text-white bg-gray-900 border-white"}> 
                        <img
                            className="p-3 max-h-500 w-full object-cover rounded-lg"
                            src={noticia.traducciones[langIndex].imagen}
                            alt={noticia.traducciones[langIndex].titulo}
                        />
                        <div className={"px-6 pb-6 mb-1 text-white"}>
                            <div className="font-bold text-justify mb-2">
                                {noticia.traducciones[langIndex].titulo}
                            </div>
                            <div className="font-bold text-justify mb-2">
                                {noticia.traducciones[langIndex].contenido}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}