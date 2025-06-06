import Button from "../../ui/Button.jsx";
import {Form, redirect, useActionData, useNavigation} from "react-router-dom";
// import {createOrder} from "../../services/apiRestaurant.js";
import {useDispatch, useSelector} from "react-redux";
import {clearCart, getCart, getTotalPrice} from "../cart/CartSlice.js";
import EmptyCart from "../cart/EmptyCart.jsx";
// import store from "../../store.js";
import {formatCurrency} from "../../utils/helpers.js";
import {useState} from "react";
import {fetchAddress} from "../user/userSlice.js";
import store from "../../store.js";
import {createOrder} from "../../services/apiRestaurant.js";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const {username, status: addressStatus, position, address, error: errorAddress} = useSelector(store => store.user);
  const isLoadingAddress = addressStatus === "loading";
  const actionData = useActionData();
  const dispatch = useDispatch();
  const totalCartPrice = useSelector(getTotalPrice);
  const PriorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + PriorityPrice;
  if (!cart.length) return <EmptyCart/>
  return (
    <div className="py-6 px-4">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let&apos;s go!</h2>

      {/*both will work*/}
      {/*<Form method="POST" action="/order/new">*/}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" className="input grow" defaultValue={username} required/>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" required/>
            {actionData?.phone &&
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">{actionData.phone}</p>}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input type="text" name="address" className="input w-full" defaultValue={address}
                   disabled={isLoadingAddress} required/>
            {addressStatus === "error" &&
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">{errorAddress}</p>}
          </div>
          {!position.latitude && !position.longitude &&
            (<span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
            <Button type="small" disabled={isLoadingAddress} onClick={(e) => {
              e.preventDefault();
              dispatch(fetchAddress())
            }}>Get position
            </Button>
          </span>)
          }
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-semibold">Want to give your order priority?</label>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
          <input type="hidden" name="position" value={`${position.latitude ? position.latitude : ''}, ${position.longitude ? position.longitude : ''}`}/>
        </div>

        <div>
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting ? "Placing order..." : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({request}) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {...data, cart: JSON.parse(data.cart), priority: data.priority === "true"}
  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = "Please provide a valid phone number. We might need it to contact you.";
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
