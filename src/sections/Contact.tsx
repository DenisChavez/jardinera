import { useState } from "react";
import { Facebook } from "../components/icon/icons/Facebook";
import { Instagram } from "../components/icon/icons/Instagram";
import heroTulipanes from "../assets/img/hero-tulipanes.png"
import menArreglo from "../assets/img/men-arreglo.png"

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3001/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                console.error(data)
                throw new Error(`Error en el backend:`);
            }

            alert("Mensaje enviado correctamente");

            setFormData({
                name: "",
                email: "",
                message: ""
            });

        } catch (error) {
            console.error(error);
            alert("Error al enviar el mensaje");
        }
    };

    return (
        <section id="contacto" className="contact">
            <img src={heroTulipanes} alt="Imagen tulipanes" className="banner-flower"></img>
            <div className="contact-info">
                <div className="contact-form p-absolute">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="nombre/name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}

                        />
                        <input
                            type="email"
                            placeholder="correo/email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <textarea
                            placeholder="mensaje/message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                        />
                        <button type="submit">
                            Enviar
                        </button>
                    </form>
                    <p>TE AYUDAMOS A ELEGIR</p>
                </div>
                <p className="contact-description p-absolute">En <strong>la jardinera®</strong> ayudamos a los hombres a expresar con flores lo que sienten por la mujer que aman, quieren o admiran. Diseñamos arreglos diferentes con intención, emoción y significado</p>
                <img src={menArreglo} alt="hombre con arreglo" className="men-flower" />
            </div>
            <div className="contact-icons position">
                <a href="https://www.facebook.com/profile.php?id=61588983034930" target="_blank" rel="noopener noreferrer">
                    <Facebook className="container-icon" />
                </a>
                <a href="https://www.instagram.com/lajardinera.life/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="container-icon" />
                </a>

                {/* <TikTok className="container-icon" /> */}
            </div>
        </section>
    )
};