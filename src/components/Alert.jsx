import {useContext} from "react";
import { LanguageContext } from "../context/LanguageContext";
export default function Alert({ type, errors }) {
    const { language } = useContext(LanguageContext);

    return(
        <div
            className={"flex p-4 my-4 text-sm rounded-lg " +
                (
                    type === "danger" ? "bg-red-950 text-red-300" :
                    type === "success" ? "bg-green-950 text-green-300" :
                    type === "info" ? "bg-blue-950 text-blue-300" :
                    type === "warning" ? "bg-yellow-950 text-yellow-300" :
                    ""
                )
            }
            role="alert"
        >
            <svg
                className="shrink-0 inline w-4 h-4 me-3 mt-[2px]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Alert Info</span>
            <div> {/* This div is for the danger to align the ul below the span text */}
            {type === "danger" && 
                <>
                    <span className="font-medium">{language === "CA" ? "Assegureu-vos que aquests requeriments es compleixin:" : language === "ES" ? "Asegúrate de que estos requerimientos se cumplan:" : "Ensure that these requirements are met:"}</span>
                    <ul className="mt-1.5 list-disc list-inside">
                        {errors && errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </>
            }
            {type === "success" && <span className="font-medium">{errors}</span>}
            </div>
        </div>
    )
}