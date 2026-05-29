import { Jardinera } from "../components/icon/icons/Jardinera";
import { BuyNow } from "../components/icon/icons/BuyNow";
import { Whatsapp } from "../components/icon/icons/Whatsapp";
export const Hero = () => {
    return (
        <section className="hero flex-column">
            <Jardinera className="icon-jardinera position" size={340} />
            <h1 className="title">LA JARDINERA® NACE PARA AYUDARTE A EXPRESARTE CON FLORES.</h1>
            <div className="container-icon flex-column position">
                <BuyNow className="icon icon-buy" />
                <a href="https://wa.me/50489220389?text=¡Hola!%20Quiero%20información%20sobre%20arreglos%20florales.%20" target="_blank" rel="noopener noreferrer">
                    <Whatsapp className="icon icon-wha" />
                </a>
            </div>
        </section>
    )
};