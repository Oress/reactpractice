import logo from '../assets/logo.jpg';
import { getModalElement } from '../utility/domutils';
import { createPortal } from 'react-dom';


export function Header() {
    

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt='Logo'/>
                <h1>Reactfood</h1>
            </div>
            <button>Cart</button>
            {createPortal(
                <p>This child is placed in the document body.</p>,
                getModalElement()
            )}
        </header>
    );
}