// import { useState } from "react";

// // https://uibakery.io/regex-library/phone-number
import Button from "../../ui/Button.jsx";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// import {createOrder} from "../../services/apiRestaurant.js";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

import {Form, redirect, useActionData, useNavigation} from "react-router-dom";
import {createOrder} from "../../services/apiRestaurant.js";
import {useSelector} from "react-redux";

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const username = useSelector(state => state.user.username);

  const actionData = useActionData();

  return (
    <div className="py-6 px-4">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let&apos;s go!</h2>

      {/*both will work*/}
      {/*<Form method="POST" action="/order/new">*/}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" className="input grow" defaultValue={username} required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" required/>
            {actionData?.phone && <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">{actionData.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input type="text" name="address" className="input w-full" required />
          </div>
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-semibold">Want to yo give your order priority?</label>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
        </div>

        <div>
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting ? "Placing order..." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({request}) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {...data, cart: JSON.parse(data.cart), priority: data.priority === "on"}
  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = "Please provide a valid phone number. We might need it to contact you.";
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
