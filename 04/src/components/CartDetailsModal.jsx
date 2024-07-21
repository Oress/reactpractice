import Button from './Button';
import { ModalWrapper } from './ModalWrapper';


export default function CartDetailsModal({onClose}) {
    const items = [
        {
            title: 'Seafood Paella',
            count: 1,
            pricePerUnit: 19.99
        },
        {
            title: 'Sushi Roll Platter',
            count: 1,
            pricePerUnit: 15.99
        },
        {
            title: 'Steak Frites',
            count: 1,
            pricePerUnit: 17.99
        }
    ];

    const itemsElements = items.map((item, index) => {
        return <li key={index} className="cart-item">
            <p>{item.title}</p>
            <div className="cart-item-actions">
                <button>+</button>
                <button>-</button>
            </div>
        </li>
    });

    return <ModalWrapper buttons={
            <>
                <Button onClick={onClose} type='text'>Cancel</Button>
                <Button>Go To Chechout</Button>
            </>
        }>
        <div className="cart">
            <h2>Your Cart</h2>
            <ul>
                {itemsElements}
            </ul>
            <span className="cart-total">${73.96}</span>
        </div>
    </ModalWrapper>

}