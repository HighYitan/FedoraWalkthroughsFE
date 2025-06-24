import { useState, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import EditProfile from "../../components/EditProfile";
import Logout from "../../components/Logout";
import DeleteProfile from "../../components/DeleteProfile";

export default function Profile(){
    const { language } = useContext(LanguageContext);
    const [section, setSection] = useState("edit"); // State to manage the section to display in the profile page.

    return(
        <>
            <div className="flex justify-between pb-10 md:pb-0">
                <div className={"flex flex-col h-full justify-between space-x-5 mx-1 w-3/10 lg:w-2/10 rounded-lg shadow-sm mt-4 border bg-gray-800 border-gray-700"}>
                    <h1 className={"flex justify-center items-center text-xl sm:text-2xl rounded-lg shadow-sm font-bold py-4 mx-1 text-white"}>
                        {
                            (language === "CA" ? ("Seccions") :
                            language === "ES" ? ("Secciones") :
                            ("Sections"))
                        }
                    </h1>
                    <div 
                        className={"flex justify-center items-center h-16 text-center text-xs sm:text-base rounded-lg shadow-sm font-bold py-2 m-1 text-white hover:text-gray-900 bg-black hover:bg-white"}
                        onClick={() => setSection("edit")}
                    >
                        {(language === "CA" || language === "ES" ? ("Editar Perfil") : ("Edit Profile"))}
                    </div>
                    {/*}
                    <div 
                        className={"flex justify-center items-center h-16 text-center text-xs sm:text-base rounded-lg shadow-sm font-bold py-2 m-1 text-white hover:text-gray-900 bg-black hover:bg-white"}
                        onClick={() => setSection("comments")}
                    >
                        {
                            (language === "CA" ? ("Els teus comentaris") :
                            language === "ES" ? ("Tus comentarios") :
                            ("Your comments"))
                        }
                    </div>
                    */}
                    <Logout />
                    <DeleteProfile />
                </div>
                <div className={"mr-1 w-7/10 lg:w-8/10 rounded-lg shadow-sm mt-4 border bg-gray-800 border-gray-700"}>
                    {section === "edit" && <EditProfile />}
                    {/*section === "comments" && <UserComments />*/}
                </div>
            </div>
        </>
    )
}