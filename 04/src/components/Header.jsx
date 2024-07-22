import logo from '../assets/logo.jpg';
import CartDetailsModal from './CartDetailsModal';
import Button from './Button';
import { useState, useContext } from 'react';
import CheckoutModal from './CheckoutModal';
import { CartContext } from '../context/CartContext';
import SubmitResultModal from './SubmitResultModal';


export function Header() {
    const ctx = useContext(CartContext);

    const [stage, setStage] = useState('NONE'); // NONE, CART, CHECKOUT, RESULT
    const showCartModal = stage === 'CART';
    const showCheckoutModal = stage === 'CHECKOUT';
    const showSubmitResultModal = stage === 'RESULT';

    const itemsQuantity = ctx.cart.reduce((acc, itemPosition) => acc + itemPosition.quantity, 0);

    function closeAll() {
        setStage('NONE');
    }

    function proceedToCart() {
        setStage('CART');
    }

    function proceedToCheckout() {
        setStage('CHECKOUT');
    }

    function proceedToResult(customerData) {
        ctx.fillCustomerData(customerData);
        setStage('RESULT');
    }

    function cleanupAfterOrdering() {
        setStage('NONE');
        ctx.cleanCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt='Logo' />
                <h1>Reactfood</h1>
            </div>
            <Button type="text" onClick={proceedToCart}>Cart ({itemsQuantity})</Button>
            {showCartModal && <CartDetailsModal onClose={closeAll} onProceed={proceedToCheckout} />}
            {showCheckoutModal && <CheckoutModal onClose={closeAll} onProceed={proceedToResult} />}
            {showSubmitResultModal && <SubmitResultModal onClose={closeAll} onProceed={cleanupAfterOrdering} />}
        </header>
    );
}