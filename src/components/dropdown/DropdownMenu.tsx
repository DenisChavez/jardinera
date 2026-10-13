import { useEffect, useRef } from "react";

type DropdownMenuProps = {
    visible: boolean,
    onClose: () => void;
}
export const DropdownMenu = ({ visible, onClose }: DropdownMenuProps) => {
    const dropDownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClick)

        return () => { document.removeEventListener("mousedown", handleClick) };
    }, [onClose]);
    return (
        <div ref={dropDownRef} className={`dropdown-menu position flex-column ${visible ? "show" : ""}`}>
            <button className="close-btn" onClick={onClose}>
                ✕
            </button>
            <a href="#esa-ocasion">para esa ocasión</a>
            <a href="#tu-arreglo">elige tu arreglo</a>
            <a href="#contacto">contáctanos</a>
        </div>
    )
};