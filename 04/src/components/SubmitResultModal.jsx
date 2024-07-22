import { useContext,  } from "react";
import { httpService } from "../utils/httputils";
import useHttpRequest from "../hooks/fetching";
import Button from './Button';
import { ModalWrapper } from './ModalWrapper';
import {CartContext} from "../context/CartContext";

export default function SubmitResultModal({ onClose, onProceed }) {
    const ctx = useContext(CartContext);
    const { isFetching, data, error } = useHttpRequest(httpService.saveOrder, {order: {items: ctx.cart, customer: ctx.customer}});

    let dataBlock = <></>;
    if (error) {
        dataBlock = (<p>Error: {error.message}</p>);
      } else if (isFetching) {
        dataBlock = (<p>Submitting order...</p>);
      } else if (data) {
        dataBlock = <p>Your order was submitted successfully!</p>
      } else {
        dataBlock = (<p>No data</p>);
      }

    return <ModalWrapper dialogClosed={onClose} buttons={
        <>
            <Button onClick={onProceed}>OK</Button>
        </>
    }>
        <div className="cart">
            <h2>Success!</h2>
            {dataBlock}
        </div>
    </ModalWrapper>

}