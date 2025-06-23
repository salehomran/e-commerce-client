import { useContext } from "react";
import { ICartItem } from "../types/CartItem";
import CartContext from "../contexts/CartContext";
import { CartActionType } from "../reducers/CartReducer";

export default function CartRow(item: ICartItem) {
    const {dispatch} = useContext(CartContext);

    const removeFromCart = () => {
        dispatch({type: CartActionType.REMOVE_ITEM, payload: {product: item.product, quantity: item.quantity}});
    }

    const increaseQuantity = () => {
        dispatch({type: CartActionType.CHANGE_QUANTITY, payload: {product: item.product, quantity: 1}});
    }

    const decreaseQuantity = () => {
        dispatch({type: CartActionType.CHANGE_QUANTITY, payload: {product: item.product, quantity: -1}});
    }

    return (
        <div>
            <h1>Product Name: {item.product.name}</h1>
            <p>Product Price: {item.product.price}</p>
            <p>Product Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart()}>Remove</button>
            <button onClick={() => increaseQuantity()}>+</button>
            <button onClick={() => decreaseQuantity()}>-</button>
        </div>
    );
}