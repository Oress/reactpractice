import { useContext } from 'react';
import Button from './Button';
import { ModalWrapper } from './ModalWrapper';
import { CartContext } from '../context/CartContext';


export default function CheckoutModal({ onClose, onProceed }) {
    const ctx = useContext(CartContext);
    const items = ctx.cart.sort((a, b) => a.item.id - b.item.id);
    const total = items.reduce((acc, item) => acc + item.item.price * item.quantity, 0);




    const isEmptyCart = items.length === 0;

    const itemsElements = items.map((itemPosition, index) => {
        return <li key={index} className="cart-item">
            <p>{itemPosition.item.name} - {itemPosition.quantity} x ${itemPosition.item.price}</p>
            <div className="cart-item-actions">
                <button onClick={() => ctx.removeFromCart(itemPosition.item)}>-</button>
                <span>{itemPosition.quantity}</span>
                <button onClick={() => ctx.addToCart(itemPosition.item)}>+</button>
            </div>
        </li>
    });

    return <ModalWrapper dialogClosed={onClose} buttons={
        <>
            <Button onClick={onClose} type='text'>Close</Button>
            <Button hidden={isEmptyCart} onClick={onProceed} >Go To Chechout</Button>
        </>
    }>
        <div className="cart">
            <h2>Checkout</h2>
            <Input label="Full Name" id="name" />
            <Input label="E-Mail Address" id="email" />
            <Input label="Street" id="street" />
            <div className="cart-items">
                <Input label="Postal Code" id="zip" />
                <Input label="City" id="city" />
            </div>
        </div>
    </ModalWrapper>

}