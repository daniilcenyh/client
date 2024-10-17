import "./busketcard.css"

import { BsBagX } from "react-icons/bs";
import { useActions } from "../../hooks/useActions";
import { useState } from "react";

export default function BusketCard({ title, price, img, id, count, product }) {
    const { removeFromBusket, decreaseBusketItem, addToBusket } = useActions();
    const [inputValue, setInputValue] = useState(count);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value >= 0) {
            setInputValue(value);
        }
    };

    const handleAddToBusket = () => {
        const quantity = parseInt(inputValue) || 0;
        const difference = quantity - count; // Разница между новым и старым количеством
        if (difference > 0) {
            for (let i = 0; i < difference; i++) {
                addToBusket(product);
            }
        } else {
            for (let i = 0; i < Math.abs(difference); i++) {
                decreaseBusketItem(product);
            }
        }
    };

    return (
        <article className='busket__card__conatiner'>
            <section id="busket__card__block">
                <div className="img__count">
                    <img src={img} alt={title} width={145} height={135} />
                    <div className="counter__block">
                        <input 
                            type="number" 
                            value={inputValue} 
                            onChange={handleInputChange} 
                            min="0"
                            style={{ width: '50px', textAlign: 'center' }} 
                        />
                        <button onClick={handleAddToBusket}>Обновить</button>
                    </div>
                </div>
            </section>
            <section id="busket__card__block">
                <div className="title__price__block">
                    <h2>{title}</h2>
                    <p>{price} ₽</p>
                </div>
            </section>
            <section id="busket__card__block">
                <div className="close__total__block">
                    <BsBagX color="#DF6464" fontSize={20} cursor="pointer" onClick={() => removeFromBusket(product)} />
                    <strong>{price * inputValue} ₽</strong>
                </div>
            </section>
        </article>
    )
}
