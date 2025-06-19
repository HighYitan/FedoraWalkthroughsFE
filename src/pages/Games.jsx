import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { LanguageContext } from "../context/LanguageContext";
import { NavLink } from "react-router-dom";
export default function Games() {
    const { games } = useContext(DataContext);

    return(
        <div className="flex sm:flex-row flex-col justify-between">
            <div className={"flex flex-col h-full justify-between space-x-5 mx-1 w-full bg-gray-800 border-gray-700 border rounded-lg shadow-sm mt-4"}>
                {games.map((game, index) => (
                    <NavLink key={index} to={"/Juego/" + game.nombre_inicial} className={"font-bold text-sm sm:text-xl flex items-center bg-gray-400 border-gray-300 my-1 w-full"}>
                        <img
                            className="w-40 h-40 object-cover"
                            src={game.imagen}
                            alt={game.titulo}
                        />
                        <div className="px-2 py-2 mb-1 flex flex-col justify-center items-center flex-1">
                            <div className="font-bold mb-2 text-center">
                                {game.nombre_inicial}
                            </div>
                            <div className="font-bold mb-2 text-center">
                                {game.puntuacion_media && game.puntuacion_media + "/10"}
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}