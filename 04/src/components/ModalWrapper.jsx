import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { getModalRoot } from '../utils/domutils';

export function ModalWrapper ({children, buttons=<></>}) {
    const dialogRef = useRef();

    useEffect(() => {
        dialogRef.current.showModal();
    }, [])

    return createPortal(
        <dialog ref={dialogRef} className="modal">
            {children}
            <div className="modal-actions">
                {buttons}
            </div>
        </dialog>,
        getModalRoot()
    );
}