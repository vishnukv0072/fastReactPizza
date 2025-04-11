import {deleteItem} from "./CartSlice.js";
import Button from "../../ui/Button.jsx";
import {useDispatch} from "react-redux";

function DeleteItem({pizzaId}) {
  const dispatch = useDispatch();
  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>Delete</Button>
  );
}

export default DeleteItem;