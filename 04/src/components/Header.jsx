import logo from '../assets/logo.jpg';
import CartDetailsModal from './CartDetailsModal';
import Button from './Button';
import { useState } from 'react';
import CheckoutModal from './CheckoutModal';


export function Header() {
    const [showCartModal, setShowCartModal] = useState(false);
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);


    function proceedToCheckout() {
        setShowCartModal(false);
        setShowCheckoutModal(true);
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt='Logo'/>
                <h1>Reactfood</h1>
            </div>
            <Button type="text" onClick={() => setShowCartModal(true)}>Cart</Button>
            {showCartModal && <CartDetailsModal onClose={() => setShowCartModal(false)} onProceed={proceedToCheckout} /> }
            {showCheckoutModal && <CheckoutModal onClose={() => setShowCheckoutModal(false)} /> }
        </header>
    );
}