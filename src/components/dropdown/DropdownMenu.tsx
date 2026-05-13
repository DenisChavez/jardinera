export const DropdownMenu = ({ visible, onClose }) => {

    return (
        <div className={`dropdown-menu position flex-column ${visible ? "show" : ""}`}>
            <button className="close-btn" onClick={onClose}>
                ✕
            </button>
            <a href="#esa-ocasion">para esa ocasión</a>
            <a href="#tu-arreglo">elige tu arreglo</a>
            <a href="#contacto">contáctanos</a>
        </div>
    )
}