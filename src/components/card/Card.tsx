import { type CardProps } from "../../data/types"

export const Card = ({ card }: { card: CardProps }) => {
    return (
        <div className="card flex-column">
            <img src={card.src} alt={card.alt} className="image" />
            <p>{card.text}</p>
            <span>L {card.price}</span>
        </div>
    )
}