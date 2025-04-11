import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import {getTotalCount, getTotalPrice} from "./CartSlice.js";
import {formatCurrency} from "../../utils/helpers.js";

function CartOverview() {
  // const cart = useSelector(store => store.cart.cart);
  // const pizzaCount = cart.reduce((acc, item) => acc += item.quantity, 0);
  // const totalPrice = cart.reduce((acc, item) => acc += item.totalPrice, 0);

  //The above way is ok but the below one is recommended. i.e. to write the calculation within the selector.
  const pizzaCount = useSelector(getTotalCount);
  const totalPrice = useSelector(getTotalPrice);

  if (pizzaCount === 0) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-4 md:text-base">
        <span>{pizzaCount} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
