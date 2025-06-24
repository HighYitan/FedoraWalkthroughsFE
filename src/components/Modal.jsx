import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
export default function Modal({ onSubmit, onClose, mode }) {
    const { language } = useContext(LanguageContext);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full bg-black/75" onClick={onClose}>
            <div className={"relative w-11/12 sm:w-6/12 rounded-lg shadow-lg bg-gray-900 text-white"} onClick={(event) => event.stopPropagation()}>
                <button className="absolute top-2 right-2 text-4xl" title="Close" onClick={onClose}>
                    <span>&times;</span> {/* This is the X symbol */}
                </button>
                <h1 className={"flex justify-center items-center text-2xl sm:text-3xl rounded-lg shadow-sm font-bold py-4 mx-1 text-red-300"}>
                    {
                        mode === "logout" ? // If mode is logout, display "Logout from account", else display "Delete account"
                        (language === "CA" ? ("Sortir del compte") :
                        language === "ES" ? ("Salir de la cuenta") :
                        ("Logout from account")) :
                        (language === "CA" ? ("Borrar compte") :
                        language === "ES" ? ("Borrar cuenta") :
                        ("Delete account"))
                    }
                </h1>
                <h3 className="text-md mx-2 mt-2 text-center font-bold">
                    {
                        mode === "logout" ? // If mode is logout, display "Are you sure you want to logout from the account?", else display "Are you sure you want to delete the account?"
                        (language === "CA" ? ("Segur que vols sortir del compte?") :
                        language === "ES" ? ("¿Seguro que quieres salir de la cuenta?") :
                        ("Are you sure you want to logout from the account?")) :
                        (language === "CA" ? ("Segur que vols borrar el compte?") :
                        language === "ES" ? ("¿Seguro que quieres borrar la cuenta?") :
                        ("Are you sure you want to delete the account?"))
                    }
                </h3>
                <div className="flex justify-center">
                    <button
                        id="logout"
                        className={"text-center font-bold w-9/10 sm:w-19/20 py-2 my-6 rounded bg-red-950 text-white"}
                        type="submit"
                        onClick={onSubmit} // This function is passed as a prop from the parent component
                    >
                        {
                            mode === "logout" ? // If mode is logout, display "Logout", else display "Delete"
                            (language === "CA" ? ("Sortir") :
                            language === "ES" ? ("Salir") :
                            ("Logout")) :
                            (language === "CA" ? ("Borrar") :
                            language === "ES" ? ("Borrar") :
                            ("Delete"))
                        }
                    </button>
                </div>
            </div>
        </div>
    )

}