import './payment.css';
import { FaWhatsapp } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";

function Payment() {
  

  return (
    <div className="payment__container">
      <h1>Заявка на оформление заказа</h1>
      <p>Свяжитесь с нами в Telegram или WhatsUp</p>
      <div className='link__block'>
        <a href="https://t.me/bartgothopuy"><FaTelegram fontSize={100} color="blue"/></a>
        <a href="https://api.whatsapp.com/send?phone=79601088814"><FaWhatsapp fontSize={100} color="green"/></a>
      </div>
    </div>
  )
}

export default Payment
