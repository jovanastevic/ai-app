import {UserAvatar} from "./UserAvatar";
import {Button} from "@/components/ui/button";
import logo from "@/assets/logo-yea.svg";

export function Header() {
    return (
        <header className="w-full h-18 flex items-center border-b justify-between p-3">
            <div className="flex items-center">
                <a href="#">
                    <img src={logo.src} alt="Logo" width="40vw"/>
                </a>
                <h1 className="text-3xl font-bold">Actual Intelligence</h1>
            </div>
            <div className="flex items-center gap-4">
                <Button>Dark</Button>
                <UserAvatar/>
            </div>
        </header>
    )
}
