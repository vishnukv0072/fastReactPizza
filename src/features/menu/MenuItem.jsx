import {formatCurrency} from "../../utils/helpers.js";
import Button from "../../ui/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
  addItem,
    // getCart,
  getCurrentQuantityById,
} from "../cart/CartSlice.js";
import DeleteItem from "../cart/DeleteItem.jsx";
import UpdateItemQuantity from "../cart/UpdateItemQuantity.jsx";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  // const cart = useSelector(getCart);
  // const [quantity, setQuantity] = useState(() => {
  //   const item = cart.find(item => item.pizzaId === id);
  //   return item ? item.quantity : 0;
  // });
  const quantity = useSelector(getCurrentQuantityById(id));

  const dispatch = useDispatch();

  function handleAddToCart() {
    dispatch(addItem(id, name, unitPrice));
  }

  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}/>
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
        <div className="mt-auto flex align-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> :
            <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
          {!soldOut && quantity === 0 && <Button type="small" onClick={handleAddToCart}>Add to cart</Button>}
          {quantity > 0 &&
            <div className="flex items-center gap-1 md:gap-3">
              <UpdateItemQuantity id={id} quantity={quantity}/>
              <DeleteItem pizzaId={id}/>
            </div>
          }
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
