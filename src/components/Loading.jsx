import fedora from "../assets/img/Fedora Team.png";
export default function Loading(){
    return (
        <div className="flex justify-center items-center w-full h-screen bg-violet-950">
            <img className="w-1/2 animate-spin" src={fedora} alt="Loading"/>
        </div>
    )
}