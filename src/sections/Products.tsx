import { useState, useEffect, useRef } from "react";
import { Card } from "../components/card/Card";
import { CardsData } from "../data/cards";

export const Products = () => {
    const [cantidadCards, setCantidadCards] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setCantidadCards(4);
            } else if (window.innerWidth >= 768) {
                setCantidadCards(2);
            } else {
                setCantidadCards(1);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 🔢 Límite de movimiento
    const maxIndex = CardsData.length - cantidadCards;

    // 🔁 Autoplay
    const startAutoPlay = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setCurrentIndex(prev =>
                prev >= maxIndex ? 0 : prev + 1
            );
        }, 4000);
    };

    useEffect(() => {
        startAutoPlay();

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [maxIndex]);

    // 🛠️ Ajuste si cambia el tamaño de pantalla
    useEffect(() => {
        if (currentIndex > maxIndex) {
            setCurrentIndex(0);
        }
    }, [cantidadCards]);

    return (
        <section id="tu-arreglo" className="carrousel-products flex">
            <div className="carrousel-viewport">

                <div
                    className="carrousel-track"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / cantidadCards)}%)`,
                        transition: "transform 0.6s ease-in-out"
                    }}
                >
                    {CardsData.map((card) => (
                        <Card key={card.text} card={card} />
                    ))}
                </div>

                <div className="circles flex">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                        <div
                            key={index}
                            className="circle"
                            onClick={() => {
                                setCurrentIndex(index);
                                startAutoPlay();
                            }}
                            style={{
                                opacity: currentIndex === index ? 1 : 0.3
                            }}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};