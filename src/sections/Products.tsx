import { useState, useEffect, useRef } from "react";
import { Card } from "../components/card/Card";
import { CardsData } from "../data/cards";

export const Products = () => {
    const [cantidadCards, setCantidadCards] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const mouseStartX = useRef<number | null>(null);

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

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const maxIndex = CardsData.length - cantidadCards;

    const startAutoPlay = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setCurrentIndex(prev =>
                prev >= maxIndex ? 0 : prev + 1
            );
        }, 4000);
    };

    const stopAutoPlay = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    useEffect(() => {
        startAutoPlay();

        return () => {
            stopAutoPlay();
        };
    }, [maxIndex]);

    useEffect(() => {
        if (currentIndex > maxIndex) {
            setCurrentIndex(0);
        }
    }, [cantidadCards, currentIndex, maxIndex]);

    const goNext = () => {
        setCurrentIndex(prev =>
            prev >= maxIndex ? 0 : prev + 1
        );
    };

    const goPrev = () => {
        setCurrentIndex(prev =>
            prev <= 0 ? maxIndex : prev - 1
        );
    };

    // =========================
    // TOUCH EVENTS
    // =========================

    const handleTouchStart = (e: React.TouchEvent) => {
        stopAutoPlay();

        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = e.touches[0].clientX;

        setIsDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;

        const currentX = e.touches[0].clientX;

        touchEndX.current = currentX;

        setDragOffset(currentX - touchStartX.current);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);

        if (
            touchStartX.current === null ||
            touchEndX.current === null
        ) {
            setDragOffset(0);
            startAutoPlay();
            return;
        }

        const distance =
            touchStartX.current - touchEndX.current;

        const minSwipeDistance = 50;

        if (distance > minSwipeDistance) {
            goNext();
        } else if (distance < -minSwipeDistance) {
            goPrev();
        }

        setDragOffset(0);

        touchStartX.current = null;
        touchEndX.current = null;

        startAutoPlay();
    };

    // =========================
    // MOUSE EVENTS
    // =========================

    const handleMouseDown = (e: React.MouseEvent) => {
        stopAutoPlay();

        mouseStartX.current = e.clientX;

        setIsDragging(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || mouseStartX.current === null)
            return;

        setDragOffset(e.clientX - mouseStartX.current);
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (mouseStartX.current === null) return;

        const distance =
            mouseStartX.current - e.clientX;

        const minSwipeDistance = 50;

        if (distance > minSwipeDistance) {
            goNext();
        } else if (distance < -minSwipeDistance) {
            goPrev();
        }

        setDragOffset(0);
        setIsDragging(false);

        mouseStartX.current = null;

        startAutoPlay();
    };

    const cancelDrag = () => {
        setIsDragging(false);

        mouseStartX.current = null;
        touchStartX.current = null;
        touchEndX.current = null;

        setDragOffset(0);

        startAutoPlay();
    };

    return (
        <section
            id="tu-arreglo"
            className="carrousel-products flex"
        >
            <div
                className="carrousel-viewport"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={cancelDrag}
            >
                <div
                    className="carrousel-track"
                    style={{
                        transform: `translateX(calc(-${currentIndex *
                            (100 / cantidadCards)
                            }% + ${dragOffset}px))`,
                        transition: isDragging
                            ? "none"
                            : "transform 0.6s ease-in-out",
                    }}
                >
                    {CardsData.map(card => (
                        <Card
                            key={card.descripcion}
                            card={card}
                        />
                    ))}
                </div>

                <div className="circles flex">
                    {Array.from({
                        length: maxIndex + 1,
                    }).map((_, index) => (
                        <div
                            key={index}
                            className="circle"
                            onClick={() => {
                                setCurrentIndex(index);
                                startAutoPlay();
                            }}
                            style={{
                                opacity:
                                    currentIndex === index
                                        ? 1
                                        : 0.3,
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};