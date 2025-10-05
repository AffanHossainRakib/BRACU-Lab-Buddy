import { ComputerIcon } from "lucide-react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const NavBar = () => {
    return (
        <div className="flex justify-around items-center py-5 border-b">
            <ComputerIcon />
            <h1 className="font-bold text-xl">BRACU Lab Buddy</h1>
            <ThemeToggle />
        </div>
    );
};

export default NavBar;
