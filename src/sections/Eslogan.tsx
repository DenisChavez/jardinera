import menClassic from '../assets/img/men-classic.jpg'
export const Eslogan = () => {
    return (
        <section id="esa-ocasion" className="eslogan">
            <img src={menClassic} className="img-eslogan" />
            <div className="parragraphs flex-column">
                <p>NO VENDEMOS FLORES</p>
                <p>VENDEMOS LA FOMRA MÁS BONITA DE EXPRESARTE CON FLORES</p>
            </div>
        </section>
    )
};