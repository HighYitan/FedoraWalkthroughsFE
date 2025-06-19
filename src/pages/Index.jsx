import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { LanguageContext } from "../context/LanguageContext";
import { NavLink } from "react-router-dom";
export default function Index() {
    const { language } = useContext(LanguageContext);
    const { news } = useContext(DataContext);
    const { games } = useContext(DataContext);
    const { guides } = useContext(DataContext);
    const langIndex = language === "ES" ? 0 : language === "CA" ? 1 : language === "EN" ? 2 : 0;
    const lastNews = news && news.length > 0 ? news[news.length - 1] : null; // Obtiene la última noticia
    const featuredGames = games ? games.filter(game => game.destacado === "Sí") : [];
    const bestGuides = guides ? guides
        .filter(guide => guide.aprobada === "Sí")
        .sort((a, b) => b.puntuacion_media - a.puntuacion_media)
        .slice(0, 2)
    : [];

    console.log(bestGuides);

    return (
        <>
            <div className="flex sm:flex-row flex-col justify-between">
                <div className={"flex flex-col h-full justify-between space-x-5 mx-1 w-full lg:w-5/10 rounded-lg shadow-sm mt-4 border bg-gray-800 border-gray-700"}>
                    <div className="font-bold mb-2">
                        <h1 className={"text-center font-bold py-2 text-4xl text-white"}>
                            {(language === "ES" ?
                                ("¿Quienes Somos y cuál es nuestro propósito?") :
                            language === "CA" ?
                                ("Qui som i quin és el nostre propòsit?") :
                                ("Who are we and what is our purpose?"))}
                        </h1>
                    </div>
                    <h1 className={"text-justify font-bold p-2 text-2xl text-white"} style={{ whiteSpace: "pre-line" }}>
                        {(language === "ES" ?
                            ("Somos Fedora Team; una empresa que se dedica al desarrollo de videojuegos y a la creación de contenido digital para promocionar y exponer a la comunidad de videojuegos la riqueza cultural de Europa y su folklore. \n\nEsta página web es muy especial para nosotros ya que busca crear una comunidad fiel de jugadores interesados en el mundo de los videojuegos a través de guías de calidad moderadas por nuestro equipo para asegurar la calidad de las mismas.") :
                        language === "CA" ?
                            ("Som Fedora Team; una empresa que es dedica al desenvolupament de videojocs i a la creació de contingut digital per promocionar i exposar a la comunitat de videojocs la riquesa cultural d'Europa i el seu folklore. \n\nAquesta pàgina web és molt especial per a nosaltres ja que busca crear una comunitat fidel de jugadors interessats en el món dels videojocs a través de guies de qualitat moderades pel nostre equip per assegurar la qualitat de les mateixes.") :
                            ("We are Fedora Team; a company dedicated to the development of video games and the creation of digital content to promote and expose the gaming community to the cultural richness of Europe and its folklore. \n\nThis website is very special to us as it aims to create a loyal community of players interested in the world of video games through quality guides moderated by our team to ensure their quality."))}
                    </h1>
                </div>
                <div className={"flex flex-col h-full justify-between space-x-5 mx-1 w-full lg:w-5/10"}>
                    <div className="bg-gray-800 border-gray-700 border rounded-lg shadow-sm mt-4 mx-0">
                        <div className="px-6 pb-6 mb-1 text-white">
                            <div className="font-bold mb-2">
                                <h1 className={"text-center font-bold py-2 text-4xl text-white"}>
                                    {(language === "ES" ?
                                        ("Videojuegos de la semana") :
                                    language === "CA" ?
                                        ("Videojocs de la setmana") :
                                        ("Games of the Week"))}
                                </h1>
                            </div>
                        </div>
                        {featuredGames.map((game, index) => (
                            <NavLink key={index} to={"/Juego/" + game.nombre_inicial} className={"font-bold text-sm sm:text-xl flex items-center bg-gray-400 border-gray-300 my-1 w-full"}>
                                <img
                                    className="w-40 h-40 object-cover"
                                    src={game.imagen}
                                    alt={game.titulo}
                                />
                                <div className="px-2 py-2 mb-1 flex justify-center items-center">
                                    <div className="font-bold mb-2 text-center">
                                        {game.nombre_inicial}
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                    <div className="bg-gray-800 border-gray-700 border rounded-lg shadow-sm mt-4 mx-0">
                        <div className="px-6 pb-6 mb-1 text-white">
                            <div className="font-bold mb-2">
                                <h1 className={"text-center font-bold py-2 text-4xl text-white"}>
                                    {(language === "ES" ?
                                        ("Mejores guías de la semana") :
                                    language === "CA" ?
                                        ("Millors guies de la setmana") :
                                        ("Best Guides of the Week"))}
                                </h1>
                            </div>
                        </div>
                        {bestGuides.map((guide, index) => (
                            <NavLink key={index} to={"/Guía/" + guide.id} className={"font-bold text-sm sm:text-xl flex items-center justify-center bg-gray-400 border-gray-300 my-1 w-full h-40"}>
                                <div className="px-2 py-2 mb-1">
                                    <div className="font-bold mb-2 text-center">
                                        {(language === "ES" ?
                                            ("Puntuación") :
                                        language === "CA" ?
                                            ("Puntuació") :
                                            ("Score"))}<br></br>
                                        {guide.puntuacion_media && guide.puntuacion_media + "/10"}
                                    </div>
                                </div>
                                <div className="px-2 py-2 mb-1">
                                    <div className="font-bold mb-2 text-center">
                                        {(language === "ES" ?
                                            ("Idioma") :
                                        language === "CA" ?
                                            ("Idioma") :
                                            ("Language"))}<br></br>
                                        {guide.idioma.nombre}
                                    </div>
                                </div>
                                <div className="px-2 py-2 mb-1">
                                    <div className="font-bold mb-2 text-center">
                                        {guide.titulo}
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
            <div className="container w-full sm:mx-auto pt-5">
                <div className="grid grid-cols-1 gap-1 justify-items-center">
                    <div className="font-bold mb-2">
                        <h1 className={"text-center font-bold py-2 text-3xl text-white"}>
                            {(language === "ES" ?
                                ("Noticia más reciente") :
                            language === "CA" ?
                                ("Notícia més recent") :
                                ("Latest News"))}
                        </h1>
                    </div>
                    {lastNews && (
                        <NavLink to={"/Noticias"} className={"font-bold text-sm sm:text-xl flex items-center"}>
                            <div className="w-full border rounded-lg shadow-sm mt-4 text-white bg-gray-900 border-white">
                                <img
                                    className="p-3 max-h-500 w-full object-cover rounded-lg"
                                    src={lastNews.traducciones[langIndex].imagen}
                                    alt={lastNews.traducciones[langIndex].titulo}
                                />
                                <div className="px-6 pb-6 mb-1 text-white">
                                    <div className="font-bold text-justify mb-2">
                                        {lastNews.traducciones[langIndex].titulo}
                                    </div>
                                    <div className="font-bold text-justify mb-2">
                                        {lastNews.traducciones[langIndex].contenido}
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    )}
                </div>
            </div>
        </>
    )
}