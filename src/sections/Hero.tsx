import { Jardinera } from "../components/icon/icons/Jardinera";
import { BuyNow } from "../components/icon/icons/BuyNow";
import { Whatsapp } from "../components/icon/icons/Whatsapp";
import heroJardinera from "../assets/img/hero-jardinera.jpg";
import heroJardinera2 from "../assets/img/hero-jardinera-2.jpeg"
export const Hero = () => {
    return (
        <section className="hero position-r">
            <picture>
                <source media="(min-width: 1024px)" srcSet={heroJardinera} />
                <img
                    src={heroJardinera2}
                    alt="Imagen clavel rojo"
                    className="bg-jardinera position-a"
                />
            </picture>
            <Jardinera className="icon-jardinera position-a position" size={340} />
            <h1 className="title position-a position">LA JARDINERA® TE AYUDA A EXPRESARTE CON FLORES.</h1>
            <div className="container-icon flex-column position">
                <BuyNow className="icon icon-buy" />
                <a href="https://wa.me/50489220389?text=¡Hola!%20Quiero%20información%20sobre%20arreglos%20florales.%20" target="_blank" rel="noopener noreferrer">
                    <Whatsapp className="icon icon-wha" />
                </a>
            </div>
        </section>
    )
};