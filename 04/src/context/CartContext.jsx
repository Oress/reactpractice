import { createContext, useReducer } from "react";


const defaultValue = {
    cart: [],
    customer: {},
    fillCustomerData: () => {},
    addToCart: () => {},
    removeFromCart: () => {},
    getCartTotal: () => {},
    cleanCart: () => {}
};
export const CartContext = createContext(defaultValue);

export const CartContextProvider = ({children}) => {
    function cartReducerFn(state, action) {

        switch (action.type) {
            case 'ADD':
                const itemToAdd = state.cart.find((itemPosition) => itemPosition.item.id === action.payload.id);
                if (itemToAdd) {
                    return {
                        ...state,
                        cart: state.cart.map((itemPosition) => {
                            if (itemPosition.item.id === action.payload.id) {
                                return {
                                    item: itemPosition.item,
                                    quantity: itemPosition.quantity + 1
                                }
                            } else {
                                return itemPosition;
                            }
                        })
                    };
                } else {
                    return {
                        ...state,
                        cart: [...state.cart, {item: action.payload, quantity: 1}]
                    };
                }
            case 'REMOVE':
                const itemToRemove = state.cart.find((itemPosition) => itemPosition.item.id === action.payload.id);
                if (itemToRemove.quantity === 1) {
                    return {
                        ...state,
                        cart: state.cart.filter((itemPosition) => itemPosition.item.id !== action.payload.id)
                    };
                } else {
                    return {
                        ...state,
                        cart: state.cart.map((itemPosition) => {
                            if (itemPosition.item.id === action.payload.id) {
                                return {
                                    ...itemPosition,
                                    quantity: itemPosition.quantity - 1
                                }
                            } else {
                                return itemPosition;
                            }
                        })
                    };
                }
            case 'CLEAN':
                return {
                    ...state,
                    cart: []
                };
            case 'FILL_CUSTOMER':
                return {
                    ...state,
                    customer: action.payload
                };
            default:
                return state;
        }
    }

    const initialState = {
        cart: [],
        fillCustomerData: (item) => cartReducer({type: 'FILL_CUSTOMER', payload: item}),
        addToCart: (item) => cartReducer({type: 'ADD', payload: item}),
        removeFromCart: (item) => cartReducer({type: 'REMOVE', payload: item}),
        getCartTotal: () => cartReducer({type: 'TOTAL'}),
        cleanCart: () => cartReducer({type: 'CLEAN'})
    };

    const [state, cartReducer] = useReducer(cartReducerFn, initialState);

    return (
        <CartContext.Provider value={state}>
            {children}
        </CartContext.Provider>
    );

}