import menClassic from '../assets/img/men-classic.jpg'
export const Eslogan = () => {
    return (
        <section id="esa-ocasion" className="eslogan">
            <img src={menClassic} className="img-eslogan" />
            {/* <div className="parragraphs flex-column">
                <p>VENDEMOS FLORES</p>}
            </div> */}
            <div className="modal"></div>
            <p>CREAMOS LA FORMA MÁS BONITA PARA <span>EXPRESARTE CON FLORES</span></p>
        </section>
    )
};