import Button from "../../ui/Button.jsx";
import {decreaseItemQuantity, increaseItemQuantity} from "./CartSlice.js";
import {useDispatch} from "react-redux";

function UpdateItemQuantity({id, quantity}) {
  const dispatch = useDispatch();

  return (
    <>
      <Button type="round" onClick={() => dispatch(decreaseItemQuantity(id))}>-</Button>
      <span>{quantity}</span>
      <Button type="round" onClick={() => dispatch(increaseItemQuantity(id))}>+</Button>
    </>
  );
}

export default UpdateItemQuantity;