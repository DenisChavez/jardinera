import { type CardProps } from "../../data/types"

export const Card = ({ card }: { card: CardProps }) => {
    return (
        <div className="card flex-column">
            <img src={card.src} alt={card.alt} className="image" />
            <div className="card-info flex-column">
                <p className="description">{card.descripcion}</p>
                <div className="box">
                    <p>{card.material}</p>
                    <p>{card.alto}</p>
                    <p>{card.ancho}</p>
                    <p>{card.profundidad}</p>
                </div>
                <span>L {card.price}</span>
            </div>
        </div>
    )
}