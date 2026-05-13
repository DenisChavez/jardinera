import { useEffect, useState } from "react";
import { Burger } from "../components/icon/icons/Burger";
import { DropdownMenu } from "../components/dropdown/DropdownMenu";

export const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`header flex ${scrolled ? "scroll" : ""}`}>
            <img src="/src/assets/img/Honduras.jpg" alt="bandera honduras" className="icon-honduras" />
            <div className="options">
                <a href="#esa-ocasion">para esa ocasión</a>
                <a href="#tu-arreglo">elige tu arreglo</a>
                <a href="#contacto">contáctanos</a>
                <Burger onClick={() => setVisible(!visible)} />
            </div>
            <DropdownMenu onClose={() => setVisible(false)} visible={visible} />
        </div>
    )
};