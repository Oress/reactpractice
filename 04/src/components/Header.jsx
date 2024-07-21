import logo from '../assets/logo.jpg';
import CartDetailsModal from './CartDetailsModal';
import Button from './Button';
import { useState } from 'react';


export function Header() {
    const [showCartModal, setShowCartModal] = useState(false);

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt='Logo'/>
                <h1>Reactfood</h1>
            </div>
            <Button>Cart</Button>
            {showCartModal && <CartDetailsModal /> }
        </header>
    );
}