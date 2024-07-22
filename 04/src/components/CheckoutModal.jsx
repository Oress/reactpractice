import { useContext } from 'react';
import Button from './Button';
import { ModalWrapper } from './ModalWrapper';
import Input from './Input';
import { CartContext } from '../context/CartContext';
import useFormGroup from '../hooks/forms';

const isNotEmpty = (value) => !value || value.length === 0 ? 'EMPTY' : null;
const isEmail = (value) => !value || !value.includes('@') ? 'INVALID_EMAIL' : null;
const isNumber = (value) => isNaN(value) ? 'NAN' : null;

const formConfig = {
    name: [isNotEmpty],
    email: [isNotEmpty, isEmail],
    street: [isNotEmpty],
    'postal-code': [isNotEmpty, isNumber],
    city: [isNotEmpty]
};

export default function CheckoutModal({ onClose, onProceed }) {
    const ctx = useContext(CartContext);
    const items = ctx.cart.sort((a, b) => a.item.id - b.item.id);
    const total = items.reduce((acc, item) => acc + item.item.price * item.quantity, 0);

    const { formValue, updateFormValue, formErrors } = useFormGroup(formConfig);

    const isEmptyCart = items.length === 0;

    function submitOrder() {
        if (Object.keys(formErrors).length === 0) {
            onProceed(formValue);
        }
    }

    return <ModalWrapper dialogClosed={onClose} buttons={
        <>
            <Button onClick={onClose} type='text'>Close</Button>
            <Button hidden={isEmptyCart} onClick={submitOrder}>SubmitOrder</Button>
        </>
    }>
        <div className="cart">
            <h2>Checkout</h2>
            <p>Total Amount ${total}</p>
            <Input label="Full Name" id="name" value={formValue.name} errors={formErrors.name} onChange={(event) => updateFormValue('name', event.target.value)} />
            <Input label="E-Mail Address" id="email" value={formValue.email} errors={formErrors.email} onChange={(event) => updateFormValue('email', event.target.value)}/>
            <Input label="Street" id="street" value={formValue.street} errors={formErrors.street} onChange={(event) => updateFormValue('street', event.target.value)}/>
            <div className="control-row">
                <Input label="Postal Code" id="zip" value={formValue['postal-code']} errors={formErrors['postal-code']} onChange={(event) => updateFormValue('postal-code', event.target.value)}/>
                <Input label="City" id="city" value={formValue.city} errors={formErrors.city} onChange={(event) => updateFormValue('city', event.target.value)}/>
            </div>
        </div>
    </ModalWrapper>

}