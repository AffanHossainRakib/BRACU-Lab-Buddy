import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(() =>
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("dark");
            localStorage.theme = "dark";
        } else {
            root.classList.remove("dark");
            localStorage.theme = "light";
        }
    }, [isDark]);

    return (
        <button onClick={() => setIsDark(!isDark)}>
            <Link>
                {isDark ? <Moon /> : <Sun />}
            </Link>
        </button>
    );
}


export default ThemeToggle