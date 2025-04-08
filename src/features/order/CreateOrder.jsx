// import { useState } from "react";

// // https://uibakery.io/regex-library/phone-number
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

import {Form, useActionData, useNavigation} from "react-router-dom";
// import {createOrder} from "../../services/apiRestaurant.js";

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const actionData = useActionData();

  return (
    <div>
      <h2>Ready to order? Let&apos;s go!</h2>

      {/*both will work*/}
      {/*<Form method="POST" action="/order/new">*/}
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
          {actionData?.phone && <p>actionData.phone</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" className="rounded-full border border-stone-200 px-4 py-2 text-sm
            transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 w-full
            md:px-6 md:py-3" required />
          </div>
        </div>

        <div>
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
        </div>

        <div>
          <button
            className="inline-blocke rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wid text-stone-800
            hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300
            focus:ring-offset-2 disabled:cursor-not-allowed"
            disabled={isSubmitting}>{isSubmitting ? "Placing order..." : "Order now"}</button>
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
  // const newOrder = await createOrder(order);
  // return redirect(`/order/${newOrder.id}`);
  return null;
}

export default CreateOrder;
