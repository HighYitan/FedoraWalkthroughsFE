import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { LanguageContext } from "../context/LanguageContext";
export default function Language() {
    //const { userInterfaces } = useContext(DataContext);
    const { languages } = useContext(DataContext);
    const { language, setLanguage } = useContext(LanguageContext);

    function handleLanguageChange(event){
        setLanguage(event.target.value);
    }

    return(
        <form className="max-w-sm ml-4">
            <label
                htmlFor="languages"
                className={"block mb-2 text-sm font-medium text-center text-white"}
                style={{ width: "140px" }}
            >
                {language === "ES" && languages[0] && (<>Idioma <img src={languages[0].bandera} alt="Español" className="inline-block h-4 ml-2 object-contain" /></>)}
                {language === "CA" && languages[1] && (<>Llenguatge <img src={languages[1].bandera} alt="Català" className="inline-block h-4 ml-2 object-contain" /></>)}
                {language === "EN" && languages[2] && (<>Language <img src={languages[2].bandera} alt="English" className="inline-block h-4 ml-2 object-contain" /></>)}
            </label>
            <select
                id="languages"
                className={"border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-900 text-white border-gray-300"}
                value={language}
                onChange={handleLanguageChange}
            >
                <option value="ES">Español</option>
                <option value="CA">Català</option>
                <option value="EN">English</option>
            </select>
        </form>
    )
}